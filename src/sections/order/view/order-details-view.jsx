import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { OrderDetailsItems } from '../order-details-item';
import OrderProductAddons from '../order-product-addons';
// ----------------------------------------------------------------------

export function OrderDetailsView({ order }) {
  console.log('----------->> order', order);
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
          <OrderProductAddons payments={order?.payments} />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
