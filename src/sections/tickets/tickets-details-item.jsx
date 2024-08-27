import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Iconify } from 'src/components/iconify';
import { Label } from 'src/components/label';

// ----------------------------------------------------------------------

export function TicketDetailsItems({ row }) {
  return (
    <Card>
      <CardHeader title="Details" />
      <Stack sx={{ p: 3 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{
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
              <div>Ticket Details</div>
            </Stack>
            <Box sx={{ color: 'text.secondary' }}>TICKET ID: #ORD-0004</Box>
            <Box sx={{ color: 'text.secondary' }}>Members: Admin</Box>
            <Box sx={{ color: 'text.secondary' }}>
              Topic: Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </Box>
          </Box>
          <Box
            flexDirection="column"
            alignItems="center"
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
              <div>Ticket Status</div>
            </Stack>
            <Box sx={{ color: 'text.secondary' }}>
              <Label
                variant="soft"
                color={
                  (row.status === 'completed' && 'info') ||
                  (row.status === 'pending' && 'warning') ||
                  (row.status === 'cancelled' && 'error') ||
                  'default'
                }
              >
                {row.status}
              </Label>
            </Box>
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
              justifyContent="center"
              alignItems="center"
              gap={1}
              sx={{ typography: 'subtitle2', width: '100%', marginBottom: 1 }}
            >
              <div>Ticket Priority</div>
            </Stack>
            <Box sx={{ color: 'text.secondary' }}>
              <Label
                variant="soft"
                color={
                  (row.status === 'completed' && 'success') ||
                  (row.status === 'pending' && 'warning') ||
                  (row.status === 'cancelled' && 'error') ||
                  'default'
                }
              >
                {row.status}
              </Label>
            </Box>
          </Box>
        </Stack>
        <Box sx={{ pt: 5 }}>
          <Button variant="contained" startIcon={<Iconify icon="carbon:checkmark-filled" />}>
            Mark as Closed
          </Button>
        </Box>
      </Stack>
    </Card>
  );
}
