import { useCallback, useEffect, useState } from 'react';

import { Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';

import { paths } from 'src/routes/paths';

import { useBoolean } from 'src/hooks/use-boolean';
import { useSetState } from 'src/hooks/use-set-state';

import { fIsAfter, fIsBetween } from 'src/utils/format-time';

import { DashboardContent } from 'src/layouts/dashboard';

import { useMutation, useQueryClient } from '@tanstack/react-query';
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
  TablePaginationCustom,
  TableSelectedAction,
  useTable,
} from 'src/components/table';
import axios, { endpoints } from 'src/utils/axios';
import ReminderCreateDialog from '../reminder-create-dialog';
import ReminderEditDialog from '../reminder-edit-dialog';
import RemindersTableRow from '../reminders-table-row';
import { RemindersTableToolbar } from '../reminders-table-toolbar';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'reminderId', label: '#', width: 140 },
  { id: 'date', label: 'Date', width: 280 },
  { id: 'title', label: 'Title' },
  { id: '', width: 88 },
];

// ----------------------------------------------------------------------

const RemindersListView = ({ reminders }) => {
  const table = useTable({ defaultOrderBy: 'orderNumber' });

  const dialog = useBoolean();
  const dialogEdit = useBoolean();

  const confirm = useBoolean();

  const [tableData, setTableData] = useState(reminders);

  const filters = useSetState({
    name: '',
    status: 'all',
    startDate: null,
    endDate: null,
  });

  const dateError = fIsAfter(filters.state.startDate, filters.state.endDate);

  useEffect(() => {
    setTableData(reminders);
  }, [reminders]);

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
      deleteReminder(id);
    },
    [dataInPage.length, table, tableData]
  );

  const [selectedReminder, setSelectedReminder] = useState();

  const handleEditRow = useCallback(
    (row) => {
      setSelectedReminder(row);
      dialogEdit.onToggle();
    },
    [dataInPage.length, table, tableData]
  );

  const queryClient = useQueryClient();

  const { mutate: deleteReminder } = useMutation({
    mutationFn: (id) => axios.delete(endpoints.reminders.delete + id),
    onSuccess: async () => {
      const deleteRow = tableData.filter((row) => row.id !== id);

      toast.success('Delete success!');

      setTableData(deleteRow);

      table.onUpdatePageDeleteRow(dataInPage.length);
      confirm.onFalse();
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['reminders'] });
      confirm.onFalse();
    },
    onError: () => {},
  });

  const { mutate: handleCreateReminder } = useMutation({
    mutationFn: (payload) => axios.post(endpoints.reminders.create, payload),
    onSuccess: async () => {
      toast.success('New Reminder Has Been Created!');
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['reminders'] });
      dialog.onClose();
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const { mutate: handleEditReminder } = useMutation({
    mutationFn: ({ id, payload }) => axios.patch(endpoints.reminders.edit + id, payload),
    onSuccess: async () => {
      toast.success('New Reminder Has Been Modified!');
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['reminders'] });
      dialogEdit.onClose();
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return (
    <>
      <DashboardContent maxWidth="xl">
        <Stack spacing={3}>
          <CustomBreadcrumbs
            links={[
              { name: 'Dashboard', href: paths.dashboard.root },
              { name: 'Reminders', href: paths.dashboard.reminders.root },
            ]}
            action={
              <Button
                onClick={() => dialog.onToggle()}
                variant="contained"
                startIcon={<Iconify icon="mingcute:add-line" />}
              >
                Add Reminder
              </Button>
            }
          />
          <Card>
            <RemindersTableToolbar
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
                        <RemindersTableRow
                          key={row.id}
                          row={row}
                          selected={table.selected.includes(row.id)}
                          onEditRow={() => handleEditRow(row)}
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
      <ReminderCreateDialog
        open={dialog.value}
        onClose={dialog.onFalse}
        handler={handleCreateReminder}
      />
      <ReminderEditDialog
        reminder={selectedReminder}
        open={dialogEdit.value}
        onClose={dialogEdit.onFalse}
        handler={handleEditReminder}
      />
    </>
  );
};
export default RemindersListView;

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
        order.id.toString().toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
        order.title.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
        order.description.toLowerCase().indexOf(name.toLowerCase()) !== -1
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
