import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';

import LayoutAdmin from '@/components/Admin/LayoutAdmin';
//import { getMe } from '@/redux/slices/auth';

const AdminUserME = () => {
  const { user, isLoading } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  return <LayoutAdmin>{user?.role}</LayoutAdmin>;
};

export default AdminUserME;
