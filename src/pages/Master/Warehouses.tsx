import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '@/hooks';
import { useGetAllWarehousesQuery } from '@/redux/services/base.service';

import { Layout } from '@/components/Layout';
import { Button } from '@/components/Forms';

const cardTextStyle = 'font-montserrat text-dark-blue text-sm';

const Warehouses: FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { data: warehouses = [] } = useGetAllWarehousesQuery();

  return (
    <Layout>
      {user ? (
        (user.role === 'ROLE_ADMIN' || user.role === 'ROLE_MASTER') ? (
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-5`}>
            {warehouses.map((warehouse) => (
              <div
                className={`bg-white p-2 md:p-4 grid gap-3 rounded-lg shadow-lg`}
                key={warehouse.id}>
                
                <div className={`flex flex-col gap-2`}>
                  <h3 className="font-semibold font-montserrat text-dark-blue text-sm ">
                    Склад #{warehouse.id}
                  </h3>
                  <h3 className={`${cardTextStyle}`}>
                    <strong className="font-medium">Адрес склада: </strong>
                    {warehouse.warehouseAddress}
                  </h3>
                  <span className={cardTextStyle}>
                    <strong className="font-medium">Телефон:</strong> {warehouse.phone}
                  </span>
                  <span className={cardTextStyle}>
                    <strong className="font-medium">Режим работы: </strong> 8:00 - 20:00
                  </span>
                </div>
                <Link to={`/warehouse/${warehouse.id}`}>
                  <Button>Проверить остатки на складе</Button>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className={`grid grid-cols-1 md:grid-cols-2 gap-5`}>
            {warehouses.map((warehouse) => (
              <div className={`bg-white p-2 md:p-4 rounded-lg shadow-lg`} key={warehouse.id}>
                {/* // <div to={`/warehouse/${warehouse.id}`} key={warehouse.id }> */}
                <div className={`flex flex-col gap-2`}>
                  <h3 className="font-semibold font-montserrat text-dark-blue text-sm ">
                    Склад #{warehouse.id}
                  </h3>
                  <h3 className={`${cardTextStyle}`}>
                    <strong className="font-medium">Адрес склада: </strong>
                    {warehouse.warehouseAddress}
                  </h3>
                  <span className={cardTextStyle}>
                    <strong className="font-medium">Телефон:</strong> {warehouse.phone}
                  </span>
                  <span className={cardTextStyle}>
                    <strong className="font-medium">Режим работы: </strong> 8:00 - 20:00
                  </span>
                </div>
              </div>
            ))}
          </div>
        )
      ) : null}
    </Layout>
  );
};

export default Warehouses;
