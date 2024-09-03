import { Box, Table, TableBody, TableCell, TableRow } from '@mui/material';

import { TableHeadCustom } from 'src/components/table';

const PlanProductTable = ({ product, quantity }) => {
  const TABLE_HEAD = [
    { id: 'planId', label: '#', width: 40, align: 'center' },
    { id: 'name', label: 'Product Name' },
    { id: 'quantity', label: 'Qty', width: 200 },
  ];

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
            <TableCell align="center"> {product?.id} </TableCell>
            <TableCell> {product?.name} </TableCell>
            <TableCell>{quantity}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
};
export default PlanProductTable;
