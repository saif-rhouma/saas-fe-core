import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useState, useEffect, useCallback } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import { LoadingButton } from '@mui/lab';
import Divider from '@mui/material/Divider';
import Accordion from '@mui/material/Accordion';
import Typography from '@mui/material/Typography';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import axios, { endpoints } from 'src/utils/axios';

import { CONFIG } from 'src/config-global';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';
import ProductItemButton from 'src/components/product/product-Item-button';

import ProductUploadImageDialog from './product-upload-image-dialog';
// ----------------------------------------------------------------------

export const NewProductSchema = zod.object({
  name: zod.string().min(1, { message: 'Name is required!' }),
  price: zod.number().min(1, { message: 'Price should not be $0.00' }),
  isActive: zod.boolean(),
});

// ----------------------------------------------------------------------

export function ProductNewEditForm({ currentProduct, productsImages }) {
  const router = useRouter();

  const dialog = useBoolean();

  const defaultValues = useMemo(
    () => ({
      name: currentProduct?.name || '',
      price: currentProduct?.price || 0,
      images: currentProduct?.images || [],
      isActive: currentProduct?.isActive || true,
    }),
    [currentProduct]
  );

  const [selectedImage, setSelectedImage] = useState();
  const [file, setFile] = useState();
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
      setSelectedImage(currentProduct?.image);
    }
  }, [currentProduct, defaultValues, reset]);

  const onSubmit = handleSubmit(async (payload) => {
    try {
      if (selectedImage) {
        payload.image = selectedImage;
      }
      if (currentProduct?.id) {
        const { id } = currentProduct;
        await handleEditProduct({ id, payload });
      } else {
        await handleCreateProduct(payload);
      }
    } catch (error) {
      console.error(error);
    }
  });

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('file', file);
    handleUploadProductImage(formData);
  };

  const handleSelectedImage = useCallback(
    (selected) => {
      if (selectedImage === selected) {
        setSelectedImage();
      } else {
        setSelectedImage(selected);
      }
    },
    [selectedImage]
  );
  const storageHost = 'http://localhost:3000/api/files/show/';
  const handleDropSingleFile = useCallback((acceptedFiles) => {
    const newFile = acceptedFiles[0];
    setFile(newFile);
  }, []);

  const handleDelete = () => {
    setFile(null);
  };

  const queryClient = useQueryClient();
  const uploadConfig = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };

  const { mutate: handleUploadProductImage } = useMutation({
    // eslint-disable-next-line no-shadow
    mutationFn: (file) => axios.post(endpoints.files.upload, file, uploadConfig),
    onSuccess: async () => {
      toast.success('New Image Has Been Uploaded!');
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['products-images'] });
      dialog.onFalse();
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const { mutate: handleCreateProduct } = useMutation({
    mutationFn: (payload) => axios.post(endpoints.products.create, payload),
    onSuccess: async () => {
      toast.success('New Product Has Been Created!');
      reset();
      router.push(paths.dashboard.product.root);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['products'] });
      dialog.onFalse();
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const { mutate: handleEditProduct } = useMutation({
    mutationFn: ({ id, payload }) => axios.patch(endpoints.products.edit + id, payload),
    onSuccess: async () => {
      toast.success('Product Has Been Modified!');
      reset();
      router.push(paths.dashboard.product.root);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['products'] });
      dialog.onFalse();
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return (
    <>
      <Card>
        <Form methods={methods} onSubmit={onSubmit}>
          <Stack spacing={4} sx={{ p: 3 }}>
            <Box
              columnGap={2}
              rowGap={3}
              display="grid"
              gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
            >
              <Field.Text fullWidth label="Product Name" name="name" />
              <Field.Text fullWidth type="number" label="Product Price" name="price" />
            </Box>
            {currentProduct && currentProduct.image === selectedImage && (
              <Box
                spacing={2}
                gap={3}
                display="grid"
                gridTemplateColumns={{ xs: 'repeat(2, 1fr)', md: 'repeat(12, 1fr)' }}
              >
                <ProductItemButton
                  image={storageHost + currentProduct.image}
                  handleClick={handleSelectedImage}
                  selected={currentProduct.image === selectedImage}
                />
              </Box>
            )}

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
                    {productsImages.map((img) => (
                      <ProductItemButton
                        image={storageHost + img.name}
                        handleClick={handleSelectedImage}
                        payload={img.name}
                        selected={img.name === selectedImage}
                      />
                    ))}
                    <ProductItemButton
                      image={`${CONFIG.site.basePath}/assets/upload-img.png`}
                      handleClick={() => dialog.onToggle()}
                    />
                  </Box>
                </AccordionDetails>
              </Accordion>
            </Box>
            <Field.Switch name="isActive" label="Is Active?" />
            <Box
              display="flex"
              flexDirection="column"
              alignItems="flex-end"
              justifyContent="center"
            >
              <Box display="flex" gap={2} height={50}>
                <LoadingButton type="submit" variant="contained">
                  Save
                </LoadingButton>
                <Button variant="outlined">Cancel</Button>
              </Box>
            </Box>
          </Stack>
        </Form>
      </Card>
      <ProductUploadImageDialog
        open={dialog.value}
        onClose={dialog.onFalse}
        file={file}
        handleUpload={handleUpload}
        handleDrop={handleDropSingleFile}
        handleDelete={handleDelete}
      />
    </>
  );
}
