import React, { useMemo, useState } from 'react';

import { ICouriers } from '@/types';

import LayoutAdmin from '@/components/Admin/LayoutAdmin';
import Loader from '@/components/Landing/Loader';

import { toast } from 'react-hot-toast';
import { ColumnDef, Row } from '@tanstack/react-table';
import { ActionButtons, DeleteModal, Table } from '@/components/Table';
import { CreateModal } from '@/components/NOuseFile/CreateModal';
import { EditModal } from '@/components/Admin/AllUsers/EditModalCourier';
import { useGetUserROLEQuery } from '@/redux/services/user.service';

const AdminCouriers = () => {
  //const { data: couriers = [], isLoading } = useGetAllCouriersQuery();
  //const [couriers, setCouriers] = useState<ICouriers[]>([]);

  const { data: userCouriers = [], isLoading } = useGetUserROLEQuery('ROLE_COURIER');

  let couriers: ICouriers[] = [];
  const userIdArray = userCouriers!.map((item) => item.id);

  let couriersArr = userIdArray.map((userId, i) => ({ userId, ...couriers[i] }));
  console.log(couriersArr);

  const [deleteCourier, { isLoading: isLoadingDelete }] = useDeleteCourierMutation();

  const [rowData, setRowData] = useState<ICouriers>();
  const [visibleCreate, setVisibleCreate] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);

  const handleDelete = async () => {
    toast
      .promise(deleteCourier(rowData!.id!).unwrap(), {
        loading: 'Loading',
        success: 'Deleted Successfully',
        error: (error) => JSON.stringify(error, null, 2)
      })
      .finally(() => {
        setVisibleDelete(false);
      });
  };

  const handleEditRowClick = (row: Row<ICouriers>) => {
    setRowData(row.original);
    setVisibleEdit(true);
  };

  const handleDeleteRowClick = (row: Row<ICouriers>) => {
    setRowData(row.original);
    setVisibleDelete(true);
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
        id="CouriersTable"
        data={couriersArr}
        columns={columns}
        onAddClick={() => setVisibleCreate(true)}
      />
      <CreateModal visible={visibleCreate} setVisible={setVisibleCreate} />
      <EditModal data={rowData!} setVisible={setVisibleEdit} visible={visibleEdit} />
      <DeleteModal
        loading={isLoadingDelete}
        handleDelete={handleDelete}
        setVisible={setVisibleDelete}
        visible={visibleDelete}
      />
    </LayoutAdmin>
  );
};

export default AdminCouriers;
