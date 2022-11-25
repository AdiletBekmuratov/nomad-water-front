import React from 'react';
import { Link } from 'react-router-dom';

import { Counter } from './Counter';

import bottle from '../../../assets/crm/bottle.png';
import { AddFavourite } from './AddFavourite';

export const CardBottle: React.FC = ({ isFavourite, setIsFavourite, counter, setCounter }) => {
  return (
    <Link to="/crm/orderPage">
      <div className={`flex flex-col sm:flex-row sm:bg-white sm:rounded-3xl relative`}>
        <AddFavourite isFavourite={isFavourite} setIsFavourite={setIsFavourite} />
        <img src={bottle} alt="bottleCard" className={`sm:m-3`} />
        <div
          className={`flex flex-col sm:ml-5 text-left text-sm sm:text-base leading-4 font-medium pt-2 sm:pt-5`}>
          <h2>Nomad Water, 5 л, негаз.</h2>
          <p className={`text-xs opacity-60 sm:mt-4 sm:mb-2`}>Доп. описание</p>
          <span className={`text-xs text-green-color font-semibold mb-2 `}>В наличии</span>
          <p className={`text-xs opacity-60 hidden sm:mb-8 sm:block`}>
            Ожидаемая доставка: сегодня до 16:00
          </p>
          <div className={`flex justify-between`}>
            <h2 className={`sm:text-lg`}>5 000 T</h2>
            <div className={`hidden`}>
              <Counter counter={counter} setCounter={setCounter} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
