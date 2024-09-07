import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { OrderCreateView } from 'src/sections/order/view/order-create-view';

const metadata = { title: `Create a new Order | Dashboard - ${CONFIG.site.name}` };
import { useQuery } from '@tanstack/react-query';
import axios, { endpoints } from 'src/utils/axios';
import { LoadingScreen } from 'src/components/loading-screen';

export default function Page() {
  const responseProducst = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await axios.get(endpoints.products.list);
      return res.data;
    },
  });

  const responseCustomers = useQuery({
    queryKey: ['customers'],
    queryFn: async () => {
      const res = await axios.get(endpoints.customers.list);
      return res.data;
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

      <OrderCreateView products={responseProducst.data} customers={responseCustomers.data} />
    </>
  );
}
