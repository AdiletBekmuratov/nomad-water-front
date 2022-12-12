import { dataUsers } from '@/assets/dataUsers';
import LayoutAdmin from '@/components/Admin/LayoutAdmin';
import Table from '@/components/Table';
import { ColumnDef } from '@tanstack/react-table';
import React from 'react';

const UsersAdmin = () => {
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
      <Table id="user" data={dataUsers} columns={columns} />
    </LayoutAdmin>
  );
};
export default UsersAdmin;
