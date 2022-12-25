import { useAppSelector } from '@/hooks/useAppSelector';

import LayoutAdmin from '@/components/Admin/LayoutAdmin';

import Loader from '@/components/Loader';

const AdminUserME = () => {
  const { user, isLoading } = useAppSelector((state) => state.auth);

  if (isLoading) {
    return <Loader />;
  }

  return <LayoutAdmin>I am {user?.role}</LayoutAdmin>;
};

export default AdminUserME;
