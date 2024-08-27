import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { _orders } from 'src/_mock/_order';
import { CONFIG } from 'src/config-global';
import { TicketDetailsView } from 'src/sections/tickets/view/tickets-details-view';

// ----------------------------------------------------------------------

const metadata = { title: `Ticket details | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  const { id = '' } = useParams();

  const currentOrder = _orders.find((order) => order.id === id);

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <TicketDetailsView ticket={currentOrder} />
    </>
  );
}
