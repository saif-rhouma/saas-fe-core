import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { ProductListView } from 'src/sections/product/view';
import { useQuery } from '@tanstack/react-query';
import axios, { endpoints } from 'src/utils/axios';
import { LoadingScreen } from 'src/components/loading-screen';
// ----------------------------------------------------------------------

const metadata = { title: `Product list | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  const response = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await axios.get(endpoints.products.list);
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
      <ProductListView products={response.data} />
    </>
  );
}
