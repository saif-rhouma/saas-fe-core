import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import PaymentsListView from 'src/sections/payments/view/payments-list-view';

// ----------------------------------------------------------------------

const metadata = { title: `Payments | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <PaymentsListView />
    </>
  );
}
