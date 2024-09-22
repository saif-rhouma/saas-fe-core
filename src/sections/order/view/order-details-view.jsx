import { useReactToPrint } from 'react-to-print';
import { useRef, useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';

import { paths } from 'src/routes/paths';

import { useBoolean } from 'src/hooks/use-boolean';

import { sortByDateDesc } from 'src/utils/helper';
import axios, { endpoints } from 'src/utils/axios';

import { DashboardContent } from 'src/layouts/dashboard';

import { toast } from 'src/components/snackbar';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import OrderProductAddons from '../order-product-addons';
import { OrderDetailsItems } from '../order-details-item';
import OrderPaymentDetailsDialog from '../order-payment-details-dialog';
// ----------------------------------------------------------------------

export function OrderDetailsView({ currentOrder }) {
  const [order, setOrder] = useState(currentOrder);
  const contentToPrint = useRef();
  const dialog = useBoolean();
  const queryClient = useQueryClient();
  const [paymentsList, setPaymentsList] = useState([]);

  useEffect(() => {
    setOrder(currentOrder);
  }, [currentOrder]);

  useEffect(() => {
    const payments = sortByDateDesc(order?.payments, 'paymentDate');
    setPaymentsList(payments);
  }, [order?.payments]);

  const { mutate: createPayment } = useMutation({
    mutationFn: (payload) => axios.post(endpoints.payments.create, payload),
    onSuccess: async (res) => {
      toast.success('New Payment Has Been Created!');
      const { data } = res;
      const sortedList = sortByDateDesc([...paymentsList, data], 'paymentDate');
      setPaymentsList(sortedList);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['payments'] });
      const { id } = order;
      await queryClient.invalidateQueries({ queryKey: ['order', id] });
      dialog.onFalse();
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const { mutate: handleApproveOrder } = useMutation({
    mutationFn: (id) => axios.get(endpoints.order.approve + id),
    onSuccess: async (res) => {
      toast.success('Order Has Been Approved!');
      const { data } = res;
      setOrder(data);
    },
    onSettled: async () => {
      const { id } = order;
      await queryClient.invalidateQueries({ queryKey: ['orders'] });
      await queryClient.invalidateQueries({ queryKey: ['orders', 'analytics'] });
      await queryClient.invalidateQueries({ queryKey: ['order', id] });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handlePrint = useReactToPrint({
    content: () => contentToPrint.current,
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
          <Stack
            ref={contentToPrint}
            spacing={3}
            direction={{ xs: 'column-reverse', md: 'column' }}
          >
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
            order={order}
            payments={paymentsList}
            dialog={dialog}
            handleApproveOrder={handleApproveOrder}
            handlePrint={handlePrint}
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
