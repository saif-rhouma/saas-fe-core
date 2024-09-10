import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import PaymentsListView from 'src/sections/payments/view/payments-list-view';
import { useQuery } from '@tanstack/react-query';
import axios, { endpoints } from 'src/utils/axios';
import { LoadingScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

const metadata = { title: `Payments | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  const response = useQuery({
    queryKey: ['payments'],
    queryFn: async () => {
      const { data } = await axios.get(endpoints.payments.list);
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
      <PaymentsListView payments={response.data} />
    </>
  );
}
