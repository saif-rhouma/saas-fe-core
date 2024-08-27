import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { ProductAddonsView } from 'src/sections/product/view/product-addons-view';

// ----------------------------------------------------------------------

const metadata = { title: `Product Addons | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <ProductAddonsView />
    </>
  );
}
