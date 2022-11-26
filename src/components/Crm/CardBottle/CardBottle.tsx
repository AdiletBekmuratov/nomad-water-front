import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Counter } from './Counter';
import { AddFavourite } from './AddFavourite';
import { ICard } from '@/types/types';
import { Discription } from './Discription';

export const CardBottle: FC<ICard> = ({
  isFavourite,
  setIsFavourite,
  counter,
  setCounter,
  items
}) => {
  return (
    <div>
      <div className={`flex flex-col sm:flex-row sm:bg-white sm:rounded-3xl relative sm:p-3`}>
        <AddFavourite isFavourite={isFavourite} setIsFavourite={setIsFavourite} />
        <div className={``}>
          <img src={items.img} alt="bottle" />
        </div>

        <Link
          to="/crm/bottlePage"
          className={`flex flex-col sm:ml-5 text-left text-sm sm:text-base lg:text-lg leading-4 font-medium pt-2 sm:py-5`}>
          <Discription {...items} />

          <div className={`flex justify-between`}>
            <h2 className={`sm:text-lg`}>{items.price}</h2>
            <div className={`hidden`}>
              <Counter counter={counter} setCounter={setCounter} />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};
