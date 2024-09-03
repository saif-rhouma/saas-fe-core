import { useCallback } from 'react';

import Stack from '@mui/material/Stack';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// ----------------------------------------------------------------------

export function ReportsDailyTableToolbar({ filters, onResetPage, options }) {
  const handleFilterName = useCallback(
    (event) => {
      onResetPage();
      filters.setState({ name: event.target.value });
    },
    [filters, onResetPage]
  );
  return (
    <Stack
      spacing={2}
      justifyContent={{ xs: 'space-between' }}
      alignItems={{ xs: 'flex-end', md: 'center' }}
      direction={{ xs: 'column', md: 'row' }}
      sx={{ p: 2.5 }}
    >
      <DatePicker label="Date" />
    </Stack>
  );
}
