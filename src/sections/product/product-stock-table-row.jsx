import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Box, Stack, Avatar } from '@mui/material';

import { CONFIG } from 'src/config-global';

const ProductStockTableRow = ({ row, selected }) => {
  const renderPrimary = (
    <TableRow hover selected={selected}>
      <TableCell>{row?.id}</TableCell>
      <TableCell>
        <Stack spacing={2} direction="row" alignItems="center">
          <Avatar alt={row?.name} src={CONFIG.site.serverFileHost + row?.image} />
          <Box component="span">{row?.name}</Box>
        </Stack>
      </TableCell>
      <TableCell>{row.quantity}</TableCell>
    </TableRow>
  );
  return renderPrimary;
};
export default ProductStockTableRow;
