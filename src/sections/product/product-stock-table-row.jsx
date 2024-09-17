import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Avatar, Box, Stack } from '@mui/material';

const ProductStockTableRow = ({ row, selected }) => {
  const storageHost = 'http://localhost:3000/api/files/show/';
  const renderPrimary = (
    <TableRow hover selected={selected}>
      <TableCell>{row?.id}</TableCell>
      <TableCell>
        <Stack spacing={2} direction="row" alignItems="center">
          <Avatar alt={row?.name} src={storageHost + row?.image} />
          <Box component="span">{row?.name}</Box>
        </Stack>
      </TableCell>
      <TableCell>{row.quantity}</TableCell>
    </TableRow>
  );
  return renderPrimary;
};
export default ProductStockTableRow;
