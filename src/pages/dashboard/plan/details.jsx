import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { _orders } from 'src/_mock/_order';
import { CONFIG } from 'src/config-global';

import { PlanDetailsView } from 'src/sections/plan/view';

import { useQuery } from '@tanstack/react-query';
import axios, { endpoints } from 'src/utils/axios';
import { LoadingScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

const metadata = { title: `Plan details | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  const { id = '' } = useParams();

  const response = useQuery({
    queryKey: ['plan', id],
    queryFn: async () => {
      const res = await axios.get(endpoints.plan.details + id);
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

      <PlanDetailsView plan={response.data} />
    </>
  );
}
