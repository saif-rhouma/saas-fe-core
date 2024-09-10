import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import { Stack, useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import TableBody from '@mui/material/TableBody';
import Grid from '@mui/material/Unstable_Grid2';
import IconButton from '@mui/material/IconButton';
import { RouterLink } from 'src/routes/components';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';
import { useSetState } from 'src/hooks/use-set-state';

import { fIsAfter, fIsBetween } from 'src/utils/format-time';

import { DashboardContent } from 'src/layouts/dashboard';
import { _orders, ORDER_STATUS_OPTIONS } from 'src/_mock';
import { _staffList } from 'src/_mock/_staffList';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import {
  useTable,
  emptyRows,
  rowInPage,
  TableNoData,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/components/table';
import { StaffTableToolbar } from '../staff-table-toolbar';
import StaffTableRow from '../staff-table-row';
// import PaymentDetailsDialog from '../reminders-details-dialog';
// import PaymentEditDialog from '../reminder-create-dialog';
// import ReminderCreateDialog from '../reminder-create-dialog';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = [{ value: 'all', label: 'All' }, ...ORDER_STATUS_OPTIONS];

const TABLE_HEAD = [
  { id: 'reminderId', label: '#', width: 140 },
  { id: 'staffName', label: 'Staff Name', width: 280 },
  { id: 'phoneNumber', label: 'Phone Number' },
  { id: 'emailAddress', label: 'Email Address' },
  { id: 'status', label: 'Status' },
  { id: '', width: 88 },
];

// ----------------------------------------------------------------------

const StaffListView = () => {
  const table = useTable({ defaultOrderBy: 'orderNumber' });

  const router = useRouter();

  const theme = useTheme();

  const confirm = useBoolean();

  // const [tableData, setTableData] = useState(_orders);
  const [tableData, setTableData] = useState(_staffList);

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
      router.push(paths.dashboard.staff.edit(id));
    },
    [router]
  );
console.log("redirection to new staff", paths.dashboard.staff.new);
  return (
    <>
      <DashboardContent maxWidth="xl">
        <Stack spacing={3}>
          <CustomBreadcrumbs
            links={[
              { name: 'Dashboard', href: paths.dashboard.root },
              { name: 'Staff', href: paths.dashboard.staff.root },
            ]}
            action={
              <Button
                component={RouterLink}
                href={paths.dashboard.staff.new}
                variant="contained"
                startIcon={<Iconify icon="mingcute:add-line" />}
              >
                Add New Staff
              </Button>
            }
          />
          <Card>
            <StaffTableToolbar
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

              <Scrollbar sx={{ minHeight: 444 }}>
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
                        <StaffTableRow
                          key={row.id}
                          row={row}
                          selected={table.selected.includes(row.id)}
                          onSelectRow={() => table.onSelectRow(row.id)}
                          onDeleteRow={() => handleDeleteRow(row.id)}
                          onViewRow={() => handleViewRow(row.id)}
                        />
                      ))}

                    <TableEmptyRows
                      height={table.dense ? 56 : 56 + 20}
                      emptyRows={emptyRows(table.page, table.rowsPerPage, dataFiltered.length)}
                    />

                    <TableNoData notFound={notFound} />
                  </TableBody>
                </Table>
              </Scrollbar>
            </Box>

            <TablePaginationCustom
              page={table.page}
              dense={table.dense}
              count={dataFiltered.length}
              rowsPerPage={table.rowsPerPage}
              onPageChange={table.onChangePage}
              onChangeDense={table.onChangeDense}
              onRowsPerPageChange={table.onChangeRowsPerPage}
            />
          </Card>
        </Stack>
      </DashboardContent>
      {/* <ReminderCreateDialog open={() => true} /> */}
      {/* <PaymentEditDialog open={() => true} /> */}
    </>
  );
};
export default StaffListView;

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
