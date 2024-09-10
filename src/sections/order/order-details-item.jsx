import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import CardHeader from '@mui/material/CardHeader';

import { fDate } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';

import { Scrollbar } from 'src/components/scrollbar';

import OrderProductTable from './order-product-table';

// ----------------------------------------------------------------------

export function OrderDetailsItems({
  taxes,
  order,
  shipping,
  discount,
  subtotal,
  customer,
  totalAmount,
}) {
  const renderTotal = (
    <Stack spacing={2} alignItems="flex-end" sx={{ p: 3, textAlign: 'right', typography: 'body2' }}>
      <Stack direction="row">
        <Box sx={{ color: 'text.secondary' }}>Subtotal</Box>
        <Box sx={{ width: 160, typography: 'subtitle2' }}>{fCurrency(subtotal) || '-'}</Box>
      </Stack>

      <Stack direction="row">
        <Box sx={{ color: 'text.secondary' }}>Addon</Box>
        <Box sx={{ width: 160, ...(shipping && { color: 'error.main' }) }}>
          {shipping ? `- ${fCurrency(shipping)}` : '-'}
        </Box>
      </Stack>

      <Stack direction="row">
        <Box sx={{ color: 'text.secondary' }}>Discount</Box>
        <Box sx={{ width: 160, ...(discount && { color: 'error.main' }) }}>
          {discount ? `- ${fCurrency(discount)}` : '-'}
        </Box>
      </Stack>

      <Stack direction="row">
        <Box sx={{ color: 'text.secondary' }}>Tax (0%)</Box>
        <Box sx={{ width: 160 }}>{taxes ? fCurrency(taxes) : '-'}</Box>
      </Stack>

      <Stack direction="row" sx={{ typography: 'subtitle1' }}>
        <div>Gross Total</div>
        <Box sx={{ width: 160 }}>{fCurrency(totalAmount) || '-'}</Box>
      </Stack>
    </Stack>
  );

  return (
    <Card>
      <CardHeader title="Details" />
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{
          p: 3,
          typography: 'body2',
        }}
      >
        <Box
          flexDirection="column"
          sx={{
            display: 'flex',
            width: '100%',
            p: 1,
          }}
        >
          <Stack direction="row" sx={{ typography: 'subtitle2', marginBottom: 1 }}>
            <div>Order Details</div>
          </Stack>
          <Box sx={{ color: 'text.secondary' }}>ORDER ID: #ORD-{order.id}</Box>
          <Box sx={{ color: 'text.secondary' }}>Order Date: {fDate(order.orderDate)}</Box>
          <Box sx={{ color: 'text.secondary' }}>
            Delivery Date: {order.deliveryDate ? fDate(order.deliveryDate) : <span> - </span>}
          </Box>
        </Box>
        <Box
          flexDirection="column"
          gap={0.5}
          sx={{
            display: 'flex',
            width: '100%',
            p: 1,
            borderRight: (theme) => `dashed 2px ${theme.vars.palette.background.neutral}`,
            borderLeft: (theme) => `dashed 2px ${theme.vars.palette.background.neutral}`,
          }}
        >
          <Stack
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ typography: 'subtitle2', width: '100%', marginBottom: 1 }}
          >
            <div>NFCAC</div>
          </Stack>
          <Box sx={{ color: 'text.secondary' }}>Status : {order.status}</Box>

          <Box sx={{ color: 'text.secondary' }}>TAX: {customer?.taxNumber}</Box>
        </Box>
        <Box
          flexDirection="column"
          alignItems="center"
          sx={{
            p: 1,
            display: 'flex',
            width: '100%',
          }}
        >
          <Stack
            display="flex"
            alignItems="center"
            gap={1}
            sx={{ typography: 'subtitle2', width: '100%', marginBottom: 1 }}
          >
            <div>Invoice To</div>
          </Stack>
          <Box sx={{ color: 'text.secondary' }}>{customer?.name}</Box>
          <Box sx={{ color: 'text.secondary' }}>Tel: {customer?.phoneNumber}</Box>
        </Box>
      </Stack>

      <Scrollbar>
        <Box
          fullWidth
          alignItems="center"
          sx={{
            p: 3,
            borderBottom: (theme) => `dashed 2px ${theme.vars.palette.background.neutral}`,
          }}
        >
          <OrderProductTable products={order.productToOrder} isDetail />
        </Box>
      </Scrollbar>

      {renderTotal}
      {order?.notes && (
        <Stack
          justifyContent="space-between"
          sx={{
            p: 3,
            typography: 'body2',
          }}
        >
          <Box
            flexDirection="column"
            sx={{
              display: 'flex',
              width: '100%',
              p: 1,
            }}
          >
            <Stack sx={{ typography: 'subtitle2', marginBottom: 1 }}>
              <div>Notes:</div>
            </Stack>
            <Box sx={{ color: 'text.secondary' }}>{order?.notes}</Box>
          </Box>
        </Stack>
      )}
    </Card>
  );
}
