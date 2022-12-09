import { FC } from 'react';
import { useParams } from 'react-router-dom';

import { Reply } from '@/components/Appeal';
import { Card } from '@/components/Forms';
import { Layout } from '@/components/Layout';
import warehouses from '@/assets/warehouseData.json';

const cardTextStyle = 'font-montserrat text-dark-blue text-xs';

const WarehouseAppeal: FC = () => {
  const { id } = useParams();
  const urlId = parseInt(id);

  const warehouse = warehouses.find((e) => e.warehouseId === urlId);

  return (
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
  );
};

export default WarehouseAppeal;
