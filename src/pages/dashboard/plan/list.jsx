import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';

import axios, { endpoints } from 'src/utils/axios';

import { CONFIG } from 'src/config-global';

import { LoadingScreen } from 'src/components/loading-screen';

import { PlanListView } from 'src/sections/plan/view';
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
