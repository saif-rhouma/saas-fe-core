import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

const ReportsStockTableRow = ({ row, selected }) => {
  const renderPrimary = (
    <TableRow hover selected={selected}>
      <TableCell>{row.orderNumber}</TableCell>
      <TableCell>{row.customer.name}</TableCell>
      <TableCell>{row.orderNumber}</TableCell>
      <TableCell>{row.orderNumber}</TableCell>
      <TableCell>{row.orderNumber}</TableCell>
      <TableCell>{row.orderNumber}</TableCell>
      <TableCell>{row.orderNumber}</TableCell>
      <TableCell>{row.orderNumber}</TableCell>
    </TableRow>
  );

  return <>{renderPrimary}</>;
};
export default ReportsStockTableRow;
