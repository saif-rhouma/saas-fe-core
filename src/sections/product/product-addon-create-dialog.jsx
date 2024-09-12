import Stack from '@mui/material/Stack';
import { LoadingButton } from '@mui/lab';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import {
  Button,
  Switch,
  Divider,
  TextField,
  DialogTitle,
  DialogActions,
  FormControlLabel,
} from '@mui/material';
import { z as zod } from 'zod';
import { Form, Field } from 'src/components/hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

const ProductAddonCreationSchema = zod.object({
  name: zod.string().min(1, { message: 'Name is required!' }),
  price: zod.number().min(1, { message: 'Tax number is required!' }),
  isActive: zod.boolean(),
});

const ProductAddonCreateDialog = ({ productAddon, open, onClose, handler }) => {
  const defaultValues = {
    name: productAddon?.name || '',
    price: parseInt(productAddon?.price) || '',
    isActive: productAddon?.isActive || true,
  };

  useEffect(() => {
    if (productAddon) {
      reset(defaultValues);
    }
  }, [productAddon]);

  const [errorMsg, setErrorMsg] = useState('');

  const methods = useForm({
    resolver: zodResolver(ProductAddonCreationSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const payload = { ...data };
      if (productAddon) {
        await handler({ id: productAddon.id, payload });
      } else {
        await handler(payload);
      }
      reset();
    } catch (error) {
      console.log(error);
      setErrorMsg(error instanceof Error ? error.message : error);
    }
  });

  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      <DialogTitle>Add Addon</DialogTitle>
      <Divider />
      {!!errorMsg && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {errorMsg}
        </Alert>
      )}
      <Form methods={methods} onSubmit={onSubmit}>
        <DialogContent>
          <Stack
            spacing={2}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(1, 1fr)',
              md: 'repeat(2, 1fr)',
              lg: 'repeat(2, 1fr)',
            }}
          >
            <Field.Text fullWidth label="Enter Addon Name" name="name" sx={{ mt: 2 }} />
            <Field.Text
              fullWidth
              type="number"
              label="Enter Addon Price"
              name="price"
              sx={{ mt: 2 }}
            />

            <Field.Switch name="isActive" label="Is Active?" />
          </Stack>
        </DialogContent>
        <Divider sx={{ pt: 1, mt: 1 }} />
        <DialogActions>
          <LoadingButton type="submit" variant="contained">
            {productAddon ? 'Save Changes' : 'Save'}
          </LoadingButton>
          <Button color="inherit" variant="outlined" onClick={onClose}>
            Cancel
          </Button>
        </DialogActions>
      </Form>
    </Dialog>
  );
};
export default ProductAddonCreateDialog;
