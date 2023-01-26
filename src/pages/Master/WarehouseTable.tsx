import { useGetWarehouseIDQuery } from '@/redux/services/base.service';

import { Layout } from '@/components/Layout';

import { useParams } from 'react-router';
import MasterAllProduct from './MasterAllProduct';

const WarehouseTable = () => {
  const { id: warehouseId } = useParams();
  const { data: warehouse } = useGetWarehouseIDQuery(Number(warehouseId));
  //   const columns = useMemo<ColumnDef<IWarehouse, any>[]>(
  //     () => [
  //       {
  //         header: 'ID продукта',
  //         accessorKey: 'id'
  //       },
  //       {
  //         header: 'Адрес склада',
  //         accessorKey: 'warehouseAddress'
  //       },
  //       {
  //         header: 'Телефон склада',
  //         accessorKey: 'phone'
  //       }
  //     ],
  //     []
  //   );
  return (
    <Layout>
      <div className="grid gap-3">
        <div
          className={` flex flex-col md:flex-row flex-1 justify-evenly bg-light-blue rounded-lg 
      p-1 md:p-3 text-xs md:text-base gap-2 md:gap-3 shadow-lg`}>
          <span>
            <strong>ID:</strong>
            {` ${warehouse?.id ? warehouse.id : 'ID'} `}
          </span>
          <span>
            <strong>Адрес: </strong>
            {` ${warehouse?.warehouseAddress ? warehouse.warehouseAddress : 'Адрес'} `}
          </span>
          <span>
            <strong>Телефон склада:</strong>
            {` ${warehouse?.phone ? warehouse.phone : '+7 777 777 77 77'} `}
          </span>

          <span>
            <strong>Дата обновления: </strong>
            {` ${warehouse?.updatedDate ? warehouse.updatedDate : 'Дата обновления'} `}
          </span>
        </div>
        <MasterAllProduct />
      </div>
    </Layout>
  );
};

export default WarehouseTable;
