import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { ProductStockView } from 'src/sections/product/view/product-stock-view';

// ----------------------------------------------------------------------

const metadata = { title: `Product Stock | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <ProductStockView />
    </>
  );
}
