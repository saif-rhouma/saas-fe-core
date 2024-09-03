import { LoadingButton } from '@mui/lab';
import { Button, DialogActions, DialogTitle, MenuItem, Select, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useCallback } from 'react';
import { Upload } from 'src/components/upload';

const OrderPaymentDetailsDialog = ({ payment, open, onClose }) => {
  const handleDrop = useCallback(() => {}, []);

  const handleUpload = () => {
    onClose();
    console.info('ON UPLOAD');
  };

  const handleRemoveFile = () => {};

  const handleRemoveAllFiles = () => {};

  return (
    <Dialog fullWidth maxWidth="lg" open={open} onClose={onClose}>
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
              Third co.
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
              ORD-6239
            </Typography>
          </Box>
          <Box display="flex">
            <Typography
              component="span"
              variant="body2"
              sx={{ flexGrow: 1, color: 'text.secondary' }}
            >
              Order Date:
            </Typography>
            <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
              26/06/2024
            </Typography>
          </Box>
          <Box display="flex">
            <Typography
              component="span"
              variant="body2"
              sx={{ flexGrow: 1, color: 'text.secondary' }}
            >
              Delivery Date:
            </Typography>
            <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
              26/06/2024
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
              SR 4,631.00
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
              SR 4,631.00
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
              SR 4,631.00
            </Typography>
          </Box>
        </Stack>
        <Divider />
        <Stack spacing={2} sx={{ pt: 4, pb: 1 }}>
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
            <TextField label="Paid Amount" sx={{ flexGrow: 1 }} />
            <DatePicker label="Date" sx={{ flexGrow: 1 }} />
          </Box>
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
            {' '}
            <Box>
              <Select
                fullWidth
                sx={{ textTransform: 'capitalize' }}
                value="Customer"
                renderValue={(selected) => selected}
                // onChange={handleChangeRowsPerPage}
              >
                <MenuItem value="Customer">Customer</MenuItem>
                <MenuItem value={12}>Processing</MenuItem>
                <MenuItem value={24}>Waiting for Approval</MenuItem>
                <MenuItem value={24}>Delivered</MenuItem>
              </Select>
            </Box>
            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Attachments</Typography>
              <Upload multiple onDrop={handleDrop} onRemove={handleRemoveFile} />
            </Stack>
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <LoadingButton type="submit" variant="contained">
          Save
        </LoadingButton>
        <Button color="inherit" variant="outlined" onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default OrderPaymentDetailsDialog;
