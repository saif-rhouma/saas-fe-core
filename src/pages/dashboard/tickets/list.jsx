import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import TicketsListView from 'src/sections/tickets/view/tickets-list-view';

// ----------------------------------------------------------------------

const metadata = { title: `Tickets list | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <TicketsListView />
    </>
  );
}
