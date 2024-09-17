import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Box, Stack, Avatar } from '@mui/material';

const ReportsStockTableRow = ({ row, selected }) => {
  const storageHost = 'http://localhost:3000/api/files/show/';
  const renderPrimary = (
    <TableRow hover selected={selected}>
      <TableCell>{row?.productId}</TableCell>
      <TableCell>
        <Stack spacing={2} direction="row" alignItems="center">
          <Avatar alt={row?.name} src={storageHost + row?.image} />
          <Box component="span">{row?.name}</Box>
        </Stack>
      </TableCell>
      <TableCell>{row?.totals_quantity}</TableCell>
      <TableCell>{row?.pending_quantity}</TableCell>
      <TableCell>{row?.processing_a_quantity}</TableCell>
      <TableCell>{row?.processing_b_quantity}</TableCell>
      <TableCell>{row?.ready_quantity}</TableCell>
      {/* <TableCell>-</TableCell> */}
      <TableCell>{row?.in_stock}</TableCell>
    </TableRow>
  );

  return <>{renderPrimary}</>;
};
export default ReportsStockTableRow;
