import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { DashboardContent } from 'src/layouts/dashboard';
import { paths } from 'src/routes/paths';

function FinancialYearView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Tools', href: paths.dashboard.tools.root },
          { name: 'Financial Year' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      {/* <AccountSettingEditForm userAccount={userAccount} /> */}
    </DashboardContent>
  );
}
export default FinancialYearView;
