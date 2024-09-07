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
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { fDate } from 'src/utils/format-time';

import { Iconify } from 'src/components/iconify';
import { useForm } from 'react-hook-form';
import { Form, Field, schemaHelper } from 'src/components/hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z as zod } from 'zod';

const TicketMessageCreationSchema = zod.object({
  message: zod.string().min(1, { message: 'Name is required!' }),
});

const TicketsPreviousMessage = ({ messages }) => {
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

  const onSubmit = handleSubmit(async (data) => {
    try {
      // const payload = { ...data };
      // delete payload.city;
      // payload.address = { country: data.city, city: data.city, street: data.address };
      // payload.taxNumber = payload.taxNumber.toString();
      // if (customer) {
      //   await handler({ id: customer.id, payload });
      // } else {
      //   await handler(payload);
      // }
      reset();
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
      </Timeline>
      <Form methods={methods} onSubmit={onSubmit}>
        <Stack justifyContent="flex-end" spacing={1} sx={{ marginTop: 1 }}>
          <Stack sx={{ typography: 'subtitle1', width: '100%', marginBottom: 1 }}>
            <div>Send Reply:</div>
          </Stack>
          <TextField
            label="Enter Description"
            name="description"
            multiline
            rows={3}
            sx={{ mb: 2 }}
          />
          <Box>
            <Button variant="contained" endIcon={<Iconify icon="iconamoon:send-fill" />}>
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
