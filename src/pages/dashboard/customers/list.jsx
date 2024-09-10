import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';

import axios, { endpoints } from 'src/utils/axios';

import { CONFIG } from 'src/config-global';

import { LoadingScreen } from 'src/components/loading-screen';

import CustomersListView from 'src/sections/customers/view/customers-list-view';

// ----------------------------------------------------------------------

const metadata = { title: `Customers list | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  const response = useQuery({
    queryKey: ['customers'],
    queryFn: async () => {
      const res = await axios.get(endpoints.customers.list);
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

      <CustomersListView customers={response.data} />
    </>
  );
}
