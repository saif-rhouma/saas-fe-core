import { Box, Button, Card, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import { Form, Field, schemaHelper } from 'src/components/hook-form';
import { useForm } from 'react-hook-form';
import { z as zod } from 'zod';
import { toast } from 'src/components/snackbar';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { Iconify } from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
import { zodResolver } from '@hookform/resolvers/zod';
import IconButton from '@mui/material/IconButton';
import { UploadAvatar } from 'src/components/upload';
import { fData } from 'src/utils/format-number';
import axios, { endpoints } from 'src/utils/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// Schema definition for form validation
export const UserAccountSchema = zod.object({
  firstName: zod.string().min(1, { message: 'Staff First Name is required!' }),
  lastName: zod.string().min(1, { message: 'Staff Last Name is required!' }),
  password: zod
    .string()
    .min(1, { message: 'Password is required!' })
    .min(8, { message: 'Password must be at least 6 characters!' }),
  email: zod
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Email must be a valid email address!' }),
  phoneNumber: schemaHelper.phoneNumber({ isValidPhoneNumber }),
});

const AccountSettingEditForm = ({ userAccount }) => {
  const store = useRef(userAccount);
  const password = useBoolean();

  const [avatarUrl, setAvatarUrl] = useState(null);

  const defaultValues = useMemo(
    () => ({
      firstName: userAccount?.firstName || '',
      lastName: userAccount?.lastName || '',
      email: userAccount?.email || '',
      password: '',
      phoneNumber: userAccount?.phoneNumber || '',
    }),
    [userAccount]
  );

  const methods = useForm({
    resolver: zodResolver(UserAccountSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (avatarUrl) {
        store.current = { ...data };
        const formData = new FormData();
        formData.append('file', avatarUrl);
        formData.append('category', 'Avatar');
        await handleUploadAvatarFile(formData);
      } else {
        await handleEditAccount(data);
      }
    } catch (error) {
      console.error(error);
    }
  });

  useEffect(() => {
    if (userAccount) {
      reset(defaultValues);
    }
  }, [userAccount]);

  const handleDropAvatar = useCallback((acceptedFiles) => {
    const newFile = acceptedFiles[0];
    setAvatarUrl(newFile);
  }, []);

  const uploadConfig = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };

  const queryClient = useQueryClient();

  const { mutate: handleUploadAvatarFile } = useMutation({
    mutationFn: (file) => axios.post(endpoints.files.upload, file, uploadConfig),
    onSuccess: async ({ data }) => {
      const { name: filename } = data;
      if (filename) {
        const { current: payload } = store;
        payload.avatar = filename;
        await handleEditAccount(payload);
      }
      return data;
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['avatar-images'] });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const { mutate: handleEditAccount } = useMutation({
    mutationFn: (payload) => axios.patch(endpoints.account.edit, payload),
    onSuccess: async () => {
      toast.success('Account Has Been Modified!');
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['account-user'] });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return (
    <Card sx={{ mb: 4 }}>
      <Form methods={methods} onSubmit={onSubmit}>
        <Stack spacing={4} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Settings
          </Typography>
          <Box
            columnGap={2}
            rowGap={3}
            display="grid"
            gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
          >
            <Field.Text name="firstName" label="First Name" />
            <Field.Text name="lastName" label="Last Name" />
            <Field.Text name="email" label="Email address" />
            <Field.Phone name="phoneNumber" label="Phone number" />

            <Field.Text
              name="password"
              label="Password"
              placeholder="8+ characters"
              type={password.value ? 'text' : 'password'}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={password.onToggle} edge="end">
                      <Iconify icon={password.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Avatar</Typography>
              <UploadAvatar
                value={avatarUrl}
                onDrop={handleDropAvatar}
                validator={(fileData) => {
                  if (fileData.size > 1000000) {
                    return {
                      code: 'file-too-large',
                      message: `File is larger than ${fData(1000000)}`,
                    };
                  }
                  return null;
                }}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 3,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.disabled',
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />
            </Stack>
          </Box>
          <Box display="flex" justifyContent="flex-end" gap={2} mt={2}>
            <Button type="submit" variant="contained">
              Save Changes
            </Button>
          </Box>
        </Stack>
      </Form>
    </Card>
  );
};
export default AccountSettingEditForm;
