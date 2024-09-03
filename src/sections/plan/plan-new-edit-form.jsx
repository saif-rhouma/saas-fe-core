import { useCallback, useState } from 'react';

import { Box, Button, InputAdornment, TextField } from '@mui/material';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { useRouter } from 'src/routes/hooks';

import { Iconify } from 'src/components/iconify';
import ProductItemButton from 'src/components/product/product-Item-button';

import PlanProductTable from './plan-product-table';

export function PlanNewEditForm({ currentOrder }) {
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
          <TextField label="Plan ID" value={orderId} onChange={handleOrderId} sx={{ mt: 2 }} />
          <DatePicker label="Date" sx={{ mt: 2 }} />
        </Box>
        <PlanProductTable />
        <Box display="flex" flexDirection="column" alignItems="flex-end" justifyContent="center">
          <Box display="flex" gap={2} height={50}>
            <Button variant="contained">Save</Button>
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
    </Grid>
  );
}
