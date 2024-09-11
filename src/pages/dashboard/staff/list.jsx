import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import axios, { endpoints } from 'src/utils/axios';
import { CONFIG } from 'src/config-global';
import { LoadingScreen } from 'src/components/loading-screen';
import StaffListView from 'src/sections/staff/view/staff-list-view';

// ----------------------------------------------------------------------

const metadata = { title: `Staff list | Dashboard - ${CONFIG.site.name}` };

export default function Page() {

  const response = useQuery({
    queryKey: ['staffs'],
    queryFn: async () => {
      const { data } = await axios.get(endpoints.staff.list);
      return data;
    },
  });
  

  if (response.isPending || response.isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <StaffListView staffs={response.data} />
    </>
  );
}
