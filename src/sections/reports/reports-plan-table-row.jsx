import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { fDate } from 'src/utils/format-time';

const ReportsPlanTableRow = ({ row, selected }) => {
  console.log('----------> row', row);
  const renderPrimary = (
    <TableRow hover selected={selected}>
      <TableCell>{fDate(row?.planDate)}</TableCell>
      <TableCell>PLN-{row?.id}</TableCell>
      <TableCell>{row?.product?.name}</TableCell>
      <TableCell>{row?.quantity}</TableCell>
      <TableCell>{row?.status}</TableCell>
    </TableRow>
  );

  return <>{renderPrimary}</>;
};
export default ReportsPlanTableRow;
