import { FC } from 'react';

import { Header, Layout } from '@/components/Layout';
import Arrow from '../assets/Arrow.svg';
import { Card } from '@/components/Forms';
import warehouses from '../assets/warehouseData.json';
import { Link } from 'react-router-dom';

const cardTextStyle = 'font-montserrat text-dark-blue text-xs';

const Warehouses: FC = () => {
  return (
    <div>
      <Header className="h-14 flex">
        <a href="#">
          <img src={Arrow} alt="" className="mx-4" />
        </a>
        <h3 className="font-montserrat text-base text-dark-blue font-medium ml-5">
          Пользователь #20203
        </h3>
      </Header>
      <Layout className="md:grid md:grid-cols-2 md:gap-6">
        {warehouses.map((warehouse) => (
          <Link to={`/warehouse/${warehouse.warehouseId}`} key={warehouse.warehouseId}>
            <Card className="mb-2">
              <h3 className="font-semibold font-montserrat text-dark-blue text-sm ">
                Склад #{warehouse.warehouseId}
              </h3>
              <h3 className={`${cardTextStyle} mt-2`}>{warehouse.warehouseAddress}</h3>
              <div className="">
                <span className={cardTextStyle}>
                  <strong className="font-medium">Заведующий:</strong> {warehouse.manager}
                </span>
              </div>
              <div>
                <span className={cardTextStyle}>
                  <strong className="font-medium">Телефон:</strong> {warehouse.phoneNumber}
                </span>
              </div>
            </Card>
          </Link>
        ))}
      </Layout>
    </div>
  );
};

export default Warehouses;
