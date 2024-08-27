import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import RemindersListView from 'src/sections/reminders/view/reminders-list-view';

// ----------------------------------------------------------------------

const metadata = { title: `Reminders list | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <RemindersListView />
    </>
  );
}
