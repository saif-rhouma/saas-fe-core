import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { DashboardContent } from 'src/layouts/dashboard';
import { paths } from 'src/routes/paths';
import AccountSettingEditForm from '../account-setting-edit-form';

const AccountSettingView = ({ userAccount }) => {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Tools', href: paths.dashboard.tools.root },
          { name: 'Account Setting' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <AccountSettingEditForm userAccount={userAccount} />
    </DashboardContent>
  );
};
export default AccountSettingView;
