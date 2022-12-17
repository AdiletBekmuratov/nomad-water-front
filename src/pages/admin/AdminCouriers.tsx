// import LayoutAdmin from '@/components/Admin/LayoutAdmin';
// import { CreateModal, EditModal } from '@/components/Admin/Pages/Warehouses';
// import Loader from '@/components/Loader';
// import { ActionButtons, DeleteModal, Table } from '@/components/Table';

// import { useGetAllCouriersQuery } from '@/redux/services/base.service';
// import { IWarehouse } from '@/types/warehouse.type';
// import { ColumnDef, Row } from '@tanstack/table-core';
// import React, { useMemo, useState } from 'react';
// import { toast } from 'react-hot-toast';

// const AdminCouriers = () => {
//   const { data, isLoading } = useGetAllCouriersQuery();

//   //const [deleteWarehouse, { isLoading: isLoadingDelete }] = useDeleteWarehouseMutation();

//   const [rowData, setRowData] = useState<IWarehouse>();
//   const [visibleCreate, setVisibleCreate] = useState(false);
//   const [visibleDelete, setVisibleDelete] = useState(false);
//   const [visibleEdit, setVisibleEdit] = useState(false);

//   // const handleDelete = async () => {
//   //   toast
//   //     .promise(deleteWarehouse(rowData!.id!).unwrap(), {
//   //       loading: 'Loading',
//   //       success: 'Deleted Successfully',
//   //       error: (error) => JSON.stringify(error, null, 2)
//   //     })
//   //     .finally(() => {
//   //       setVisibleDelete(false);
//   //     });
//   // };

//   const handleEditRowClick = (row: Row<IWarehouse>) => {
//     setRowData(row.original);
//     setVisibleEdit(true);
//   };

//   const handleDeleteRowClick = (row: Row<IWarehouse>) => {
//     setRowData(row.original);
//     setVisibleDelete(true);
//   };

//   const columns = useMemo<ColumnDef<IWarehouse, any>[]>(
//     () => [
//       {
//         header: 'ID',
//         accessorKey: 'id'
//       },
//       {
//         header: 'Phone',
//         accessorKey: 'phone'
//       },
//       {
//         header: 'Address',
//         accessorKey: 'warehouseAddress'
//       },
//       {
//         header: 'createdDate',
//         accessorKey: 'createdDate'
//       },
//       {
//         header: 'updatedDate',
//         accessorKey: 'updatedDate'
//       },
//       {
//         header: 'Actions',
//         cell: ({ row }) => (
//           <ActionButtons
//             handleEditClick={() => handleEditRowClick(row)}
//             handleDeleteClick={() => handleDeleteRowClick(row)}
//           />
//         )
//       }
//     ],
//     []
//   );

//   if (isLoading) {
//     return <Loader />;
//   }

//   return (
//     <LayoutAdmin>
//       <Table
//         id="WarehousesTable"
//         data={data}
//         columns={columns}
//         onAddClick={() => setVisibleCreate(true)}
//       />
//       <CreateModal visible={visibleCreate} setVisible={setVisibleCreate} />
//       <EditModal data={rowData!} setVisible={setVisibleEdit} visible={visibleEdit} />
//       <DeleteModal
//         loading={isLoadingDelete}
//         handleDelete={handleDelete}
//         setVisible={setVisibleDelete}
//         visible={visibleDelete}
//       />
//     </LayoutAdmin>
//   );
// };

// export default AdminCouriers;
