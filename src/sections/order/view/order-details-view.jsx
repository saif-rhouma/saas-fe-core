import { useMutation, useQueryClient } from '@tanstack/react-query';

import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';

import { paths } from 'src/routes/paths';

import { useBoolean } from 'src/hooks/use-boolean';

import axios, { endpoints } from 'src/utils/axios';

import { DashboardContent } from 'src/layouts/dashboard';

import { toast } from 'src/components/snackbar';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import OrderProductAddons from '../order-product-addons';
import { OrderDetailsItems } from '../order-details-item';
import OrderPaymentDetailsDialog from '../order-payment-details-dialog';
// ----------------------------------------------------------------------

export function OrderDetailsView({ order }) {
  const dialog = useBoolean();
  const queryClient = useQueryClient();

  const { mutate: createPayment } = useMutation({
    mutationFn: (payload) => axios.post(endpoints.payments.create, payload),
    onSuccess: async () => {
      toast.success('New Payment Has Been Created!');
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['payments'] });
      await queryClient.invalidateQueries({ queryKey: ['orders', order.id] });
      dialog.onFalse();
    },
    onError: (err) => {
      console.log(err);
    },
  });
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Order', href: paths.dashboard.order.root },
          { name: 'Order Details' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <Grid container spacing={3}>
        <Grid xs={12} md={9}>
          <Stack spacing={3} direction={{ xs: 'column-reverse', md: 'column' }}>
            <OrderDetailsItems
              order={order}
              customer={order?.customer}
              taxes={order?.customer?.customer}
              shipping={order?.shipping}
              discount={order?.discount}
              subtotal={order?.subtotal}
              totalAmount={order?.totalOrderAmount}
            />
          </Stack>
        </Grid>

        <Grid xs={12} md={3}>
          <OrderProductAddons
            // setTriggerRender={setTriggerRender}
            order={order}
            payments={order?.payments}
            dialog={dialog}
          />
        </Grid>
      </Grid>
      <OrderPaymentDetailsDialog
        order={order}
        open={dialog.value}
        onClose={dialog.onFalse}
        handler={createPayment}
      />
    </DashboardContent>
  );
}
