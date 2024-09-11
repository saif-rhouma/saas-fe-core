import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { CONFIG } from 'src/config-global';
import { useGetProduct } from 'src/actions/product';

import { StaffCreateView } from 'src/sections/staff/view/staff-create-view';
import { _staffList } from 'src/_mock/_staffList';

// ----------------------------------------------------------------------

const metadata = { title: `Staff edit | Dashboard - ${CONFIG.site.name}` };

export default function Page() {
  const { id = '' } = useParams();

  const currentStaff = _staffList.find((staff) => staff.id === parseInt(id));

  console.log(id);
  console.log(currentStaff);

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <StaffCreateView staff={currentStaff} />
    </>
  );
}
