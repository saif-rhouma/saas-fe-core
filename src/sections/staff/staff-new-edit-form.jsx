import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { useMemo, useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isValidPhoneNumber } from 'react-phone-number-input/input';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { Box, Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import axios, { endpoints } from 'src/utils/axios';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { Form, Field, schemaHelper } from 'src/components/hook-form';

// Schema definition for form validation
export const NewStaffSchema = zod.object({
  firstName: zod.string().min(1, { message: 'Staff firstName is required!' }),
  // lastName: zod.string().min(1, { message: 'Staff lastName is required!' }),
  password: zod
    .string()
    .min(1, { message: 'Password is required!' })
    .min(8, { message: 'Password must be at least 8 characters!' }),
  email: zod.string().min(1, { message: 'Email is required!' }),
  // phoneNumber: schemaHelper.phoneNumber({ isValidPhoneNumber }),
  permissions: zod.string().array().nonempty({ message: 'At least one permission is required!' }),
  isActive: zod.boolean(),
});

export function StaffNewEditForm({ currentStaff, appPermissions }) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [permissions, setPermissions] = useState(appPermissions);

  const password = useBoolean();

  const defaultValues = useMemo(
    () => ({
      firstName: currentStaff?.firstName || '',
      lastName: currentStaff?.lastName || '',
      phoneNumber: currentStaff?.phoneNumber || '',
      email: currentStaff?.email || '',
      password: currentStaff?.password || '',
      isActive: currentStaff?.isActive,
      permissions: currentStaff?.permissions.map((per) => per.slug) || [],
    }),
    [currentStaff]
  );

  const methods = useForm({
    resolver: zodResolver(NewStaffSchema),
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

  useEffect(() => {
    if (currentStaff) {
      reset(defaultValues);
    }
    if (appPermissions) {
      setPermissions(appPermissions);
    }
  }, [currentStaff, appPermissions, defaultValues, reset]);

  const { mutate: handleCreateStaff } = useMutation({
    mutationFn: (payload) => axios.post(endpoints.staff.create, payload),
    onSuccess: () => {
      toast.success('New Staff has been created successfully!');
      // toast.success(
      //   currentStaff ? 'Staff updated successfully!' : 'New Staff created successfully!'
      // );
      queryClient.invalidateQueries(['staff']);
      reset();
      router.push(paths.dashboard.staff.root);
    },
    onError: (err) => {
      console.error(err);
      toast.error('Failed to save staff. Please try again.');
    },
  });

  const { mutate: handleEditStaff } = useMutation({
    mutationFn: ({ id, payload }) => axios.patch(endpoints.staff.edit + id, payload),
    onSuccess: () => {
      toast.success('Staff updated successfully!');
      const { id } = currentStaff;
      queryClient.invalidateQueries(['staff', id]);
      reset();
      router.push(paths.dashboard.staff.root);
    },
    onError: (err) => {
      console.error(err);
      toast.error('Failed to edit staff. Please try again.');
    },
  });

  const onSubmit = handleSubmit(async (payload) => {
    try {
      if (currentStaff?.id) {
        const { id } = currentStaff;
        await handleEditStaff({ id, payload });
      } else {
        await handleCreateStaff(payload);
      }
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Card sx={{ mb: 4 }}>
        <Stack spacing={4} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Staff Details
          </Typography>
          <Box
            columnGap={2}
            rowGap={3}
            display="grid"
            gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }}
          >
            <Field.Text label="First Name" name="firstName" />
            {/* <Field.Text label="Last Name" name="lastName" /> */}
            <Field.Text label="Email" name="email" />
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
          </Box>
        </Stack>
      </Card>
      <Card sx={{ p: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 4 }}>
          Permissions
        </Typography>
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ mb: 4 }}>
          <Field.MultiCheckbox
            name="permissions"
            options={appPermissions.map((per) => ({ label: per.name, value: per.slug }))}
            sx={{
              display: 'grid',
              columnGap: 4,
              rowGap: 4,
              gridTemplateColumns: 'repeat(4, 1fr)',
            }}
          />
        </Box>
        <Field.Switch name="isActive" label="Is Active?" />
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            Submit
          </Button>
          <Button variant="outlined" onClick={() => reset()} sx={{ ml: 2 }}>
            Cancel
          </Button>
        </Box>
      </Card>
    </Form>
  );
}
