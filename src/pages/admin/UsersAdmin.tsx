import Table from '@/components/Table';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';
import LayoutAdmin from '@/components/Admin/LayoutAdmin';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { getAllUsers } from '@/redux/slices/users';

const UsersAdmin = () => {
  const { users, isLoading, isSuccess, isError } = useAppSelector((state) => state.users);
  console.log(users);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const columns = React.useMemo<ColumnDef<{ id: number; name: string }, any>[]>(
    () => [
      {
        header: 'ID',
        accessorKey: 'id'
      },
      {
        header: 'firstName',
        accessorKey: 'firstName'
      },
      {
        header: 'name',
        accessorKey: 'name'
      },
      {
        header: 'middleName',
        accessorKey: 'middleName'
      },
      {
        header: 'role',
        accessorKey: 'role'
      },
      {
        header: 'car',
        accessorKey: 'car'
      },
      {
        header: 'phone',
        accessorKey: 'phone'
      },
      {
        header: 'storage',
        accessorKey: 'storage'
      }
    ],
    []
  );

  return (
    <LayoutAdmin>
      <div>
        {isLoading && <h1> LOADING</h1>}
        {isError && <h1>Ошибка при загрузке страницы</h1>}
        {isSuccess && <Table id="users" data={users} columns={columns} />}
      </div>
    </LayoutAdmin>
  );
};
export default UsersAdmin;
