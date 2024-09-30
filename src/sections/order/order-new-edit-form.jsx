import dayjs from 'dayjs';
import { useState, useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box, Button, Select, MenuItem, TextField, InputAdornment } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import axios, { endpoints } from 'src/utils/axios';
import { fCurrency } from 'src/utils/format-number';
import { calculateTax, calculateAfterTax } from 'src/utils/helper';

import { CONFIG } from 'src/config-global';
import { varAlpha } from 'src/theme/styles';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import ProductItemButton from 'src/components/product/product-Item-button';

import OrderProductTable from './order-product-table';
import OrderDiscountDialog from './order-discount-dialog';
import OrderCustomerCreateDialog from './order-customer-create-dialog';
import OrderDiscountProductDialog from './order-discount-product-dialog';

export function OrderNewEditForm({ products, customers, taxPercentage }) {
  const dialog = useBoolean();
  const dialogDiscount = useBoolean();
  const dialogDiscountProduct = useBoolean();
  const router = useRouter();
  const [orderId, setOrderId] = useState();
  const [discount, setDiscount] = useState(0);
  const [discountProduct, setDiscountProduct] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState();
  const [selectedCustomer, setSelectedCustomer] = useState('Customer');
  const [selectedDate, setSelectedDate] = useState(dayjs(new Date()));
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [filterProducts, setfilterProducts] = useState(products);

  const queryClient = useQueryClient();

  const handleDiscountDialog = (payload, amount) => {
    setDiscountProduct(amount);
    setSelectedProduct(payload);
    dialogDiscountProduct.onToggle();
  };

  const handleDiscount = (amount) => {
    setDiscount(amount);
    dialogDiscount.onFalse();
  };

  const handleDiscountProduct = (index, product, amount) => {
    const percentageDiscount = (amount / product.price) * 100;
    setSelectedProducts((prev) => {
      prev[index].discount = percentageDiscount;
      return [...prev];
    });
    dialogDiscountProduct.onFalse();
  };

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
  const handleAddProducts = useCallback((payload) => {
    setSelectedProducts((prev) => {
      const isFoundIndx = prev.findIndex((prod) => prod.id === payload.id);
      if (isFoundIndx >= 0) {
        prev[isFoundIndx].quantity += 1;
      } else {
        payload.quantity = 1;
        payload.discount = 0;
        prev.push(payload);
      }
      return [...prev];
    });
  }, []);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnDecrease = useCallback(
    (idx) => {
      setSelectedProducts((prev) => {
        prev[idx].quantity -= 1;
        if (prev[idx].quantity === 0) {
          prev.splice(idx, 1);
        }
        return [...prev];
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedProducts]
  );

  const handleOnDecreaseDiscount = useCallback((idx) => {
    setSelectedProducts((prev) => {
      if (prev[idx].discount > 0) {
        prev[idx].discount -= 1;
      }
      return [...prev];
    });
  }, []);

  const handleOnIncreaseDiscount = useCallback((idx) => {
    setSelectedProducts((prev) => {
      if (prev[idx].discount < 100) {
        prev[idx].discount += 1;
      }
      return [...prev];
    });
  }, []);

  const handleOnIncrease = useCallback(
    (idx) => {
      setSelectedProducts((prev) => {
        prev[idx].quantity += 1;
        return [...prev];
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedProducts]
  );

  const handleDeleteRow = useCallback(
    (idx) => {
      setSelectedProducts((prev) => {
        prev.splice(idx, 1);
        return [...prev];
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedProducts]
  );

  const getTotal = useCallback(
    () => selectedProducts.reduce((total, product) => total + product.price * product.quantity, 0),
    [selectedProducts]
  );

  const getTotalProductDiscount = useCallback(
    () =>
      selectedProducts.reduce(
        (total, product) => total + product.price * (product.discount / 100) * product.quantity,
        0
      ),
    [selectedProducts]
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
              // eslint-disable-next-line no-unsafe-optional-chaining
              image={CONFIG.site.serverFileHost + product?.image}
            />
          ))}
        </Box>
      </Stack>
    </Card>
  );

  const renderTotal = (
    <Stack spacing={2} alignItems="flex-end" sx={{ p: 2, textAlign: 'right', typography: 'body2' }}>
      <Stack direction="row">
        <Box sx={{ color: 'text.secondary' }}>Subtotal</Box>
        <Box sx={{ width: 160, typography: 'subtitle2' }}>{fCurrency(getTotal()) || '-'}</Box>
      </Stack>

      <Stack direction="row" alignItems="center">
        <Box sx={{ color: 'text.secondary' }}>Total Product Discount</Box>
        <Box sx={{ width: 160, ...(0 && { color: 'error.main' }) }}>
          <Box>
            <Stack
              sx={{
                color: 'error.main',
                borderRadius: 1,
                typography: 'subtitle2',
              }}
            >
              {fCurrency(getTotalProductDiscount()) || '-'}
            </Stack>
          </Box>
        </Box>
      </Stack>

      <Stack direction="row" alignItems="center">
        <Box sx={{ color: 'text.secondary' }}>Discount</Box>
        <Box sx={{ width: 160, ...(0 && { color: 'error.main' }) }}>
          <Box sx={{ pl: 4, mr: -0.5 }}>
            <Stack
              onClick={() => {
                dialogDiscount.onToggle();
              }}
              sx={{
                cursor: 'pointer',
                p: 0.5,
                color: 'error.main',
                borderRadius: 1,
                typography: 'subtitle2',
                border: (theme) =>
                  `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.2)}`,
              }}
            >
              {fCurrency(discount)}
            </Stack>
          </Box>
        </Box>
      </Stack>

      <Stack direction="row">
        <Box sx={{ color: 'text.secondary' }}>Tax ({taxPercentage || '0'}%)</Box>
        <Box sx={{ width: 160 }}>
          {taxPercentage ? fCurrency(calculateTax(getTotal() - discount, taxPercentage)) : '-'}
        </Box>
      </Stack>

      <Stack direction="row" sx={{ typography: 'subtitle1' }}>
        <div>Gross Total:</div>
        <Box sx={{ width: 160 }}>
          {fCurrency(calculateAfterTax(getTotal() - discount, taxPercentage)) || '-'}
        </Box>
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
          onDecreaseDiscount={handleOnDecreaseDiscount}
          onIncreaseDiscount={handleOnIncreaseDiscount}
          handleDiscountDialog={handleDiscountDialog}
          removeItem={handleDeleteRow}
        />
        <Box display="flex" flexDirection="column" alignItems="flex-end" justifyContent="center">
          {renderTotal}
          <Box display="flex" gap={2} height={50}>
            <Button
              variant="contained"
              onClick={() => {
                // eslint-disable-next-line no-restricted-globals, radix
                if (!isNaN(parseInt(selectedCustomer)) && selectedProducts.length) {
                  const payload = {
                    discount: parseInt(discount, 10),
                    orderDate: selectedDate.format('YYYY-MM-DD'),
                    products: selectedProducts.map((prod) => ({
                      id: prod.id,
                      quantity: prod.quantity,
                    })),
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
      <OrderDiscountDialog
        discount={discount}
        open={dialogDiscount.value}
        onClose={dialogDiscount.onFalse}
        handler={handleDiscount}
      />
      <OrderDiscountProductDialog
        product={selectedProduct}
        discount={discountProduct}
        open={dialogDiscountProduct.value}
        onClose={dialogDiscountProduct.onFalse}
        handler={handleDiscountProduct}
      />
    </Grid>
  );
}
