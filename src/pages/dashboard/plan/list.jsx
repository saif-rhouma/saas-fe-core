import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { PlanListView } from 'src/sections/plan/view';
import { useQuery } from '@tanstack/react-query';
import axios, { endpoints } from 'src/utils/axios';
import { LoadingScreen } from 'src/components/loading-screen';
// ----------------------------------------------------------------------

const metadata = { title: `Plan list | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  const response = useQuery({
    queryKey: ['plans'],
    queryFn: async () => {
      const res = await axios.get(endpoints.plan.list);
      return res.data;
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

      <PlanListView plans={response.data} />
    </>
  );
}
