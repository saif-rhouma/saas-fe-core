import { useState, useCallback } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
  Box,
  Table,
  Button,
  Select,
  MenuItem,
  TableRow,
  TextField,
  TableCell,
  TableBody,
  InputAdornment,
} from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { varAlpha } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';
import { TableHeadCustom } from 'src/components/table';
import ProductItemButton from 'src/components/product/product-Item-button';

import { IncrementerButton } from '../product/components/incrementer-button';
import OrderCustomerCreateDialog from './order-customer-create-dialog';
import OrderProductTable from './order-product-table';
import OrderPaymentDetailsDialog from './order-payment-details-dialog';

export function OrderNewEditForm({ currentOrder }) {
  const router = useRouter();
  const [orderId, setOrderId] = useState();

  const handleOrderId = useCallback((event) => {
    setOrderId(event.target.value);
  }, []);

  const TABLE_HEAD = [
    { id: 'orderNumber', label: '#', width: 40, align: 'center' },
    { id: 'name', label: 'Product Name', width: 160 },
    { id: 'color', label: 'Color', width: 80 },
    {
      id: 'rate',
      label: 'Rate',
      width: 80,
    },
    { id: 'totalAmount', label: 'Qty', width: 100 },
    { id: 'status', label: 'Total', width: 140 },
  ];

  const onDelete = () => {};
  const onDecrease = () => {};
  const onIncrease = () => {};

  const renderOrderList = (
    <Card>
      <Stack spacing={4} sx={{ p: 3 }}>
        <TextField
          fullWidth
          maxWidth="xs"
          placeholder="Search customer or order number..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />
        <Box
          spacing={2}
          gap={3}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(2, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(2, 1fr)',
          }}
        >
          <ProductItemButton image="--->" productName="Product 1" />
          <ProductItemButton image="--->" productName="Product 1" />
          <ProductItemButton image="--->" productName="Product 1" />
          <ProductItemButton image="--->" productName="Product 1" />
          <ProductItemButton image="--->" productName="Product 1" />
        </Box>
      </Stack>
    </Card>
  );

  const renderTotal = (
    <Stack spacing={2} alignItems="flex-end" sx={{ p: 3, textAlign: 'right', typography: 'body2' }}>
      <Stack direction="row" sx={{ typography: 'subtitle1' }}>
        <div>Gross Total:</div>
        {/* <Box sx={{ width: 160 }}>{fCurrency(totalAmount) || '-'}</Box> */}
        <Box sx={{ width: 160 }}>SR 350.00</Box>
      </Stack>
    </Stack>
  );

  const renderOrderCreation = (
    <Card>
      <Stack spacing={2} sx={{ p: 3 }}>
        <Box
          display="grid"
          gap={2}
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(2, 1fr)',
          }}
        >
          <Select
            sx={{ maxWidth: 420, textTransform: 'capitalize' }}
            value="Customer"
            renderValue={(selected) => selected}
            // onChange={handleChangeRowsPerPage}
          >
            <MenuItem value="Customer">Customer</MenuItem>
            <MenuItem value={12}>Processing</MenuItem>
            <MenuItem value={24}>Waiting for Approval</MenuItem>
            <MenuItem value={24}>Delivered</MenuItem>
          </Select>
          <Box display="flex" justifyContent="flex-end" alignItems="center">
            <Button variant="contained" startIcon={<Iconify icon="mingcute:add-line" />}>
              Add Customer
            </Button>
          </Box>

          <TextField label="Order ID" value={orderId} onChange={handleOrderId} sx={{ mt: 2 }} />
          <DatePicker label="Date" sx={{ mt: 2 }} />
        </Box>
        <OrderProductTable />
        <Box display="flex" flexDirection="column" alignItems="flex-end" justifyContent="center">
          {renderTotal}
          <Box display="flex" gap={2} height={50}>
            <Button variant="contained">Save and Continue</Button>
            <Button variant="outlined">Clear All</Button>
          </Box>
        </Box>
      </Stack>
    </Card>
  );

  return (
    <Grid container spacing={3}>
      <Grid xs={12} md={4}>
        <Stack>{renderOrderList}</Stack>
      </Grid>

      <Grid xs={12} md={8}>
        <Stack>{renderOrderCreation}</Stack>
      </Grid>
      {/* <OrderCustomerCreateDialog open={() => true} /> */}
      {/* <OrderPaymentDetailsDialog open={() => true} /> */}
    </Grid>
  );
}
