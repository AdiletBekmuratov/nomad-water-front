import { IBottle } from '@/types/types';
import React, { FC } from 'react';

export const Discription: FC<IBottle> = ({ title, discription, availability }) => {
  return (
    <div>
      <h2>{title}</h2>
      <p className={`text-xs opacity-60 sm:mt-4 sm:mb-2`}>{discription}</p>
      {availability ? (
        <span className={`text-xs text-green-color font-semibold mb-2 `}>В наличии</span>
      ) : (
        <span className={`text-xs text-red-600 font-semibold mb-2 `}>Нет в наличии</span>
      )}

      <p className={`text-xs opacity-60 hidden sm:mb-4 sm:block`}>
        Ожидаемая доставка: сегодня до 16:00
      </p>
    </div>
  );
};
