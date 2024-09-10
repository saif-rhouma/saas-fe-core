import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

const ProductStockTableRow = ({ row, selected }) => {
  const renderPrimary = (
    <TableRow hover selected={selected}>
      <TableCell>{row.orderNumber}</TableCell>
      <TableCell>{row.customer.name}</TableCell>
      <TableCell>{row.totalQuantity}</TableCell>
    </TableRow>
  );
  return renderPrimary;
};
export default ProductStockTableRow;
