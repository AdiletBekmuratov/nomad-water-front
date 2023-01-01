import React from 'react';
import { useAppSelector } from '@/hooks/useAppSelector';
import { Layout } from '@/components/Layout';
import Pending from './Employee/Pending';

const Employee = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <Layout>
      <div className="flex justify-center">
        <div className="text-dark-blue font-montserrat">
          <strong>Профиль диспетчера:</strong> {user?.firstname} {user?.lastname}
        </div>
      </div>
      <div className="mt-2">
        <p className="text-dark-blue text-xl text-center font-montserrat font-medium">
          Заказы в ожидании
        </p>
      </div>
      <Pending />
    </Layout>
  );
};

export default Employee;
