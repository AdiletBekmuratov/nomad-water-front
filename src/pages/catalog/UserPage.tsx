import { Layout } from '@/components/Layout';

import { Button } from '@/components/Forms';

import React from 'react';

import { useAppSelector } from '@/hooks/useAppSelector';
import { Edit } from '@/components/User/Edit';
import OrderHistory from '@/components/User/OrderHistory';
import { useGetUserIDQuery } from '@/redux/services/base.service';

const UserPage = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { data, isLoading } = useGetUserIDQuery(user?.id!);
  const [isOpenEdit, setIsOpenEdit] = React.useState(false);

  return (
    <Layout>
      <div>
        <h1 className="text-center font-montserrat text-xl font-medium text-dark-blue">Профиль</h1>
        <div className="font-montserrat text-dark-blue grid grid-cols-2 mt-2 gap-2">
          <div className="flex justify-center">
            <p className="text-sm md:text-base">
              <strong>ФИО:</strong>
              {` ${data?.firstname ? data?.firstname : ''} ${
                data?.lastname ? data?.lastname : ''
              } ${data?.middleName ? data?.middleName.substring(0, 1) : ''}.`}
            </p>
          </div>
          <div className="flex justify-center">
            <p className="text-sm md:text-base">
              <strong>Улица: </strong>
              {`${data?.street ? data?.street : ''} ${
                data?.houseNumber ? data?.houseNumber : ''
              } квартира:  ${data?.flat ? data?.flat : ''}`}
            </p>
          </div>
          <div className="col-span-2 mx-auto">
            <p className="text-sm md:text-base">
              <strong>Номер телефона: </strong>
              {`${user?.phone}`}
            </p>
          </div>
        </div>
        <div className="mt-4 md:w-1/3 mx-auto">
          <Button onClick={() => setIsOpenEdit(true)}>Изменить данные</Button>
          <Edit setVisible={setIsOpenEdit} visible={isOpenEdit} data={user!} />
        </div>
        <OrderHistory />
      </div>
    </Layout>
  );
};

export default UserPage;
