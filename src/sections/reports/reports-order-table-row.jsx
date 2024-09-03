import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { useBoolean } from 'src/hooks/use-boolean';

import { usePopover } from 'src/components/custom-popover';
import { fDate } from 'src/utils/format-time';

const ReportsOrderTableRow = ({ row, selected, onViewRow, onSelectRow, onDeleteRow }) => {
  const confirm = useBoolean();

  const collapse = useBoolean();

  const popover = usePopover();

  const renderPrimary = (
    <TableRow hover selected={selected}>
      <TableCell>{fDate(row.createdAt)}</TableCell>
      <TableCell>{row.orderNumber}</TableCell>
      <TableCell>{row.orderNumber}</TableCell>
      <TableCell>{row.orderNumber}</TableCell>
      <TableCell>{row.orderNumber}</TableCell>
    </TableRow>
  );

  return <>{renderPrimary}</>;
};
export default ReportsOrderTableRow;
