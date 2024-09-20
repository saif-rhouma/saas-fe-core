import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { StaffNewEditForm } from '../staff-new-edit-form';

// ----------------------------------------------------------------------

export function StaffCreateView({ staff, appPermissions }) {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Staff', href: paths.dashboard.staff.root },
          { name: 'New Staff' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <StaffNewEditForm currentStaff={staff} appPermissions={appPermissions} />
    </DashboardContent>
  );
}
