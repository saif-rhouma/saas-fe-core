/* eslint-disable react/no-unknown-property */
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import CardHeader from '@mui/material/CardHeader';

import { fDate } from 'src/utils/format-time';
import { fCurrency } from 'src/utils/format-number';
import { calculateTax, calculateAfterTax } from 'src/utils/helper';

import { Label } from 'src/components/label';
import { Scrollbar } from 'src/components/scrollbar';

import OrderProductTable from './order-product-table';

// ----------------------------------------------------------------------

export function OrderDetailsItems({ order, discount, customer, totalAmount }) {
  const renderTotal = (
    <Stack spacing={2} alignItems="flex-end" sx={{ p: 3, textAlign: 'right', typography: 'body2' }}>
      <Stack direction="row">
        <Box sx={{ color: 'text.secondary' }}>Subtotal</Box>
        <Box sx={{ width: 160, typography: 'subtitle2' }}>{fCurrency(totalAmount) || '-'}</Box>
      </Stack>

      <Stack direction="row">
        <Box sx={{ color: 'text.secondary' }}>Discount</Box>
        <Box sx={{ width: 160, ...(discount && { color: 'error.main' }) }}>
          {discount ? `- ${discount}%` : '-'}
        </Box>
      </Stack>

      <Stack direction="row">
        <Box sx={{ color: 'text.secondary' }}>Tax ({order?.snapshotTaxPercentage || '0'}%)</Box>
        <Box sx={{ width: 160 }}>
          {order?.snapshotTaxPercentage
            ? fCurrency(
                calculateTax(
                  totalAmount - totalAmount * (discount / 100),
                  order?.snapshotTaxPercentage
                )
              )
            : '-'}
        </Box>
      </Stack>

      <Stack direction="row" sx={{ typography: 'subtitle1' }}>
        <div>Gross Total</div>
        <Box sx={{ width: 160 }}>
          {fCurrency(
            calculateAfterTax(
              totalAmount - totalAmount * (discount / 100),
              order?.snapshotTaxPercentage
            )
          ) || '-'}
        </Box>
      </Stack>
    </Stack>
  );

  return (
    <Card>
      <Stack justifyContent="center" alignItems="center">
        <h1 className="print-title">Order REF: #{order.ref}</h1>
      </Stack>
      {/* Add some CSS to hide the title on screen and show it only in print */}
      <style jsx>{`
        .print-title {
          display: none; /* Hide on screen */
        }

        @media print {
          .print-title {
            display: block; /* Show only when printing */
          }
          .print-hide {
            display: none; /* Hide on screen */
          }
        }
      `}</style>
      <CardHeader className="print-hide" title="Details" />
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
          <Box sx={{ color: 'text.secondary' }}>ORDER ID: #{order.ref}</Box>
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
          <Box sx={{ color: 'text.secondary' }}>
            Status :{' '}
            <Label
              variant="soft"
              color={
                (order?.status === 'Ready' && 'info') ||
                (order?.status === 'InProcess' && 'warning') ||
                (order?.status === 'Delivered' && 'success') ||
                'default'
              }
            >
              {order?.status}
            </Label>
          </Box>

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
