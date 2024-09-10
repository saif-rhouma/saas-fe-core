import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';

import { useParams } from 'src/routes/hooks';

import axios, { endpoints } from 'src/utils/axios';

import { CONFIG } from 'src/config-global';

import { LoadingScreen } from 'src/components/loading-screen';

import { TicketDetailsView } from 'src/sections/tickets/view/tickets-details-view';

// ----------------------------------------------------------------------

const metadata = { title: `Ticket details | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  const { id = '' } = useParams();

  const response = useQuery({
    queryKey: ['tickets', id],
    queryFn: async () => {
      const { data } = await axios.get(endpoints.tickets.details + id);
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

      <TicketDetailsView ticket={response.data} />
    </>
  );
}
