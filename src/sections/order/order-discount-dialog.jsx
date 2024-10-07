import { useState, useCallback } from 'react';

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
  const handleBlur = useCallback(() => {
    if (amount < 0) {
      setAmount(0);
    } else if (amount > 100) {
      setAmount(100);
    }
  }, [amount]);
  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      <DialogTitle>Discount Percentage</DialogTitle>
      <Divider />
      <DialogContent sx={{ pt: 1, mt: 1 }}>
        <TextField
          fullWidth
          label="Percentage"
          value={amount}
          onChange={(event) => {
            setAmount(Number(event.target.value));
          }}
          onBlur={handleBlur}
          inputProps={{
            step: 10,
            min: 0,
            max: 100,
            type: 'number',
            id: 'input-amount',
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
