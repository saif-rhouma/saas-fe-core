import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { _orders } from 'src/_mock/_order';
import { CONFIG } from 'src/config-global';

import { PlanDetailsView } from 'src/sections/plan/view';

// ----------------------------------------------------------------------

const metadata = { title: `Plan details | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  const { id = '' } = useParams();

  const currentOrder = _orders.find((order) => order.id === id);

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <PlanDetailsView order={currentOrder} />
    </>
  );
}
