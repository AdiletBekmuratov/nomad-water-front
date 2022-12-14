import LayoutAdmin from '@/components/Admin/LayoutAdmin';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { getUserMe } from '@/redux/slices/users';
//import { useAppSelector } from '@/hooks/useAppSelector';
import React from 'react';

const UserME = () => {
  const id = useAppSelector((state) => state.auth.user?.id);
  // const { _id } = useAppSelector((state) => state.users.user.id);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(getUserMe(id));
  }, [dispatch]);
  console.log(id);
  return (
    <LayoutAdmin>
      <>f</>
    </LayoutAdmin>
  );
};

export default UserME;
