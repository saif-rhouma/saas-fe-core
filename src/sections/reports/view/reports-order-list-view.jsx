import { useCallback, useState } from 'react';

import { Stack, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';

import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';

import { useBoolean } from 'src/hooks/use-boolean';
import { useSetState } from 'src/hooks/use-set-state';

import { fIsAfter, fIsBetween } from 'src/utils/format-time';

import { _orders, ORDER_STATUS_OPTIONS } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { toast } from 'src/components/snackbar';
import {
  emptyRows,
  getComparator,
  rowInPage,
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TableSelectedAction,
  useTable,
} from 'src/components/table';
import ReportsDailyTableRow from '../reports-daily-table-row';
import { ReportsOrderTableToolbar } from '../reports-order-table-toolbar';
import ReportsOrderTableRow from '../reports-order-table-row';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = [{ value: 'all', label: 'All' }, ...ORDER_STATUS_OPTIONS];

const TABLE_HEAD = [
  { id: 'date', label: 'Date', width: 300 },
  { id: 'orderId', label: 'Order Id' },
  { id: 'customer', label: 'Customer' },
  { id: 'orderAmount', label: 'Order Amount' },
  { id: 'status', label: 'Status' },
];

// ----------------------------------------------------------------------

const ReportsOrderListView = () => {
  const table = useTable({ defaultOrderBy: 'orderNumber' });

  const router = useRouter();

  const theme = useTheme();

  const confirm = useBoolean();

  const [tableData, setTableData] = useState(_orders);

  const filters = useSetState({
    name: '',
    status: 'all',
    startDate: null,
    endDate: null,
  });

  const dateError = fIsAfter(filters.state.startDate, filters.state.endDate);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters: filters.state,
    dateError,
  });

  const dataInPage = rowInPage(dataFiltered, table.page, table.rowsPerPage);

  const canReset =
    !!filters.state.name ||
    filters.state.status !== 'all' ||
    (!!filters.state.startDate && !!filters.state.endDate);

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleDeleteRow = useCallback(
    (id) => {
      const deleteRow = tableData.filter((row) => row.id !== id);

      toast.success('Delete success!');

      setTableData(deleteRow);

      table.onUpdatePageDeleteRow(dataInPage.length);
    },
    [dataInPage.length, table, tableData]
  );

  const handleDeleteRows = useCallback(() => {
    const deleteRows = tableData.filter((row) => !table.selected.includes(row.id));

    toast.success('Delete success!');

    setTableData(deleteRows);

    table.onUpdatePageDeleteRows({
      totalRowsInPage: dataInPage.length,
      totalRowsFiltered: dataFiltered.length,
    });
  }, [dataFiltered.length, dataInPage.length, table, tableData]);

  const handleViewRow = useCallback(
    (id) => {
      router.push(paths.dashboard.order.details(id));
    },
    [router]
  );

  return (
    <>
      <DashboardContent maxWidth="xl">
        <Stack spacing={3}>
          <CustomBreadcrumbs
            links={[
              { name: 'Dashboard', href: paths.dashboard.root },
              { name: 'Reports', href: paths.dashboard.reports.root },
              { name: 'Order Report', href: paths.dashboard.reports.order },
            ]}
          />
          <Card>
            <ReportsOrderTableToolbar
              filters={filters}
              onResetPage={table.onResetPage}
              dateError={dateError}
            />

            <Box sx={{ position: 'relative' }}>
              <TableSelectedAction
                dense={table.dense}
                numSelected={table.selected.length}
                rowCount={dataFiltered.length}
              />

              <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
                <TableHeadCustom
                  order={table.order}
                  orderBy={table.orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={dataFiltered.length}
                />

                <TableBody>
                  {dataFiltered
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row) => (
                      <ReportsOrderTableRow
                        key={row.id}
                        row={row}
                        selected={table.selected.includes(row.id)}
                      />
                    ))}

                  <TableEmptyRows
                    height={table.dense ? 56 : 56 + 20}
                    emptyRows={emptyRows(table.page, table.rowsPerPage, dataFiltered.length)}
                  />

                  <TableNoData notFound={notFound} />
                </TableBody>
              </Table>
            </Box>
            <Box>
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{
                  p: 3,
                  typography: 'body2',
                }}
              >
                <Stack spacing={1}>
                  <Box sx={{ color: 'text.secondary' }}>Total Orders: 0</Box>
                  <Box sx={{ color: 'text.secondary' }}>Total Order Amount: SR 0.00</Box>
                </Stack>
                <Box>
                  <Stack direction="row" spacing={1}>
                    <Button
                      variant="contained"
                      startIcon={<Iconify icon="carbon:checkmark-filled" />}
                    >
                      Download Report
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<Iconify icon="carbon:checkmark-filled" />}
                    >
                      Print Report
                    </Button>
                  </Stack>
                </Box>
              </Stack>
            </Box>
          </Card>
        </Stack>
      </DashboardContent>
    </>
  );
};
export default ReportsOrderListView;

function applyFilter({ inputData, comparator, filters, dateError }) {
  const { status, name, startDate, endDate } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter(
      (order) =>
        order.orderNumber.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
        order.customer.name.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
        order.customer.email.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  if (status !== 'all') {
    inputData = inputData.filter((order) => order.status === status);
  }

  if (!dateError) {
    if (startDate && endDate) {
      inputData = inputData.filter((order) => fIsBetween(order.createdAt, startDate, endDate));
    }
  }

  return inputData;
}
