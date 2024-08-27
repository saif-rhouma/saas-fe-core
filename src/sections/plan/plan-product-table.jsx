import { Box, Stack, Table, TableRow, TableBody, TableCell } from '@mui/material';

import { varAlpha } from 'src/theme/styles';

import { TableHeadCustom } from 'src/components/table';

import { IncrementerButton } from '../product/components/incrementer-button';

const PlanProductTable = () => {
  const TABLE_HEAD = [
    { id: 'planId', label: '#', width: 40, align: 'center' },
    { id: 'name', label: 'Product Name' },
    { id: 'totalAmount', label: 'Qty', width: 200 },
  ];

  const onDelete = () => {};
  const onDecrease = () => {};
  const onIncrease = () => {};

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        borderRadius: 1,
        overflow: 'hidden',
        border: (theme) => `solid 1px ${theme.vars.palette.divider}`,
      }}
    >
      <Table size="medium">
        <TableHeadCustom headLabel={TABLE_HEAD} />

        <TableBody>
          <TableRow>
            <TableCell align="center"> 01 </TableCell>
            <TableCell> Shoes </TableCell>
            <TableCell>50</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
};
export default PlanProductTable;
