import { useMemo, useState } from 'react';

import Loader from '@/components/Landing/Loader';
import { ActionButtons, DeleteModal, Table } from '@/components/Table';

import { useGetAllProductsQuery, useDeleteProductMutation } from '@/redux/services/base.service';
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
      // {
      //   header: 'ID продукта',
      //   accessorKey: 'id'
      // },
      {
        header: 'Категория продукта',
        accessorKey: 'productCategory.name'
      },
      {
        header: 'Имя',
        accessorKey: 'productName'
      },
      {
        header: 'Image',
        accessorKey: 'imageUrl',
        cell: ({ getValue }) => <img src={getValue()} alt={getValue()} className={`w-16 h-auto`} />
      },

      {
        header: 'Описание',
        accessorKey: 'description',
        cell: ({ getValue }) => <>{getValue().slice(0, 20)}...</>
      },

      {
        header: 'Цена продукта',
        accessorKey: 'productPrice'
      },
      // {
      //   header: 'Дата создания',
      //   accessorKey: 'createdDate'
      // },
      {
        header: 'Дата обновления',
        accessorKey: 'updatedDate'
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
        title="Все продукты"
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
