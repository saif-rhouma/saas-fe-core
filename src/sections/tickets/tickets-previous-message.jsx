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

const TicketsPreviousMessage = ({ history, customer }) => {
  const renderTimeline = (
    <Box sx={{ pr: 4, pl: 4, pb: 4, pt: 2 }}>
      <Timeline
        sx={{ p: 0, m: 0, [`& .${timelineItemClasses.root}:before`]: { flex: 0, padding: 0 } }}
      >
        {history?.timeline.map((item, index) => {
          const firstTimeline = index === 0;

          const lastTimeline = index === history.timeline.length - 1;

          return (
            <TimelineItem key={item.title}>
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
                    <Typography variant="subtitle2">{customer.name}</Typography>

                    <Box sx={{ color: 'text.disabled', typography: 'caption', mt: 0.5 }}>
                      {item.title}
                    </Box>
                  </Box>
                  <Box sx={{ color: 'text.disabled', typography: 'caption' }}>
                    {fDate(item.time)}
                  </Box>
                </Box>
              </TimelineContent>
            </TimelineItem>
          );
        })}
      </Timeline>
      <Stack justifyContent="flex-end" spacing={1} sx={{ marginTop: 1 }}>
        <Stack sx={{ typography: 'subtitle1', width: '100%', marginBottom: 1 }}>
          <div>Send Reply:</div>
        </Stack>
        <TextField label="Enter Description" name="description" multiline rows={3} sx={{ mb: 2 }} />
        <Box>
          <Button variant="contained" endIcon={<Iconify icon="iconamoon:send-fill" />}>
            Send
          </Button>
        </Box>
      </Stack>
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
