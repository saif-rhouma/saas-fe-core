import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { CONFIG } from 'src/config-global';

import { OrderDetailsView } from 'src/sections/order/view';
import { useQuery } from '@tanstack/react-query';
import axios, { endpoints } from 'src/utils/axios';
import { LoadingScreen } from 'src/components/loading-screen';
// ----------------------------------------------------------------------

const metadata = { title: `Order details | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  const { id = '' } = useParams();

  const response = useQuery({
    queryKey: ['order', id],
    queryFn: async () => {
      const res = await axios.get(endpoints.order.details + id);
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

      <OrderDetailsView order={response.data} />
    </>
  );
}
