import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';

import { useParams } from 'src/routes/hooks';

import axios, { endpoints } from 'src/utils/axios';

import { CONFIG } from 'src/config-global';

import { LoadingScreen } from 'src/components/loading-screen';

import { PlanEditView } from 'src/sections/plan/view/plan-edit-view';

const metadata = { title: `Create a new Plan | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  const { id = '' } = useParams();
  const response = useQuery({
    queryKey: ['plan', id],
    queryFn: async () => {
      const res = await axios.get(endpoints.plan.details + id);
      return res.data;
    },
  });

  const responseProduct = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data } = await axios.get(endpoints.products.list);
      return data;
    },
  });

  if (responseProduct.isLoading || response.isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <PlanEditView products={responseProduct.data} plan={response.data} />
    </>
  );
}
