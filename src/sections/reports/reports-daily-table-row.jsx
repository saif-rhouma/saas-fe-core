import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { useBoolean } from 'src/hooks/use-boolean';

import { usePopover } from 'src/components/custom-popover';

const ReportsDailyTableRow = ({ row, selected }) => {
  const renderPrimary = (
    <TableRow hover selected={selected}>
      <TableCell>{row?.label}</TableCell>
      <TableCell>{row?.value}</TableCell>
    </TableRow>
  );

  return <>{renderPrimary}</>;
};
export default ReportsDailyTableRow;
