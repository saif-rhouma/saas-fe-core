import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

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
