import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { PlanCreateView } from 'src/sections/plan/view/plan-create-view';

const metadata = { title: `Create a new Plan | Dashboard - ${CONFIG.site.name}` };
import { useQuery } from '@tanstack/react-query';
import axios, { endpoints } from 'src/utils/axios';
import { LoadingScreen } from 'src/components/loading-screen';

export default function Page() {
  const responseProducst = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const { data } = await axios.get(endpoints.products.list);
      return data;
    },
  });

  const responseCustomers = useQuery({
    queryKey: ['customers'],
    queryFn: async () => {
      const { data } = await axios.get(endpoints.customers.list);
      return data;
    },
  });

  if (responseProducst.isLoading || responseCustomers.isLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <PlanCreateView products={responseProducst.data} customers={responseCustomers.data} />
    </>
  );
}
