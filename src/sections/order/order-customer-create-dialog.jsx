import { LoadingButton } from '@mui/lab';
import {
  Button,
  DialogActions,
  DialogTitle,
  FormControlLabel,
  Switch,
  TextField,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Stack from '@mui/material/Stack';

function OrderCustomerCreateDialog({ customer, open, onClose }) {
  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      <DialogTitle>Add Customer</DialogTitle>
      <DialogContent>
        <Stack
          spacing={2}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(2, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(2, 1fr)',
          }}
        >
          <TextField fullWidth label="Enter Customer Name" sx={{ mt: 2 }} />
          <TextField label="Enter The City" sx={{ mt: 2 }} />
          <TextField label="Enter Phone Number" sx={{ mt: 2 }} />
          <TextField label="Enter Email Address" sx={{ mt: 2 }} />
          <TextField label="Enter Tax Number" sx={{ mt: 2 }} />
          <TextField label="Enter Address" name="description" multiline rows={3} sx={{ mt: 2 }} />
          <FormControlLabel
            control={<Switch name="isActive" defaultChecked />}
            label="Is Active?"
          />
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
}

export default OrderCustomerCreateDialog;
