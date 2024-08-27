import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Timeline from '@mui/lab/Timeline';
import Button from '@mui/material/Button';
import TimelineDot from '@mui/lab/TimelineDot';
import TextField from '@mui/material/TextField';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';

import { fDateTime } from 'src/utils/format-time';

import { Label } from 'src/components/label';

const OrderProductAddons = ({ history }) => {
  const renderTimeline = (
    <Box sx={{ pr: 4, pl: 4, pb: 4, pt: 2 }}>
      <Box sx={{ mb: 2 }}>
        <TextField size="small" fullWidth />
      </Box>
      <Stack sx={{ typography: 'subtitle2', width: '100%', marginBottom: 1 }}>
        <div>Payments</div>
      </Stack>
      <Timeline
        sx={{ p: 0, m: 0, [`& .${timelineItemClasses.root}:before`]: { flex: 0, padding: 0 } }}
      >
        {history?.timeline.map((item, index) => {
          const firstTimeline = index === 0;

          const lastTimeline = index === history.timeline.length - 1;

          return (
            <TimelineItem key={item.title}>
              <TimelineSeparator>
                <TimelineDot color={(firstTimeline && 'primary') || 'grey'} />
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
                    <Typography variant="subtitle2">{item.title}</Typography>

                    <Box sx={{ color: 'text.disabled', typography: 'caption', mt: 0.5 }}>
                      {fDateTime(item.time)}
                    </Box>
                  </Box>
                  <Label color="success">CASH</Label>
                </Box>
              </TimelineContent>
            </TimelineItem>
          );
        })}
      </Timeline>
      <Stack justifyContent="flex-end" spacing={1.5} sx={{ marginTop: 2 }}>
        <Button variant="contained">Add Payment</Button>
        <Button variant="outlined">Approve</Button>
        <Button>Print Invoice</Button>
      </Stack>
    </Box>
  );

  return (
    <Card>
      <CardHeader title="Product Addons" />
      {renderTimeline}
    </Card>
  );
};
export default OrderProductAddons;
