import { Button, DialogActions, DialogTitle } from '@mui/material';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { fCurrency } from 'src/utils/format-number';
import { fDate } from 'src/utils/format-time';

const PaymentDetailsDialog = ({ payment, open, onClose }) => {
  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={onClose}>
      <DialogTitle>Payment Details</DialogTitle>
      <DialogContent>
        <Divider />
        <Stack spacing={1} sx={{ pt: 1, pb: 1 }}>
          <Box display="flex">
            <Typography
              component="span"
              variant="body2"
              sx={{ flexGrow: 1, color: 'text.secondary' }}
            >
              Customer Name:
            </Typography>
            <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
              {payment?.customer?.name}
            </Typography>
          </Box>
          <Box display="flex">
            <Typography
              component="span"
              variant="body2"
              sx={{ flexGrow: 1, color: 'text.secondary' }}
            >
              Order ID:
            </Typography>
            <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
              ORD-{payment?.id}
            </Typography>
          </Box>
          <Box display="flex">
            <Typography
              component="span"
              variant="body2"
              sx={{ flexGrow: 1, color: 'text.secondary' }}
            >
              Payment Date:
            </Typography>
            <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
              {fDate(payment?.paymentDate)}
            </Typography>
          </Box>
          <Box display="flex">
            <Typography
              component="span"
              variant="body2"
              sx={{ flexGrow: 1, color: 'text.secondary' }}
            >
              Payment Type:
            </Typography>
            <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
              {payment?.paymentType}
            </Typography>
          </Box>
          <Box display="flex">
            <Typography
              component="span"
              variant="body2"
              sx={{ flexGrow: 1, color: 'text.secondary' }}
            >
              Payment Amount:
            </Typography>
            <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
              {fCurrency(payment?.amount) || '-'}
            </Typography>
          </Box>
        </Stack>
        <Divider />
        <Stack spacing={1} sx={{ pt: 1, pb: 1 }}>
          <Box display="flex">
            <Typography
              component="span"
              variant="body2"
              sx={{ flexGrow: 1, color: 'text.secondary' }}
            >
              Order Amount:
            </Typography>
            <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
              {fCurrency(payment?.order?.totalOrderAmount) || '-'}
            </Typography>
          </Box>
          <Box display="flex">
            <Typography
              component="span"
              variant="body2"
              sx={{ flexGrow: 1, color: 'text.secondary' }}
            >
              Paid Amount:
            </Typography>
            <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
              {fCurrency(payment?.order?.orderPaymentAmount) || '-'}
            </Typography>
          </Box>
        </Stack>
        <Divider />
        <Stack spacing={1} sx={{ pt: 2, pb: 2 }}>
          <Box display="flex">
            <Typography component="span" variant="subtitle1" sx={{ flexGrow: 1 }}>
              Balance:
            </Typography>
            <Typography component="span" variant="subtitle1">
              {fCurrency(payment?.order?.totalOrderAmount - payment?.order?.orderPaymentAmount)}
            </Typography>
          </Box>
        </Stack>
        <Divider />
      </DialogContent>
      <DialogActions>
        <Button color="inherit" variant="outlined" onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default PaymentDetailsDialog;
