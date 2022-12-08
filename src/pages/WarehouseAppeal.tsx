import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { Header, Layout } from '@/components/Layout';
import Arrow from '../assets/Arrow.svg';
import warehouses from '../assets/warehouseData.json';
import { Card } from '@/components/Forms';
import { Reply } from '@/components/Appeal';

const cardTextStyle = 'font-montserrat text-dark-blue text-xs';

const WarehouseAppeal: FC = () => {
  const { id } = useParams();
  const urlId = parseInt(id);

  const warehouse = warehouses.find((e) => e.warehouseId === urlId);

  return (
    <div className="h-screen bg-gray-200">
      <Header className="h-14 flex md:block">
        <a href="#">
          <img src={Arrow} alt="" className="mx-4 md:hidden" />
        </a>
        <h3 className="font-montserrat text-base text-dark-blue font-medium ml-5 md:ml-0 md:text-center md:font-semibold">
          Склады
        </h3>
      </Header>
      <Layout className="md:grid md:grid-cols-3 md:gap-2.5">
        <Card className="mb-2">
          <h3 className="font-semibold font-montserrat text-dark-blue text-sm ">
            Склад #{warehouse?.warehouseId}
          </h3>
          <h3 className={`${cardTextStyle} mt-2`}>{warehouse?.warehouseAddress}</h3>
          <div className="">
            <span className={cardTextStyle}>
              <strong className="font-medium">Заведующий:</strong> {warehouse?.manager}
            </span>
          </div>
          <div>
            <span className={cardTextStyle}>
              <strong className="font-medium">Телефон:</strong> {warehouse?.phoneNumber}
            </span>
          </div>
        </Card>
        <Card className="md:col-span-2 md:order-1 md:row-start-1 my-7  mx-auto md:my-0">
          <h2 className="font-semibold text-dark-blue text-xs font-montserrat">Обращение</h2>
          <p className="font-montserrat text-xs mt-2 text-dark-blue">
            Описание обращения, К примеру, закончился товар или сломалась важная техника
          </p>
        </Card>
        <Reply className="h-60 md:col-span-2" textareaStyle={`h-28`} />
      </Layout>
    </div>
  );
};

export default WarehouseAppeal;
