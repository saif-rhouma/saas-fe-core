import Timeline from '@mui/lab/Timeline';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { fDate } from 'src/utils/format-time';

import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { Field, Form } from 'src/components/hook-form';
import { Iconify } from 'src/components/iconify';
import { toast } from 'src/components/snackbar';
import axios, { endpoints } from 'src/utils/axios';
import { z as zod } from 'zod';
import { Scrollbar } from 'src/components/scrollbar';

const TicketMessageCreationSchema = zod.object({
  message: zod.string().min(1, { message: 'Name is required!' }),
});

const TicketsPreviousMessage = ({ ticket, messages }) => {
  const defaultValues = {
    message: '',
  };

  const methods = useForm({
    resolver: zodResolver(TicketMessageCreationSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const queryClient = useQueryClient();

  const { mutate: createMessage } = useMutation({
    mutationFn: (payload) => axios.post(endpoints.tickets.createMessage, payload),
    onSuccess: async () => {
      toast.success('Message Has Been Created!');
      reset();
    },
    onSettled: async () => {
      const id = ticket.id;
      await queryClient.invalidateQueries({ queryKey: ['tickets'] });
      await queryClient.invalidateQueries({ queryKey: ['tickets', id] });
    },
    onError: (err) => {},
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (ticket.id) {
        const payload = { ...data };
        payload.ticketId = ticket.id;
        createMessage(payload);
      }
    } catch (error) {
      console.log(error);
      setErrorMsg(error instanceof Error ? error.message : error);
    }
  });

  const renderTimeline = (
    <Box sx={{ pr: 4, pl: 4, pb: 4, pt: 2 }}>
      <Timeline
        sx={{ p: 0, m: 0, [`& .${timelineItemClasses.root}:before`]: { flex: 0, padding: 0 } }}
      >
        <Scrollbar fillContent sx={{ height: 360 }}>
          {messages?.map((item, index) => {
            const firstTimeline = index === 0;
            const lastTimeline = index === messages.length - 1;
            return (
              <TimelineItem key={item.id}>
                <TimelineSeparator>
                  <TimelineDot color={'primary'} />
                  {lastTimeline ? null : <TimelineConnector />}
                </TimelineSeparator>
                <TimelineContent>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Box>
                      <Typography variant="subtitle2">{item.createdBy.firstName}</Typography>
                      <Box sx={{ color: 'text.disabled', typography: 'caption', mt: 0.5 }}>
                        {item.message}
                      </Box>
                    </Box>
                    <Box sx={{ color: 'text.disabled', typography: 'caption' }}>
                      {fDate(item.createTime)}
                    </Box>
                  </Box>
                </TimelineContent>
              </TimelineItem>
            );
          })}
        </Scrollbar>
      </Timeline>
      <Form methods={methods} onSubmit={onSubmit}>
        <Stack justifyContent="flex-end" spacing={1} sx={{ marginTop: 1 }}>
          <Stack sx={{ typography: 'subtitle1', width: '100%', marginBottom: 1 }}>
            <div>Send Reply:</div>
          </Stack>
          <Field.Text label="Enter Description" name="message" multiline rows={3} sx={{ mb: 2 }} />
          <Box>
            <Button
              type="submit"
              variant="contained"
              endIcon={<Iconify icon="iconamoon:send-fill" />}
            >
              Send
            </Button>
          </Box>
        </Stack>
      </Form>
    </Box>
  );

  return (
    <Card>
      <CardHeader title="Previous Messages" />
      {renderTimeline}
    </Card>
  );
};
export default TicketsPreviousMessage;
