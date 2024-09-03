import { useCallback } from 'react';

import Stack from '@mui/material/Stack';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { InputAdornment, MenuItem, Select, TextField } from '@mui/material';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function ReportsOrderTableToolbar({ filters, onResetPage, options }) {
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
      <TextField
        sx={{ flexGrow: 1 }}
        value={filters.state.name}
        onChange={handleFilterName}
        placeholder="Search customer or order number..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          ),
        }}
      />
      <DatePicker label="Start Date" sx={{ flexGrow: 1 }} />
      <DatePicker label="End Date" sx={{ flexGrow: 1 }} />
      <Select
        sx={{ flexGrow: 1, textTransform: 'capitalize' }}
        value="All Orders"
        renderValue={(selected) => selected}
        // onChange={handleChangeRowsPerPage}
      >
        <MenuItem value={8}>All Plans</MenuItem>
        <MenuItem value={12}>Pending</MenuItem>
        <MenuItem value={24}>Processing-A</MenuItem>
        <MenuItem value={24}>Processing-B</MenuItem>
        <MenuItem value={24}>Ready</MenuItem>
      </Select>
    </Stack>
  );
}
