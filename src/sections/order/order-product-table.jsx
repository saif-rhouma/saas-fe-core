import { Box, Stack, Table, TableBody, TableCell, TableRow } from '@mui/material';

import { varAlpha } from 'src/theme/styles';

import { TableHeadCustom } from 'src/components/table';

import { IncrementerButton } from '../product/components/incrementer-button';
import { fCurrency } from 'src/utils/format-number';

const OrderProductTable = ({ products, isDetail, onDecrease, onIncrease }) => {
  const TABLE_HEAD = [
    { id: 'orderNumber', label: '#', width: 40, align: 'center' },
    { id: 'name', label: 'Product Name', width: 160 },
    { id: 'color', label: 'Color', width: 80 },
    {
      id: 'rate',
      label: 'Rate',
      width: 80,
    },
    { id: 'totalAmount', label: 'Qty', width: 100 },
    { id: 'status', label: 'Total', width: 140 },
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
          {products?.map((product, idx) => (
            <TableRow key={isDetail ? `${product.productId}` : `${product.id}`}>
              <TableCell align="center"> {product.productId} </TableCell>
              <TableCell> {isDetail ? `${product.product.name}` : product.name} </TableCell>
              <TableCell> x </TableCell>
              <TableCell align={isDetail ? 'inherit' : 'center'}>
                {isDetail ? (
                  `${fCurrency(product.product.price)}`
                ) : (
                  <Stack
                    sx={{
                      p: 0.5,
                      width: 88,
                      borderRadius: 1,
                      typography: 'subtitle2',
                      border: (theme) =>
                        `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.2)}`,
                    }}
                  >
                    {fCurrency(product.price)}
                  </Stack>
                )}
              </TableCell>
              <TableCell>
                {isDetail ? (
                  `x${product.quantity}`
                ) : (
                  <Box sx={{ width: 88, textAlign: 'right' }}>
                    <IncrementerButton
                      quantity={product.quantity}
                      onDecrease={() => onDecrease(idx)}
                      onIncrease={() => onIncrease(idx)}
                    />
                  </Box>
                )}
              </TableCell>
              <TableCell>
                {' '}
                {isDetail
                  ? `${fCurrency(product.product.price * product.quantity)}`
                  : fCurrency(product.price * product.quantity)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};
export default OrderProductTable;
