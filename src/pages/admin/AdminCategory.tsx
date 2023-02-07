import { useMemo, useState } from 'react';

import LayoutAdmin from '@/components/Admin/LayoutAdmin';
import Loader from '@/components/Landing/Loader';
import { ActionButtons, DeleteModal, Table } from '@/components/Table';

import { IProductCategoryCreate } from '@/types/products.type';
import { ColumnDef, Row } from '@tanstack/react-table';
import { toast } from 'react-hot-toast';
import {
  useDeleteProductCategoryMutation,
  useGetProductCategoryQuery
} from '../../redux/services/base.service';

import { CreateCategory, EditCategory } from '@/components/Admin/Category';

const AdminCategory = () => {
  const { data, isLoading } = useGetProductCategoryQuery();
  const [deleteProduct, { isLoading: isLoadingDelete }] = useDeleteProductCategoryMutation();

  const [rowData, setRowData] = useState<IProductCategoryCreate>();
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

  const handleEditRowClick = (row: Row<IProductCategoryCreate>) => {
    setRowData(row.original);
    setVisibleEdit(true);
  };

  const handleDeleteRowClick = (row: Row<IProductCategoryCreate>) => {
    setRowData(row.original);
    setVisibleDelete(true);
  };

  const columns = useMemo<ColumnDef<IProductCategoryCreate, any>[]>(
    () => [
      {
        header: 'ID категории',
        accessorKey: 'id'
      },
      {
        header: 'Название категории',
        accessorKey: 'name'
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
        id="ProductsTable"
        data={data}
        columns={columns}
        onAddClick={() => setVisibleCreate(true)}
        title='Категории товаров'
      />

      <CreateCategory visible={visibleCreate} setVisible={setVisibleCreate} />
      <EditCategory data={rowData!} setVisible={setVisibleEdit} visible={visibleEdit} />
      <DeleteModal
        loading={isLoadingDelete}
        handleDelete={handleDelete}
        setVisible={setVisibleDelete}
        visible={visibleDelete}
      />
    </LayoutAdmin>
  );
};

export default AdminCategory;
