import React, { useMemo, useState } from 'react';

import { ICouriers } from '@/types';

import LayoutAdmin from '@/components/Admin/LayoutAdmin';
import Loader from '@/components/Landing/Loader';

import { toast } from 'react-hot-toast';
import { ColumnDef, Row } from '@tanstack/react-table';
import { ActionButtons, Table } from '@/components/Table';


import { useGetUserROLEQuery } from '@/redux/services/user.service';

import { EditCourier } from '@/components/Admin/Couriers/EditCourier';
import { CreateModal } from '@/components/Admin/AllUsers';

const AdminCouriers = () => {
  const { data: userCouriers = [], isLoading } = useGetUserROLEQuery('ROLE_COURIER');

  let couriers: ICouriers[] = [];
  const userIdArray = userCouriers!.map((item) => item.id);

  let couriersArr = userIdArray.map((userId, i) => ({ userId, ...couriers[i] }));
  console.log(couriersArr);

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
        header: 'ID курьера',
        accessorKey: 'id'
      },

      {
        header: 'ID пользователя',
        accessorKey: 'userId'
      },
      {
        header: 'авто',
        accessorKey: 'car'
      },
      {
        header: 'Статус доставки',
        accessorKey: 'courierDeliveringStatus'
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
        data={couriersArr}
        columns={columns}
        onAddClick={() => setVisibleCreate(true)}
      />
      <CreateModal visible={visibleCreate} setVisible={setVisibleCreate} />
      <EditCourier data={rowData!} setVisible={setVisibleEdit} visible={visibleEdit} />
    </LayoutAdmin>
  );
};

export default AdminCouriers;
