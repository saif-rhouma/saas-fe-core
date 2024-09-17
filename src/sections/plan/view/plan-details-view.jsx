import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';

import { paths } from 'src/routes/paths';

import axios, { endpoints } from 'src/utils/axios';

import { DashboardContent } from 'src/layouts/dashboard';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { PlanDetailsItems } from '../plan-details-item';
// ----------------------------------------------------------------------

export function PlanDetailsView({ plan }) {
  const [hideBtn, setHideBtn] = useState(false);
  const queryClient = useQueryClient();
  const { mutate: transferToStock } = useMutation({
    mutationFn: (id) => axios.post(endpoints.plan.transferToStock + id),
    onSuccess: async () => {
      toast.success('Delete success!');
      setHideBtn(() => true);
    },
    onSettled: async () => {
      const { id } = plan;
      await queryClient.invalidateQueries({ queryKey: ['plans'] });
      await queryClient.invalidateQueries({ queryKey: ['plan', id] });
    },
    onError: () => {},
  });
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Plan', href: paths.dashboard.plan.root },
          { name: 'Plan Details' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
        action={
          !plan?.isTransferred &&
          plan?.status === 'Ready' && (
            <Button
              onClick={async () => {
                transferToStock(plan.id);
              }}
              variant="contained"
              startIcon={<Iconify icon="solar:home-add-bold" />}
            >
              Transfer To Stock
            </Button>
          )
        }
      />
      <Grid container spacing={3}>
        <Grid xs={12} md={12}>
          <Stack spacing={3} direction={{ xs: 'column-reverse', md: 'column' }}>
            <PlanDetailsItems
              items={plan?.items}
              plan={plan}
              taxes={plan?.taxes}
              shipping={plan?.shipping}
              discount={plan?.discount}
              subtotal={plan?.subtotal}
              totalAmount={plan?.totalAmount}
            />
          </Stack>
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
