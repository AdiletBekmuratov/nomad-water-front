import { Layout } from '@/components/Layout';

import { Button } from '@/components/Forms';

import React from 'react';

import { useAppSelector } from '@/hooks/useAppSelector';
import { Edit } from '@/pages/User/Edit';
import OrderHistory from '@/pages/User/OrderHistory';

const UserPage = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [isOpenEdit, setIsOpenEdit] = React.useState(false);

  return (
    <Layout>
      <div className="h-screen">
        <h1 className="text-center font-montserrat text-xl font-medium text-dark-blue">Профиль</h1>
        <div className="font-montserrat text-dark-blue grid grid-cols-2 mt-2 gap-2">
          <div className="flex justify-center">
            <p className="text-sm md:text-base">
              <strong>ФИО:</strong>
              {` ${user?.lastname} ${user?.firstname}`}
            </p>
          </div>
          <div className="flex justify-center">
            <p className="text-sm md:text-base">
              <strong>Улица: </strong>
              {`${user?.street ? user?.street : ''} ${
                user?.houseNumber ? user?.houseNumber : ''
              } квартира:  ${user?.flat ? user?.flat : ''}`}
            </p>
          </div>
          <div className="col-span-2 mx-auto">
            <p className="text-sm md:text-base">
              <strong>Номер телефона: </strong>
              {`${user?.phone}`}
            </p>
          </div>
        </div>
        <div className={`mt-4 md:w-1/3 mx-auto`}>
          <Button onClick={() => setIsOpenEdit(true)}>Изменить данные</Button>
          <Edit setVisible={setIsOpenEdit} visible={isOpenEdit} data={user!} />
        </div>
        <div className={`mt-4 mx-auto`}>
          <h2 className={`text-center font-semibold text-2xl`}>Заказы</h2>
          <OrderHistory />
        </div>
      </div>
    </Layout>
  );
};

export default UserPage;
