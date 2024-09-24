import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';

import { paths } from 'src/routes/paths';
import { useParams } from 'src/routes/hooks';

import axios, { endpoints } from 'src/utils/axios';

import { CONFIG } from 'src/config-global';

import { LoadingScreen } from 'src/components/loading-screen';

import { ErrorBlock } from 'src/sections/error/error-block';
import { StaffCreateView } from 'src/sections/staff/view/staff-create-view';
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
