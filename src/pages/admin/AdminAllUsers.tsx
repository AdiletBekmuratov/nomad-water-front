import { useMemo, useState } from 'react';
import LayoutAdmin from '@/components/Admin/LayoutAdmin';

import { toast } from 'react-hot-toast';
import { ColumnDef, Row } from '@tanstack/react-table';
import { ActionButtons, DeleteModal, Table } from '@/components/Table';
import { IUserFull } from '@/types';
import { useDeleteUserMutation, useGetAllUsersQuery } from '@/redux/services/user.service';
import { CreateModal, EditModalUser } from '@/components/Admin/AllUsers';
import Loader from '@/components/Landing/Loader';

import { EditWorker } from '../../components/Admin/AllUsers/EditWorker';
import { EditCourier } from '@/components/Admin/AllUsers/EditCourier';

const AdminAllUsers = () => {
  const { data: users = [], isLoading } = useGetAllUsersQuery();

  const [deleteUser, { isLoading: isLoadingDelete }] = useDeleteUserMutation();

  const [rowData, setRowData] = useState<IUserFull>();
  const [visibleCreate, setVisibleCreate] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [role, setRole] = useState('');

  const handleDelete = async () => {
    toast
      .promise(deleteUser(rowData!.id!).unwrap(), {
        loading: 'Loading',
        success: 'Deleted Successfully',
        error: (error) => JSON.stringify(error, null, 2)
      })
      .finally(() => {
        setVisibleDelete(false);
      });
  };

  const handleEditRowClick = (row: Row<IUserFull>) => {
    setRowData(row.original);
    setVisibleEdit(true);
    setRole(row.original.role);
  };

  const handleDeleteRowClick = (row: Row<IUserFull>) => {
    setRowData(row.original);
    setVisibleDelete(true);
  };

  const columns = useMemo<ColumnDef<IUserFull, any>[]>(
    () => [
      {
        header: 'ID',
        accessorKey: 'id'
      },

      {
        header: 'Фамилия',
        accessorKey: 'lastname'
      },
      {
        header: 'Имя',
        accessorKey: 'firstname'
      },

      {
        header: 'Отчество',
        accessorKey: 'middleName'
      },
      {
        header: 'Роль',
        accessorKey: 'role'
        // cell: ({ row }) => {
        //   row.original.role === 'ROLE_EMPLOYEE' && 'Оператор';
        //   row.original.role === 'ROLE_COURIER' && 'Курьер';
        //   row.original.role === 'ROLE_USER' && 'Клиент';
        //   row.original.role === 'ROLE_MASTER' && 'Мастер';
        //   row.original.role === 'ROLE_ADMIN' && 'Админ';
        //   row.original.role === 'ROLE_KEEPER' && 'Продавец магазина';
        // }
      },
      {
        header: 'Телефон',
        accessorKey: 'phone'
      },
      {
        header: 'Микрорайон  Улица',
        cell: ({ row }) =>
          row.original.profiles
            ? row.original.profiles[0]
              ? row.original.profiles[0].street
              : 'не указан'
            : 'не указан'
      },

      {
        header: 'Микрорайон  Улица',
        cell: ({ row }) =>
          row.original.profiles
            ? row.original.profiles[0]
              ? row.original.profiles[0].houseNumber
              : 'не указан'
            : 'не указан'
      },
      {
        header: 'Микрорайон  Улица',
        cell: ({ row }) =>
          row.original.profiles
            ? row.original.profiles[0]
              ? row.original.profiles[0].flat
              : 'не указан'
            : 'не указан'
      },

      {
        header: 'telegram',
        accessorKey: 'telegramAccount'
      },
      {
        header: 'birthday',
        accessorKey: 'birthday'
      },
      {
        header: 'Изменить \n Деактивировать',
        cell: ({ row }) => (
          <ActionButtons
            handleEditClick={() => handleEditRowClick(row)}
            handleDeleteClick={() => handleDeleteRowClick(row)}
          />
        )
      }
    ],
    []
  );
  if (isLoading) {
    return <Loader />;
  }
  return (
    <LayoutAdmin>
      <Table
        id="AllUsersTable"
        data={users}
        columns={columns}
        onAddClick={() => setVisibleCreate(true)}
        title="Все пользователи платформы"
      />
      <CreateModal visible={visibleCreate} setVisible={setVisibleCreate} />
      <>
        {role === 'ROLE_USER' || role === 'ROLE_EMPLOYEE' ? (
          <EditModalUser data={rowData!} setVisible={setVisibleEdit} visible={visibleEdit} />
        ) : role === 'ROLE_COURIER' ? (
          <EditCourier data={rowData!} setVisible={setVisibleEdit} visible={visibleEdit} />
        ) : role === 'ROLE_MASTER' || role === 'ROLE_KEEPER' ? (
          <EditWorker data={rowData!} setVisible={setVisibleEdit} visible={visibleEdit} />
        ) : (
          ''
        )}
      </>

      <DeleteModal
        loading={isLoadingDelete}
        handleDelete={handleDelete}
        setVisible={setVisibleDelete}
        visible={visibleDelete}
      />
    </LayoutAdmin>
  );
};
export default AdminAllUsers;
