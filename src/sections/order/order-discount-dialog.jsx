import { useRef, useState } from 'react';

import {
  Button,
  Dialog,
  Divider,
  TextField,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@mui/material';

const OrderDiscountDialog = ({ discount, open, onClose, handler }) => {
  const [amount, setAmount] = useState(discount);
  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      <DialogTitle>Discount</DialogTitle>
      <Divider />
      <DialogContent sx={{ pt: 1, mt: 1 }}>
        <TextField
          fullWidth
          label="Discount Amount"
          type="number"
          value={amount}
          onChange={(event) => {
            setAmount(event.target.value);
          }}
        />
      </DialogContent>
      <Divider sx={{ pt: 1, mt: 1 }} />
      <DialogActions>
        <Button type="submit" variant="contained" onClick={() => handler(amount)}>
          Confirm
        </Button>
        <Button color="inherit" variant="outlined" onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default OrderDiscountDialog;
