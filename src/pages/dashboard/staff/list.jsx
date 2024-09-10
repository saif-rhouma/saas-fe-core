import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { OrderListView } from 'src/sections/order/view';
import StaffListView from 'src/sections/staff/view/staff-list-view';

// ----------------------------------------------------------------------

const metadata = { title: `Staff list | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <StaffListView />
    </>
  );
}
