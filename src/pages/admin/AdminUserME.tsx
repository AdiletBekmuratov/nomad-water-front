import LayoutAdmin from '@/components/Admin/LayoutAdmin';
import { Button } from '@/components/Forms';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import React from 'react';
import { logout } from '@/redux/slices/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const navigate = useNavigate();
const dispatch = useAppDispatch();
const handleLogout = async () => {
  toast
    .promise(dispatch(logout()).unwrap(), {
      success: 'Вышли из аккаунта',
      loading: 'Загрузка...',
      error: (err) => err.toString()
    })
    .then(() => {
      navigate('/admin/login');
    });
};
const AdminUserME = () => {
  return (
    <LayoutAdmin>
      <h2>myPage</h2>
      <Button onClick={handleLogout}>Выйти</Button>
    </LayoutAdmin>
  );
};

export default AdminUserME;
