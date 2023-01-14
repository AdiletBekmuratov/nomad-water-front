import { useMemo, useState } from 'react';
import { useGetUserROLEQuery } from '@/redux/services/user.service';
import { ICouriers } from '@/types';

import { EditCourier } from '@/components/Admin/Couriers/EditCourier';
import { CreateModal } from '@/components/Admin/AllUsers';

import LayoutAdmin from '@/components/Admin/LayoutAdmin';
import Loader from '@/components/Landing/Loader';

import { ColumnDef, Row } from '@tanstack/react-table';
import { ActionButtons, Table } from '@/components/Table';

const AdminCouriers = () => {
  const { data: couriers = [], isLoading } = useGetUserROLEQuery('ROLE_COURIER');

  const [rowData, setRowData] = useState<ICouriers>();
  const [visibleCreate, setVisibleCreate] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);

  const handleEditRowClick = (row: Row<ICouriers>) => {
    setRowData(row.original);
    setVisibleEdit(true);
  };

  const columns = useMemo<ColumnDef<ICouriers, any>[]>(
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
        header: 'Д.Р.',
        accessorKey: 'birthday'
      },
      {
        header: 'telegram',
        accessorKey: 'telegramAccount'
      },
      {
        header: 'авто',
        accessorKey: 'car'
      },
      {
        header: 'Выполненые заказы',
        accessorKey: 'successfulOrders'
      },

      {
        header: 'Actions',
        cell: ({ row }) => <ActionButtons handleEditClick={() => handleEditRowClick(row)} />
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
        id="CouriersTable"
        data={couriers}
        columns={columns}
        onAddClick={() => setVisibleCreate(true)}
      />
      <CreateModal visible={visibleCreate} setVisible={setVisibleCreate} />
      <EditCourier data={rowData!} setVisible={setVisibleEdit} visible={visibleEdit} />
    </LayoutAdmin>
  );
};

export default AdminCouriers;
