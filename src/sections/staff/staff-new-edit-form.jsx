import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z as zod } from 'zod';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { toast } from 'src/components/snackbar';
import { useRouter } from 'src/routes/hooks';
import { Form } from 'src/components/hook-form';
import { paths } from 'src/routes/paths';

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
  staffName: zod.string().min(1, { message: 'Staff Name is required!' }),
  staffPassword: zod.string().min(1, { message: 'Password is required!' }),
  staffEmail: zod.string().min(1, { message: 'Email is required!' }),
  staffPhone: zod.string().min(1, { message: 'Phone Number is required!' }),
  isActive: zod.boolean(),
  permissions: zod.array(zod.string()).min(1, { message: 'At least one permission is required!' }),
});

export function StaffNewEditForm({ currentStaff }) {
  const router = useRouter();

  const defaultValues = useMemo(
    () => ({
      staffName: currentStaff?.staffName || '',
      staffPhoneNumber: currentStaff?.staffPhoneNumber || '',
      staffEmail: currentStaff?.staffEmail || '',
      staffPassword: currentStaff?.staffPassword || '',
      isActive: currentStaff?.isActive || true,
      permissions: currentStaff?.permissions || [], // default empty permissions
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

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      toast.success(currentStaff ? 'Update success!' : 'Create success!');
      router.push(paths.dashboard.product.root);
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      {/* Card for Staff Details */}
      <Card sx={{ mb: 4 }}>
        <Stack spacing={4} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Staff Details
          </Typography>
          <Box
            columnGap={2}
            rowGap={3}
            display="grid"
            gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
          >
            <TextField label="Staff Name" {...methods.register('staffName')} />
            <TextField label="Phone Number" {...methods.register('staffPhone')} />
            <TextField label="Email" {...methods.register('staffEmail')} />
            {/* <TextField label="Password" {...methods.register('staffPassword')} /> */}
            {/* password field will be hidden */}
            <TextField label="Password" type="password" {...methods.register('staffPassword')} />
          </Box>
        </Stack>
      </Card>

      {/* Card for Permissions */}
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
