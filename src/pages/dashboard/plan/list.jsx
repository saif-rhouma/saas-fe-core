import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { PlanListView } from 'src/sections/plan/view';

// ----------------------------------------------------------------------

const metadata = { title: `Plan list | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <PlanListView />
    </>
  );
}
