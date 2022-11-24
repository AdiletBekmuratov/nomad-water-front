import { FC } from 'react';
import { ReactComponent as Back } from '../../assets/back.svg';

export const OrderHeader: FC = () => {
  return (
    <header className="bg-white w-full h-14 flex ">
      <a href="#" className="items-center h-6 px-8 py-6">
        <Back />
      </a>
      <h2 className="text-dark-blue text-base font-montserrat font-medium items-center h-6 mt-5">
        Оформление заказа
      </h2>
    </header>
  );
};
