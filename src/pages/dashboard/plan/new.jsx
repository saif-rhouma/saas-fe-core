import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { PlanCreateView } from 'src/sections/plan/view/plan-create-view';

const metadata = { title: `Create a new Plan | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <PlanCreateView />
    </>
  );
}
