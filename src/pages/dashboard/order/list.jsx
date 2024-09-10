import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';

import axios, { endpoints } from 'src/utils/axios';

import { CONFIG } from 'src/config-global';

import { LoadingScreen } from 'src/components/loading-screen';

import { OrderListView } from 'src/sections/order/view';
// ----------------------------------------------------------------------

const metadata = { title: `Order list | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  const response = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const { data } = await axios.get(endpoints.order.list);
      return data;
    },
  });

  const responseAnalytics = useQuery({
    queryKey: ['orders', 'analytics'],
    queryFn: async () => {
      const { data } = await axios.get(endpoints.order.analytics);
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

      <OrderListView orders={response.data} analytics={responseAnalytics} />
    </>
  );
}
