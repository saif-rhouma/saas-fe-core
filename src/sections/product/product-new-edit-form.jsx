import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { Iconify } from 'src/components/iconify';

import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';

import { PRODUCT_CATEGORY_GROUP_OPTIONS } from 'src/_mock';

import { Button, TextField } from '@mui/material';
import { Form, schemaHelper } from 'src/components/hook-form';
import ProductItemButton from 'src/components/product/product-Item-button';
import { toast } from 'src/components/snackbar';

// ----------------------------------------------------------------------

export const NewProductSchema = zod.object({
  name: zod.string().min(1, { message: 'Name is required!' }),
  description: schemaHelper.editor({ message: { required_error: 'Description is required!' } }),
  images: schemaHelper.files({ message: { required_error: 'Images is required!' } }),
  code: zod.string().min(1, { message: 'Product code is required!' }),
  sku: zod.string().min(1, { message: 'Product sku is required!' }),
  quantity: zod.number().min(1, { message: 'Quantity is required!' }),
  colors: zod.string().array().nonempty({ message: 'Choose at least one option!' }),
  sizes: zod.string().array().nonempty({ message: 'Choose at least one option!' }),
  tags: zod.string().array().min(2, { message: 'Must have at least 2 items!' }),
  gender: zod.string().array().nonempty({ message: 'Choose at least one option!' }),
  price: zod.number().min(1, { message: 'Price should not be $0.00' }),
  // Not required
  category: zod.string(),
  priceSale: zod.number(),
  subDescription: zod.string(),
  taxes: zod.number(),
  saleLabel: zod.object({ enabled: zod.boolean(), content: zod.string() }),
  newLabel: zod.object({ enabled: zod.boolean(), content: zod.string() }),
});

// ----------------------------------------------------------------------

export function ProductNewEditForm({ currentProduct }) {
  const router = useRouter();

  const [includeTaxes, setIncludeTaxes] = useState(false);

  const defaultValues = useMemo(
    () => ({
      name: currentProduct?.name || '',
      description: currentProduct?.description || '',
      subDescription: currentProduct?.subDescription || '',
      images: currentProduct?.images || [],
      //
      code: currentProduct?.code || '',
      sku: currentProduct?.sku || '',
      price: currentProduct?.price || 0,
      quantity: currentProduct?.quantity || 0,
      priceSale: currentProduct?.priceSale || 0,
      tags: currentProduct?.tags || [],
      taxes: currentProduct?.taxes || 0,
      gender: currentProduct?.gender || [],
      category: currentProduct?.category || PRODUCT_CATEGORY_GROUP_OPTIONS[0].classify[1],
      colors: currentProduct?.colors || [],
      sizes: currentProduct?.sizes || [],
      newLabel: currentProduct?.newLabel || { enabled: false, content: '' },
      saleLabel: currentProduct?.saleLabel || { enabled: false, content: '' },
    }),
    [currentProduct]
  );

  const methods = useForm({
    resolver: zodResolver(NewProductSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (currentProduct) {
      reset(defaultValues);
    }
  }, [currentProduct, defaultValues, reset]);

  useEffect(() => {
    if (includeTaxes) {
      setValue('taxes', 0);
    } else {
      setValue('taxes', currentProduct?.taxes || 0);
    }
  }, [currentProduct?.taxes, includeTaxes, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      toast.success(currentProduct ? 'Update success!' : 'Create success!');
      router.push(paths.dashboard.product.root);
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  const handleOrderId = useCallback((event) => {}, []);

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Card>
        <Stack spacing={4} sx={{ p: 3 }}>
          <Box
            columnGap={2}
            rowGap={3}
            display="grid"
            gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
          >
            <TextField label="Product Name" onChange={handleOrderId} />
            <TextField label="Product Price" onChange={handleOrderId} />
          </Box>
          <Box
            sx={{
              borderRadius: 1,
              overflow: 'hidden',
              border: (theme) => `solid 1px ${theme.vars.palette.divider}`,
            }}
          >
            <Accordion>
              <AccordionSummary expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}>
                <Typography>Select Icon</Typography>
              </AccordionSummary>
              <Divider />
              <AccordionDetails>
                <Box
                  spacing={2}
                  gap={3}
                  display="grid"
                  gridTemplateColumns={{ xs: 'repeat(2, 1fr)', md: 'repeat(12, 1fr)' }}
                >
                  <ProductItemButton image="--->" />
                  <ProductItemButton image="--->" />
                  <ProductItemButton image="--->" />
                  <ProductItemButton image="--->" />
                  <ProductItemButton image="--->" />
                  <ProductItemButton image="--->" />
                  <ProductItemButton image="--->" />
                  <ProductItemButton image="--->" />
                  <ProductItemButton image="--->" />
                  <ProductItemButton image="--->" />
                  <ProductItemButton image="--->" />
                  <ProductItemButton image="--->" />
                  <ProductItemButton image="--->" />
                  <ProductItemButton image="--->" />
                  <ProductItemButton image="--->" />
                  <ProductItemButton image="--->" />
                  <ProductItemButton image="--->" />
                  <ProductItemButton image="--->" />
                </Box>
              </AccordionDetails>
            </Accordion>
          </Box>
          <FormControlLabel
            control={<Switch name="isActive" defaultChecked />}
            label="Is Active?"
          />
          <Box display="flex" flexDirection="column" alignItems="flex-end" justifyContent="center">
            <Box display="flex" gap={2} height={50}>
              <Button variant="contained">Submit</Button>
              <Button variant="outlined">Cancel</Button>
            </Box>
          </Box>
        </Stack>
      </Card>
    </Form>
  );
}
