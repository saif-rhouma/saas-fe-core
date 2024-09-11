import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';

import { Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import Tooltip from '@mui/material/Tooltip';

import { paths } from 'src/routes/paths';

import { useBoolean } from 'src/hooks/use-boolean';
import { useSetState } from 'src/hooks/use-set-state';

import axios, { endpoints } from 'src/utils/axios';
import { fIsAfter, fIsBetween } from 'src/utils/format-time';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { ConfirmDialog } from 'src/components/custom-dialog';
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

import ProductAddonTableRow from '../product-addon-table-row';
import { ProductAddonTableToolbar } from '../product-addon-table-toolbar';
import ProductAddonCreateDialog from '../product-addon-create-dialog';
import ProductAddonEditDialog from '../product-addon-edit-dialog';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'addonId', label: 'No.', width: 60 },
  { id: 'addon', label: 'Addon', width: 240 },
  { id: 'price', label: 'Price', width: 140 },
  { id: 'status', label: 'Status', width: 140 },
  { id: '', width: 88 },
];

// ----------------------------------------------------------------------

export function ProductAddonsView({ productAddons }) {
  const table = useTable({ defaultOrderBy: 'planId' });

  const dialog = useBoolean();
  const dialogEdit = useBoolean();

  const confirm = useBoolean();

  const [tableData, setTableData] = useState(productAddons);

  const [selectedProductAddon, setSelectedProductAddon] = useState();

  const filters = useSetState({
    name: '',
    status: 'all',
    startDate: null,
    endDate: null,
  });

  useEffect(() => {
    setTableData(productAddons);
  }, [productAddons]);

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
      deleteProductAddon(id);
    },
    [dataInPage.length, table, tableData]
  );

  const handleDeleteRows = useCallback(() => {
    // const deleteRows = tableData.filter((row) => !table.selected.includes(row.id));
    // toast.success('Delete success!');
    // setTableData(deleteRows);
    // table.onUpdatePageDeleteRows({
    //   totalRowsInPage: dataInPage.length,
    //   totalRowsFiltered: dataFiltered.length,
    // });
  }, [dataFiltered.length, dataInPage.length, table, tableData]);

  const handleEditRow = useCallback(
    (row) => {
      setSelectedProductAddon(row);
      dialogEdit.onToggle();
    },
    [dataInPage.length, table, tableData]
  );

  const queryClient = useQueryClient();

  const { mutate: handleCreateProductAddon } = useMutation({
    mutationFn: (payload) => axios.post(endpoints.productAddons.create, payload),
    onSuccess: async () => {
      toast.success('New Product Addon Has Been Created!');
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['product-addons'] });
      dialog.onFalse();
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const { mutate: handleEditProductAddon } = useMutation({
    mutationFn: ({ id, payload }) => axios.patch(endpoints.productAddons.edit + id, payload),
    onSuccess: async () => {
      toast.success('New Product Addon Has Been Modified!');
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['product-addons'] });
      dialogEdit.onFalse();
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const { mutate: deleteProductAddon } = useMutation({
    mutationFn: (id) => axios.delete(endpoints.productAddons.delete + id),
    onSuccess: async (id) => {
      const deleteRow = tableData.filter((row) => row.id !== id);

      toast.success('Delete success!');

      setTableData(deleteRow);

      table.onUpdatePageDeleteRow(dataInPage.length);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['product-addons'] });
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
              { name: 'Products', href: paths.dashboard.product.root },
              { name: 'Product Addons' },
            ]}
            action={
              <Button
                onClick={() => dialog.onToggle()}
                variant="contained"
                startIcon={<Iconify icon="mingcute:add-line" />}
              >
                Add New Addon
              </Button>
            }
          />
          <Card>
            <ProductAddonTableToolbar
              filters={filters}
              onResetPage={table.onResetPage}
              dateError={dateError}
            />
            <Box sx={{ position: 'relative' }}>
              <TableSelectedAction
                dense={table.dense}
                numSelected={table.selected.length}
                rowCount={dataFiltered.length}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    dataFiltered.map((row) => row.id)
                  )
                }
                action={
                  <Tooltip title="Delete">
                    <IconButton color="primary" onClick={confirm.onTrue}>
                      <Iconify icon="solar:trash-bin-trash-bold" />
                    </IconButton>
                  </Tooltip>
                }
              />
              <Scrollbar sx={{ minHeight: 200 }}>
                <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
                  <TableHeadCustom
                    order={table.order}
                    orderBy={table.orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={dataFiltered.length}
                  />
                  {dataFiltered
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row) => (
                      <ProductAddonTableRow
                        key={row.id}
                        row={row}
                        selected={table.selected.includes(row.id)}
                        onEditRow={() => handleEditRow(row)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                      />
                    ))}
                  <TableBody>
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
      <ProductAddonCreateDialog
        open={dialog.value}
        onClose={dialog.onFalse}
        handler={handleCreateProductAddon}
      />
      <ProductAddonEditDialog
        open={dialogEdit.value}
        onClose={dialogEdit.onFalse}
        handler={handleEditProductAddon}
        productAddon={selectedProductAddon}
      />
      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {table.selected.length} </strong> items?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows();
              confirm.onFalse();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}

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
      (product) =>
        product.id.toString().toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
        product.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
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
