import { useCallback } from 'react';

import InputAdornment from '@mui/material/InputAdornment';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import { usePopover } from 'src/components/custom-popover';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function PlanTableToolbar({ filters, onResetPage, dateError }) {
  const popover = usePopover();

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
        sx={{ width: 420 }}
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

      <Select
        sx={{ width: 420, textTransform: 'capitalize' }}
        value="All Plans"
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
