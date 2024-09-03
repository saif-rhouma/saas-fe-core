import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';

import { Label } from 'src/components/label';
import { Scrollbar } from 'src/components/scrollbar';
import { fDate } from 'src/utils/format-time';
import PlanProductTable from './plan-product-table';

// ----------------------------------------------------------------------

export function PlanDetailsItems({ plan, products }) {
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
            <div>Plan Details</div>
          </Stack>
          <Box sx={{ color: 'text.secondary' }}>Plan ID: #PLN-{plan?.id}</Box>
          <Box sx={{ color: 'text.secondary' }}>Plan Date: {fDate(plan?.planDate)}</Box>
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
            <div>Laundry Saas POS</div>
          </Stack>
          <Box sx={{ color: 'text.secondary' }}>Quantity : {plan?.quantity}</Box>
          {/* <Box sx={{ color: 'text.secondary' }}>{plan?.id}</Box> */}
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
            <div>Plan Status</div>
          </Stack>
          <Label variant="soft" color={'warning'}>
            {plan?.status}
          </Label>
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
          <PlanProductTable product={plan?.product} quantity={plan?.quantity} />
        </Box>
      </Scrollbar>
    </Card>
  );
}
