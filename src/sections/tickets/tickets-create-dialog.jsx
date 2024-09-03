import { LoadingButton } from '@mui/lab';
import {
  Button,
  DialogActions,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { TimePicker } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useCallback } from 'react';
import { Upload } from 'src/components/upload';
const TicketsCreateDialog = ({ reminder, open, onClose }) => {
  const handleDrop = useCallback(() => {}, []);

  const handleUpload = () => {
    onClose();
    console.info('ON UPLOAD');
  };

  const handleRemoveFile = () => {};

  const handleRemoveAllFiles = () => {};
  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={onClose}>
      <DialogTitle>Add New Ticket</DialogTitle>
      <DialogContent>
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
            <TextField label="Enter Topic" sx={{ flexGrow: 1 }} />
            <TextField label="Description" sx={{ flexGrow: 1 }} />
            <Select
              sx={{ width: 420, textTransform: 'capitalize' }}
              value="Select a Priority"
              renderValue={(selected) => selected}
              // onChange={handleChangeRowsPerPage}
            >
              <MenuItem value={8}>All Tickets</MenuItem>
              <MenuItem value={12}>Open Tickets</MenuItem>
              <MenuItem value={24}>Close Tickets</MenuItem>
            </Select>
            <Select
              sx={{ width: 420, textTransform: 'capitalize' }}
              value="Select a Members"
              renderValue={(selected) => selected}
              // onChange={handleChangeRowsPerPage}
            >
              <MenuItem value={8}>All Tickets</MenuItem>
              <MenuItem value={12}>Open Tickets</MenuItem>
              <MenuItem value={24}>Close Tickets</MenuItem>
            </Select>
          </Box>
          <Box>
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
export default TicketsCreateDialog;
