/* eslint-disable no-unsafe-optional-chaining */
import { useState } from 'react';

import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import { Box, Stack, Paper, Avatar, Collapse, ListItemText } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { fCurrency } from 'src/utils/format-number';
import { PermissionsType } from 'src/utils/constant';
import { calculateAfterTax } from 'src/utils/helper';

import { CONFIG } from 'src/config-global';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { usePopover, CustomPopover } from 'src/components/custom-popover';
import PermissionAccessController from 'src/components/permission-access-controller/permission-access-controller';

const ProductTableRow = ({ row, index, taxPercentage, selected, onDeleteRow, onEditRow }) => {
  const [hasOrders, setHasOrders] = useState(
    row?.productToOrder.filter((item) => item?.order?.status === 'Delivered').length > 0
  );
  const confirm = useBoolean();
  const collapse = useBoolean();
  const popover = usePopover();
  const renderPrimary = (
    <TableRow hover selected={selected}>
      <TableCell>{index || row?.id}</TableCell>
      <TableCell>
        <Stack spacing={2} direction="row" alignItems="center">
          <Avatar alt={row?.name} src={CONFIG.site.serverFileHost + row?.image} />
          <Box component="span">{row?.name}</Box>
        </Stack>
      </TableCell>

      <TableCell>{fCurrency(row?.price)}</TableCell>

      <TableCell align="center"> {row?.stock?.quantity || '0'} </TableCell>
      <TableCell>
        <Label
          variant="soft"
          color={
            (row.isActive === true && 'success') || (row.isActive === false && 'error') || 'default'
          }
        >
          {row?.isActive ? 'ACTIVE' : 'INACTIVE'}
        </Label>
      </TableCell>

      <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
        {hasOrders && (
          <IconButton
            color={collapse.value ? 'inherit' : 'default'}
            onClick={collapse.onToggle}
            sx={{ ...(collapse.value && { bgcolor: 'action.hover' }) }}
          >
            <Iconify icon="eva:arrow-ios-downward-fill" />
          </IconButton>
        )}

        <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
      </TableCell>
    </TableRow>
  );

  const renderSecondary = (
    <TableRow>
      <TableCell sx={{ p: 0, border: 'none' }} colSpan={8}>
        <Collapse
          in={collapse.value}
          timeout="auto"
          unmountOnExit
          sx={{ bgcolor: 'background.neutral' }}
        >
          {}
          <Paper sx={{ m: 1.5 }}>
            {row?.productToOrder
              .filter((item) => item?.order?.status === 'Delivered')
              .map((item) => (
                <Stack
                  key={item.id}
                  direction="row"
                  alignItems="center"
                  sx={{
                    p: (theme) => theme.spacing(1.5, 2, 1.5, 1.5),
                    '&:not(:last-of-type)': {
                      borderBottom: (theme) => `solid 2px ${theme.vars.palette.background.neutral}`,
                    },
                  }}
                >
                  <ListItemText
                    primary={`ORD-${item?.order?.id}`}
                    secondary={item.sku}
                    primaryTypographyProps={{ typography: 'body2' }}
                    secondaryTypographyProps={{
                      component: 'span',
                      color: 'text.disabled',
                      mt: 0.5,
                    }}
                  />

                  <Box sx={{ color: 'error.main', fontWeight: 'bold' }}>
                    x{item.quantity}{' '}
                    <span
                      style={{
                        color: '#000',
                        fontWeight: '400',
                      }}
                    >{`(${fCurrency(item.quantity * row?.price)})`}</span>
                  </Box>

                  <Box sx={{ width: 140, textAlign: 'right' }}>{item.order?.status}</Box>
                  <Box sx={{ width: 140, textAlign: 'right' }}>
                    {fCurrency(
                      calculateAfterTax(
                        item.order?.totalOrderAmount - item.order?.discount,
                        taxPercentage
                      )
                    ) || '-'}
                  </Box>
                </Stack>
              ))}
          </Paper>
        </Collapse>
      </TableCell>
    </TableRow>
  );

  return (
    <>
      {renderPrimary}

      {renderSecondary}

      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
          <PermissionAccessController permission={PermissionsType.EDIT_PRODUCT}>
            <MenuItem
              onClick={() => {
                onEditRow(row.id);
                popover.onClose();
              }}
            >
              <Iconify icon="solar:pen-bold" />
              Edit
            </MenuItem>
          </PermissionAccessController>
          <PermissionAccessController permission={PermissionsType.DELETE_PRODUCT}>
            <MenuItem
              onClick={() => {
                confirm.onTrue();
                popover.onClose();
              }}
              sx={{ color: 'error.main' }}
            >
              <Iconify icon="solar:trash-bin-trash-bold" />
              Delete
            </MenuItem>
          </PermissionAccessController>
        </MenuList>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Delete
          </Button>
        }
      />
    </>
  );
};
export default ProductTableRow;
