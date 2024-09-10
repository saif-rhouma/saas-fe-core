import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';

import axios, { endpoints } from 'src/utils/axios';

import { CONFIG } from 'src/config-global';

import { LoadingScreen } from 'src/components/loading-screen';

import RemindersListView from 'src/sections/reminders/view/reminders-list-view';

// ----------------------------------------------------------------------

const metadata = { title: `Reminders list | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  const response = useQuery({
    queryKey: ['reminders'],
    queryFn: async () => {
      const { data } = await axios.get(endpoints.reminders.list);
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

      <RemindersListView reminders={response.data} />
    </>
  );
}
