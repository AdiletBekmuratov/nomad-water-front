import { IBottle } from '@/types/types';
import React, { FC } from 'react';

export const Discription: FC<IBottle> = ({
  title,
  discription,
  availability,
  orderNumber = '#283 349',
  orderAddress = 'адрес доставки',
  isOrders
}) => {
  return (
    <div className={``}>
      {isOrders && <h1 className={`text-lg font-semibold`}>Заказ: {orderNumber}</h1>}
      <h2>{title}</h2>
      <p className={`text-xs opacity-60`}>{discription}</p>
      {isOrders && <p className={`text-xs opacity-60`}>Адрес: {orderAddress}</p>}
      {availability ? (
        <span className={`text-xs text-green-color font-semibold mb-1 `}>В наличии</span>
      ) : (
        <span className={`text-xs text-red-600 font-semibold mb-1 `}>Нет в наличии</span>
      )}
      {!isOrders && (
        <p className={`text-xs opacity-60 hidden sm:mb-4 sm:block`}>
          Ожидаемая доставка: сегодня до 16:00
        </p>
      )}
    </div>
  );
};
