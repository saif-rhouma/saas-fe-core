import { useCallback, useState } from 'react';

import { Box, Button, InputAdornment, MenuItem, Select, TextField } from '@mui/material';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { Iconify } from 'src/components/iconify';
import ProductItemButton from 'src/components/product/product-Item-button';
import { toast } from 'src/components/snackbar';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import axios, { endpoints } from 'src/utils/axios';
import { fCurrency } from 'src/utils/format-number';
import OrderProductTable from './order-product-table';
import { useBoolean } from 'src/hooks/use-boolean';
import OrderCustomerCreateDialog from './order-customer-create-dialog';

export function OrderNewEditForm({ products, customers }) {
  const dialog = useBoolean();
  const router = useRouter();
  const [orderId, setOrderId] = useState();
  const [selectedCustomer, setSelectedCustomer] = useState('Customer');
  const [selectedDate, setSelectedDate] = useState(dayjs(new Date()));
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [filterProducts, setfilterProducts] = useState(products);

  const storageHost = 'http://localhost:3000/api/files/show/';

  const queryClient = useQueryClient();

  const { mutate: createOrder } = useMutation({
    mutationFn: (payload) => axios.post(endpoints.order.create, payload),
    onSuccess: async () => {
      toast.success('New Order Has Been Created!');
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['orders'] });
      await queryClient.invalidateQueries({ queryKey: ['orders', 'analytics'] });
      router.push(paths.dashboard.order.root);
    },
    onError: () => {},
  });

  const handleOrderId = useCallback((event) => {
    setOrderId(event.target.value);
  }, []);

  const handleChangeCustomer = useCallback((event) => {
    setSelectedCustomer(event.target.value);
  }, []);
  const handleAddProducts = useCallback(
    (payload) => {
      setSelectedProducts((prev) => {
        const isFoundIndx = prev.findIndex((prod) => prod.id === payload.id);
        if (isFoundIndx >= 0) {
          prev[isFoundIndx].quantity += 1;
        } else {
          payload.quantity = 1;
          prev.push(payload);
        }
        const products = [...prev];
        return products;
      });
    },
    [selectedProducts]
  );
  const handleFilterProducts = useCallback((event) => {
    const name = event.target.value;
    if (name) {
      setfilterProducts(
        products.filter((product) => product.name.toLowerCase().indexOf(name) !== -1)
      );
    }
    if (name === undefined || name === null || name === '') {
      setfilterProducts(products);
    }
  }, []);

  const handleOnDecrease = useCallback(
    (idx) => {
      setSelectedProducts((prev) => {
        prev[idx].quantity -= 1;
        if (prev[idx].quantity === 0) {
          prev.splice(idx, 1);
        }
        const products = [...prev];
        return products;
      });
    },
    [selectedProducts]
  );
  const handleOnIncrease = useCallback(
    (idx) => {
      setSelectedProducts((prev) => {
        prev[idx].quantity += 1;
        const products = [...prev];
        return products;
      });
    },
    [selectedProducts]
  );
  const getTotal = useCallback(() => {
    return selectedProducts.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
  }, [selectedProducts]);

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
          onChange={handleFilterProducts}
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
          {filterProducts.map((product) => (
            <ProductItemButton
              payload={product}
              handleClick={handleAddProducts}
              key={product?.id}
              productName={product?.name}
              image={storageHost + product?.image}
            />
          ))}
        </Box>
      </Stack>
    </Card>
  );

  const renderTotal = (
    <Stack spacing={2} alignItems="flex-end" sx={{ p: 3, textAlign: 'right', typography: 'body2' }}>
      <Stack direction="row" sx={{ typography: 'subtitle1' }}>
        <div>Gross Total:</div>
        <Box sx={{ width: 160 }}>{fCurrency(getTotal()) || '-'}</Box>
      </Stack>
    </Stack>
  );

  const { mutate: handleCreateCustomer } = useMutation({
    mutationFn: (payload) => axios.post(endpoints.customers.create, payload),
    onSuccess: async () => {
      toast.success('New Customer Has Been Created!');
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['customers'] });
      dialog.onFalse();
    },
    onError: (err) => {
      console.log(err);
    },
  });

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
            value={selectedCustomer}
            onChange={handleChangeCustomer}
          >
            <MenuItem value="Customer">Customer</MenuItem>
            {customers.map((customer) => (
              <MenuItem key={customer.id} value={customer.id}>
                {customer.name}
              </MenuItem>
            ))}
          </Select>
          <Box display="flex" justifyContent="flex-end" alignItems="center">
            <Button
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={() => dialog.onToggle()}
            >
              Add Customer
            </Button>
          </Box>

          <TextField
            label="Order ID"
            placeholder="This Could Be Generated Automaticly"
            value={orderId}
            onChange={handleOrderId}
            sx={{ mt: 2 }}
          />
          <DatePicker
            label="Date"
            // views={['year', 'month', 'day']}
            sx={{ mt: 2 }}
            value={selectedDate}
            onChange={(newValue) => {
              setSelectedDate(newValue);
            }}
          />
        </Box>
        <OrderProductTable
          products={selectedProducts}
          onDecrease={handleOnDecrease}
          onIncrease={handleOnIncrease}
        />
        <Box display="flex" flexDirection="column" alignItems="flex-end" justifyContent="center">
          {renderTotal}
          <Box display="flex" gap={2} height={50}>
            <Button
              variant="contained"
              onClick={() => {
                if (!isNaN(parseInt(selectedCustomer)) && selectedProducts.length) {
                  const payload = {
                    orderDate: selectedDate.format('YYYY-MM-DD'),
                    products: selectedProducts.map((prod) => {
                      return { id: prod.id, quantity: prod.quantity };
                    }),
                    customer: selectedCustomer,
                  };
                  createOrder(payload);
                }
              }}
            >
              Save and Continue
            </Button>
            <Button variant="outlined" onClick={() => setSelectedProducts([])}>
              Clear All
            </Button>
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
      <OrderCustomerCreateDialog
        open={dialog.value}
        onClose={dialog.onFalse}
        handler={handleCreateCustomer}
      />
    </Grid>
  );
}
