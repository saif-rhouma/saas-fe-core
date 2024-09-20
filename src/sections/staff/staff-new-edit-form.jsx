import { z as zod } from 'zod';
import { useMemo } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { toast } from 'src/components/snackbar';
import { Form } from 'src/components/hook-form';
import { paths } from 'src/routes/paths';
import axios, { endpoints } from 'src/utils/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// List of permissions for the checkbox
const permissions = [
  'Order List',
  'View Order',
  'Download Order Attachment',
  'Add Plan',
  'Delete Plan',
  'Add Customer',
  'Add Service',
  'Edit Service',
  'Order Report',
  'Order Due Report',
  'Financial List',
  'Master Settings',
  'Add Staff',
  'Edit Staff',
  'Add Payment',
  'Delete Payment',
  'Edit Reminder',
  'Create Ticket',
  'Reply Ticket',
  // Add more permissions based on your needs
];

// Schema definition for form validation
export const NewStaffSchema = zod.object({
  firstName: zod.string().min(1, { message: 'Staff firstName is required!' }),
  lastName: zod.string().min(1, { message: 'Staff lastName is required!' }),
  password: zod.string().min(1, { message: 'Password is required!' }),
  email: zod.string().min(1, { message: 'Email is required!' }),
  phoneNumber: zod.string().min(1, { message: 'Phone Number is required!' }),
  isActive: zod.boolean(),
  permissions: zod.array(zod.string()).min(1, { message: 'At least one permission is required!' }),
});

export function StaffNewEditForm({ currentStaff }) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const defaultValues = useMemo(
    () => ({
      firstName: currentStaff?.firstName || '',
      lastName: currentStaff?.lastName || '',
      phoneNumber: currentStaff?.phoneNumber || '',
      email: currentStaff?.email || '',
      password: currentStaff?.password || '',
      isActive: currentStaff?.isActive || true,
      permissions: currentStaff?.permissions || [],
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

  const { mutate: handleCreateStaff } = useMutation({
    mutationFn: (payload) => axios.post(endpoints.staff.create, payload),
    onSuccess: () => {
      toast.success(
        currentStaff ? 'Staff updated successfully!' : 'New Staff created successfully!'
      );
      queryClient.invalidateQueries(['staff']);
      reset();
      router.push(paths.dashboard.staff.root);
    },
    onError: (err) => {
      console.error(err);
      toast.error('Failed to save staff. Please try again.');
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.info('DATA Staff', data);
    handleCreateStaff(data);
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
            <TextField label="First Name" {...methods.register('firstName')} />
            <TextField label="Last Name" {...methods.register('lastName')} />
            <TextField label="Phone Number" {...methods.register('phoneNumber')} />
            <TextField label="Email" {...methods.register('email')} />
            <TextField label="Password" type="password" {...methods.register('password')} />
          </Box>
        </Stack>
      </Card>

      <Card>
        <Stack spacing={4} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Permissions
          </Typography>
          <Grid container spacing={2}>
            {permissions.map((permission) => (
              <Grid item xs={12} md={4} key={permission}>
                <Controller
                  name="permissions"
                  control={control}
                  render={({ field }) => (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={field.value.includes(permission)}
                          onChange={(e) => {
                            const newValue = e.target.checked
                              ? [...field.value, permission]
                              : field.value.filter((p) => p !== permission);
                            field.onChange(newValue);
                          }}
                        />
                      }
                      label={permission}
                    />
                  )}
                />
              </Grid>
            ))}
          </Grid>
          <FormControlLabel
            control={<Switch {...methods.register('isActive')} />}
            label="Is Active?"
          />
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button type="submit" variant="contained" disabled={isSubmitting}>
              Submit
            </Button>
            <Button variant="outlined" onClick={() => reset()} sx={{ ml: 2 }}>
              Cancel
            </Button>
          </Box>
        </Stack>
      </Card>
    </Form>
  );
}
