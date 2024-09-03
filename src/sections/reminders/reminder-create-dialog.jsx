import { LoadingButton } from '@mui/lab';
import { Button, DialogActions, DialogTitle, TextField } from '@mui/material';
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

const ReminderCreateDialog = ({ reminder, open, onClose }) => {
  const handleDrop = useCallback(() => {}, []);

  const handleUpload = () => {
    onClose();
    console.info('ON UPLOAD');
  };

  const handleRemoveFile = () => {};

  const handleRemoveAllFiles = () => {};
  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={onClose}>
      <DialogTitle>Edit Payment</DialogTitle>
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
            <DatePicker label="Date" sx={{ flexGrow: 1 }} />
            <TimePicker label="Time" sx={{ flexGrow: 1 }} />
            <TextField label="Title" sx={{ flexGrow: 1 }} />
            <TextField label="Description" sx={{ flexGrow: 1 }} />
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
export default ReminderCreateDialog;
