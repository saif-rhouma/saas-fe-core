import Stack from '@mui/material/Stack';
import { LoadingButton } from '@mui/lab';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import {
  Button,
  Switch,
  TextField,
  DialogTitle,
  DialogActions,
  FormControlLabel,
  Divider,
} from '@mui/material';

const ProductAddonCreateDialog = ({ addon, open, onClose }) => {
  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      <DialogTitle>Add Addon</DialogTitle>
      <Divider />
      <DialogContent>
        <Stack
          spacing={2}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(2, 1fr)',
          }}
        >
          <TextField fullWidth label="Enter Addon Name" sx={{ mt: 2 }} />
          <TextField label="Enter Addon Price" sx={{ mt: 2 }} />
          <FormControlLabel
            control={<Switch name="isActive" defaultChecked />}
            label="Is Active?"
          />
        </Stack>
      </DialogContent>
      <Divider sx={{ pt: 1, mt: 1 }} />
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
export default ProductAddonCreateDialog;
