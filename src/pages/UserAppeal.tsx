import { FC } from 'react';

import { Card } from '@/components/Forms';
import { Layout } from '@/components/Layout';

import { Reply } from '@/components/Appeal';
import User from '../components/User.json';

const UserAppeal: FC = () => {
  return (
    <Layout className="md:grid md:grid-cols-3">
      <Card className="w-11/12 mx-auto md:row-start-1 md:order-2">
        <div className="md:col-span-1">
          <h2 className="font-semibold text-dark-blue text-xs font-montserrat">ID: 12333</h2>
          <h5 className="text-dark-blue text-xs font-montserrat">{User.username}</h5>
          <h5 className="text-dark-blue text-xs font-montserrat">{User.phone}</h5>
        </div>
      </Card>

      <Card className="md:col-span-2 md:order-1 md:row-start-1 my-7 w-11/12 mx-auto md:my-0">
        <h2 className="font-semibold text-dark-blue text-xs font-montserrat">Обращение</h2>
        <p className="font-montserrat text-xs mt-2 text-dark-blue">
          описание какой-то проблемы, с которым сталкнулся пользователь. описание какой-то проблемы,
          с которым сталкнулся пользователь
        </p>
      </Card>

      <div className="w-11/12 mx-auto md:mt-4">
        <div className="mx-4 flex flex-col">
          <h2 className="font-semibold text-sm text-dark-blue font-montserrat mb-2">
            Последние действия
          </h2>
          <span className="text-dark-blue text-sm font-montserrat mb-2">
            <span className="font-medium mr-2">Заказ:</span>
            Название товара
          </span>
          <span className="text-dark-blue text-sm font-montserrat mb-2">
            <span className="font-medium mr-2">Дата:</span>
            20.12.2022
          </span>
          <span className="text-dark-blue text-sm font-montserrat mb-2">
            <span className="font-medium mr-2">Склад:</span>
            №4
          </span>
          <span className="text-dark-blue text-sm font-montserrat mb-2">
            <span className="font-medium mr-2">ID работника склада:</span>
            #29384
          </span>
          <span className="text-dark-blue text-sm font-montserrat mb-2">
            <span className="font-medium mr-2">ID курьера:</span>
            #29384
          </span>
        </div>
      </div>

      <Reply className="w-11/12 mx-auto md:col-span-2 md:row-start-2 md:h-64" />
    </Layout>
  );
};

export default UserAppeal;
