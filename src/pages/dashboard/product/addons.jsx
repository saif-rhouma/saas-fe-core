import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { useQuery } from '@tanstack/react-query';
import { LoadingScreen } from 'src/components/loading-screen';

import axios, { endpoints } from 'src/utils/axios';
import { ProductAddonsView } from 'src/sections/product/view/product-addons-view';
// ----------------------------------------------------------------------

const metadata = { title: `Product Addons | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  const response = useQuery({
    queryKey: ['product-addons'],
    queryFn: async () => {
      const { data } = await axios.get(endpoints.productAddons.list);
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
      <ProductAddonsView productAddons={response.data} />
    </>
  );
}
