import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import CustomersListView from 'src/sections/customers/view/customers-list-view';

// ----------------------------------------------------------------------

const metadata = { title: `Customers list | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <CustomersListView />
    </>
  );
}
