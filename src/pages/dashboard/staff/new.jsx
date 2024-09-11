import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { StaffCreateView } from 'src/sections/staff/view/staff-create-view';

// ----------------------------------------------------------------------

const metadata = { title: `Create a new staff | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <StaffCreateView />
    </>
  );
}
