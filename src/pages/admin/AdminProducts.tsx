import React, { useMemo, useState } from 'react';

import Loader from '@/components/Landing/Loader';
import { ActionButtons, DeleteModal, Table } from '@/components/Table';

import {
  useGetAllProductsQuery,
  useDeleteProductMutation
} from '../../redux/services/base.service';
import { IProduct } from '@/types/products.type';
import { ColumnDef, Row } from '@tanstack/react-table';
import { toast } from 'react-hot-toast';
import LayoutAdmin from '@/components/Admin/LayoutAdmin';

import { CreateProduct, EditProducts } from '@/components/Admin/Products';

const AdminProducts = () => {
  const { data, isLoading } = useGetAllProductsQuery();
  const [deleteProduct, { isLoading: isLoadingDelete }] = useDeleteProductMutation();

  const [rowData, setRowData] = useState<IProduct>();
  const [visibleCreate, setVisibleCreate] = useState(false);
  const [visibleDelete, setVisibleDelete] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);

  const handleDelete = async () => {
    toast
      .promise(deleteProduct(rowData!.id!).unwrap(), {
        loading: 'Loading',
        success: 'Deleted Successfully',
        error: (error) => JSON.stringify(error, null, 2)
      })
      .finally(() => {
        setVisibleDelete(false);
      });
  };

  const handleEditRowClick = (row: Row<IProduct>) => {
    setRowData(row.original);
    setVisibleEdit(true);
  };

  const handleDeleteRowClick = (row: Row<IProduct>) => {
    setRowData(row.original);
    setVisibleDelete(true);
  };

  const columns = useMemo<ColumnDef<IProduct, any>[]>(
    () => [
      {
        header: 'ID',
        accessorKey: 'id'
      },
      {
        header: 'Image',
        accessorKey: 'imageUrl',
        cell: ({ getValue }) => <img src={getValue()} alt={getValue()} />
      },
      {
        header: 'Name',
        accessorKey: 'productName'
      },
      {
        header: 'Category',
        accessorKey: 'productCategory.name'
      },
      {
        header: 'Description',
        accessorKey: 'description'
      },

      {
        header: 'Product Price',
        accessorKey: 'productPrice'
      },
      {
        header: 'Created Date',
        accessorKey: 'createdDate'
      },
      {
        header: 'Updated Date',
        accessorKey: 'updatedDate'
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
        id="ProductsTable"
        data={data}
        columns={columns}
        onAddClick={() => setVisibleCreate(true)}
      />

      <CreateProduct visible={visibleCreate} setVisible={setVisibleCreate} />

      <EditProducts data={rowData!} setVisible={setVisibleEdit} visible={visibleEdit} />

      <DeleteModal
        loading={isLoadingDelete}
        handleDelete={handleDelete}
        setVisible={setVisibleDelete}
        visible={visibleDelete}
      />
    </LayoutAdmin>
  );
};

export default AdminProducts;
