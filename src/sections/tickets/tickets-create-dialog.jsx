import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef, useMemo, useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { LoadingButton } from '@mui/lab';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import DialogContent from '@mui/material/DialogContent';
import { Button, MenuItem, DialogTitle, DialogActions } from '@mui/material';

import axios, { endpoints } from 'src/utils/axios';

import { Upload } from 'src/components/upload';
import { toast } from 'src/components/snackbar';
import { Scrollbar } from 'src/components/scrollbar';
import { Form, Field } from 'src/components/hook-form';
import { LoadingScreen } from 'src/components/loading-screen';

export const NewTicketSchema = zod.object({
  topic: zod.string().min(1, { message: 'Topic is required!' }),
  description: zod.string().min(1, { message: 'Description is required!' }),
  memberId: zod.number().min(1, { message: 'Member is required!' }),
  priority: zod.string().min(1, { message: 'Priority is required!' }),
});

const TicketsCreateDialog = ({ currentTicket, open, onClose }) => {
  //! Upload Logic START
  const store = useRef();
  const [members, setMembers] = useState([]);
  const [file, setFile] = useState();

  const handleDropSingleFile = useCallback((acceptedFiles) => {
    const newFile = acceptedFiles[0];
    setFile(() => newFile);
  }, []);

  const handleDelete = () => {
    setFile(null);
  };

  const queryClient = useQueryClient();
  const uploadConfig = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };

  //! Upload Logic END

  const { mutate: handleUploadTicketFile } = useMutation({
    mutationFn: (file) => axios.post(endpoints.files.upload, file, uploadConfig),
    onSuccess: async ({ data }) => {
      const { name: filename } = data;
      if (filename) {
        const { current: payload } = store;
        payload.file = filename;
        await handleCreateTicket(payload);
      }
      return data;
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['tickets-images'] });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const { mutate: handleCreateTicket } = useMutation({
    mutationFn: (payload) => axios.post(endpoints.tickets.create, payload),
    onSuccess: async () => {
      toast.success('New Ticket Has Been Created!');

      reset();
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['tickets'] });
      store.current = {};
      setFile(null);
      onClose();
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const defaultValues = useMemo(
    () => ({
      topic: currentTicket?.topic || '',
      description: currentTicket?.description || '',
      memberId: currentTicket?.memberId || null,
      priority: currentTicket?.priority || null,
    }),
    [currentTicket]
  );

  const methods = useForm({
    resolver: zodResolver(NewTicketSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (payload) => {
    try {
      if (file) {
        store.current = { ...payload };
        const formData = new FormData();
        formData.append('file', file);
        formData.append('category', 'Ticket');
        await handleUploadTicketFile(formData);
      } else {
        await handleCreateTicket(payload);
      }
    } catch (error) {
      console.error(error);
    }
  });

  const response = useQuery({
    queryKey: ['members'],
    queryFn: async () => {
      const { data } = await axios.get(endpoints.staff.list);
      setMembers(data);
      return data;
    },
  });

  if (response.isPending || response.isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={onClose}>
      <DialogTitle>Add New Ticket</DialogTitle>
      <Form methods={methods} onSubmit={onSubmit}>
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
              <Field.Text fullWidth label="Enter Topic" name="topic" sx={{ flexGrow: 1 }} />
              <Field.Text fullWidth label="Description" name="description" sx={{ flexGrow: 1 }} />

              <Field.Select
                name="priority"
                label="Select a Priority"
                sx={{ width: 420, textTransform: 'capitalize' }}
              >
                <MenuItem value="Low">Low</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Hight">Hight</MenuItem>
              </Field.Select>

              <Field.Select
                name="memberId"
                label="Select a Member"
                sx={{ width: 420, textTransform: 'capitalize' }}
              >
                {members.map((member) => (
                  <MenuItem key={member.id} value={member.id}>
                    {`${member?.firstName} ${member?.lastName}`}
                  </MenuItem>
                ))}
              </Field.Select>
            </Box>
            <Box>
              <Stack spacing={1.5}>
                <Typography variant="subtitle2">Attachments</Typography>
                <Scrollbar sx={{ maxHeight: 360, p: 2 }}>
                  <Upload value={file} onDrop={handleDropSingleFile} onDelete={handleDelete} />
                </Scrollbar>
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
      </Form>
    </Dialog>
  );
};
export default TicketsCreateDialog;
