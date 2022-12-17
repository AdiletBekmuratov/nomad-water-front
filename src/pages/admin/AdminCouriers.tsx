import LayoutAdmin from '@/components/Admin/LayoutAdmin';
import Loader from '@/components/Loader';
import { ActionButtons, DeleteModal, Table } from '@/components/Table';
import { useGetUserROLEQuery } from '@/redux/services/base.service';
import { ICouriers } from '@/types';
import { ColumnDef, Row } from '@tanstack/react-table';
import React, { useMemo, useState } from 'react';

const AdminCouriers = () => {
  // const { data, isLoading } = useGetAllCouriersQuery();

  const { data: users, isLoading: isLoadingUsers } = useGetUserROLEQuery('ROLE_COURIER');

  console.log(users);
  // const [rowData, setRowData] = useState<ICouriers>();
  // const [visibleCreate, setVisibleCreate] = useState(false);
  // const [visibleDelete, setVisibleDelete] = useState(false);
  // const [visibleEdit, setVisibleEdit] = useState(false);

  // const handleDelete = async () => {
  //   toast
  //     .promise(deleteProduct(rowData!.id!).unwrap(), {
  //       loading: 'Loading',
  //       success: 'Deleted Successfully',
  //       error: (error) => JSON.stringify(error, null, 2)
  //     })
  //     .finally(() => {
  //       setVisibleDelete(false);
  //     });
  // };

  // const handleEditRowClick = (row: Row<ICouriers>) => {
  //   setRowData(row.original);
  //   setVisibleEdit(true);
  // };

  // const handleDeleteRowClick = (row: Row<ICouriers>) => {
  //   setRowData(row.original);
  //   setVisibleDelete(true);
  // };

  // const columns = useMemo<ColumnDef<ICouriers, any>[]>(
  //   () => [
  //     {
  //       header: 'ID',
  //       accessorKey: 'id'
  //     },

  //     {
  //       header: 'Name',
  //       accessorKey: 'productName'
  //     },
  //     {
  //       header: 'Category',
  //       accessorKey: 'productCategory.name'
  //     },
  //     {
  //       header: 'Description',
  //       accessorKey: 'description'
  //     },

  //     {
  //       header: 'Product Price',
  //       accessorKey: 'productPrice'
  //     },
  //     {
  //       header: 'Urgency Price',
  //       accessorKey: 'urgencyPrice'
  //     },
  //     {
  //       header: 'Created Date',
  //       accessorKey: 'createdDate'
  //     },
  //     {
  //       header: 'Updated Date',
  //       accessorKey: 'updatedDate'
  //     },

  //     {
  //       header: 'Actions',
  //       cell: ({ row }) => (
  //         <ActionButtons
  //           handleEditClick={() => handleEditRowClick(row)}
  //           handleDeleteClick={() => handleDeleteRowClick(row)}
  //         />
  //       )
  //     }
  //   ],
  //   []
  // );

  // if (isLoading) {
  //   return <Loader />;
  // }

  // return (
  //   <LayoutAdmin>
  //     <Table
  //       id="ProductsTable"
  //       data={data}
  //       columns={columns}
  //       onAddClick={() => setVisibleCreate(true)}
  //     />

  //     {/* <CreateProduct visible={visibleCreate} setVisible={setVisibleCreate} /> */}

  //     {/* <EditProducts data={rowData!} setVisible={setVisibleEdit} visible={visibleEdit} /> */}

  //     <DeleteModal
  //       loading={isLoadingDelete}
  //       handleDelete={handleDelete}
  //       setVisible={setVisibleDelete}
  //       visible={visibleDelete}
  //     />
  //   </LayoutAdmin>
  // );
};

export default AdminCouriers;
