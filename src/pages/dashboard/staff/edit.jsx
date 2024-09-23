import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { CONFIG } from 'src/config-global';

import { paths } from 'src/routes/paths';
import { StaffCreateView } from 'src/sections/staff/view/staff-create-view';

import { LoadingScreen } from 'src/components/loading-screen';
import { ErrorBlock } from 'src/sections/error/error-block';
import axios, { endpoints } from 'src/utils/axios';
import { useQuery } from '@tanstack/react-query';
// ----------------------------------------------------------------------

const metadata = { title: `Staff edit | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  const { id = '' } = useParams();

  console.log(id);

  const response = useQuery({
    queryKey: ['staff', id],
    queryFn: async () => {
      const res = await axios.get(endpoints.staff.details + id);
      return res.data;
    },
  });

  const responsePermissions = useQuery({
    queryKey: ['permissions'],
    queryFn: async () => {
      const { data } = await axios.get(endpoints.permissions.list);
      return data;
    },
  });

  if (responsePermissions.isLoading || response.isLoading) {
    return <LoadingScreen />;
  }
  if (response.isError || responsePermissions.isError) {
    return <ErrorBlock route={paths.dashboard.staff.root} />;
  }

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <StaffCreateView currentStaff={response.data} appPermissions={responsePermissions.data} />
    </>
  );
}
