import { FC } from 'react';

import { Header, Layout } from '@/components/Layout';
import Arrow from '../assets/Arrow.svg';
import { Card } from '@/components/Forms';

import User from '../components/User.json';
import { Reply } from '@/components/Appeal';

const UserAppeal: FC = () => {
  return (
    <div>
      <Header className="flex h-14">
        <div className="mx-4">
          <img src={Arrow} alt="" />
        </div>
        <h2 className="font-montserrat text-base text-dark-blue font-medium ml-5  ">
          Пользователь #12333
        </h2>
      </Header>
      <Layout>
        <div className="w-11/12 mx-auto">
          <Card>
            <h2 className="font-semibold text-dark-blue text-xs font-montserrat">ID: 12333</h2>
            <h5 className="text-dark-blue text-xs font-montserrat">{User.username}</h5>
            <h5 className="text-dark-blue text-xs font-montserrat">{User.phone}</h5>
          </Card>

          <div className="my-7">
            <Card>
              <h2 className="font-semibold text-dark-blue text-xs font-montserrat">Обращение</h2>
              <p className="font-montserrat text-xs mt-2 text-dark-blue">
                описание какой-то проблемы, с которым сталкнулся пользователь. описание какой-то
                проблемы, с которым сталкнулся пользователь
              </p>
            </Card>
          </div>

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
        <Reply className="w-11/12 mx-auto" />
      </Layout>
    </div>
  );
};

export default UserAppeal;
