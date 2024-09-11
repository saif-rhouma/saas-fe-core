import { Helmet } from 'react-helmet-async';

import { useQuery } from '@tanstack/react-query';
import { LoadingScreen } from 'src/components/loading-screen';
import { CONFIG } from 'src/config-global';
import AccountSettingView from 'src/sections/tools/view/account-setting-view';
import axios, { endpoints } from 'src/utils/axios';
// ----------------------------------------------------------------------

const metadata = { title: `Tools | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  const response = useQuery({
    queryKey: ['account-user'],
    queryFn: async () => {
      const { data } = await axios.get(endpoints.auth.me);
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

      <AccountSettingView userAccount={response.data} />
    </>
  );
}
