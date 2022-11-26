import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Counter } from './Counter';
import { AddFavourite } from './AddFavourite';
import { ICard } from '@/types/types';
import { Discription } from './Discription';

export const CardBottle: FC<ICard> = ({
  isAddFavourite,
  isFavourite,
  setIsFavourite,
  counter,
  setCounter,
  items
}) => {
  return (
    <Link to="/crm/orderPage">
      <div className={`flex flex-col sm:flex-row sm:bg-white sm:rounded-3xl relative`}>
        {isAddFavourite && (
          <AddFavourite isFavourite={isFavourite} setIsFavourite={setIsFavourite} />
        )}
        <div className={`sm:p-2`}>
          <img src={items.img} alt="bottle" />
        </div>

        <div
          className={`flex flex-col sm:ml-5 text-left text-sm sm:text-base leading-4 font-medium pt-2 sm:pt-5`}>
          <Discription {...items} />

          <div className={`flex justify-between`}>
            <h2 className={`sm:text-lg`}>{items.price}</h2>
            <div className={`hidden`}>
              <Counter counter={counter} setCounter={setCounter} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
