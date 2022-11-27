import { FC } from 'react';
import { Link } from 'react-router-dom';
import { AddFavourite } from './AddFavourite';
import { ICard } from '@/types/types';
import { Discription } from './Discription';

export const CardBottle: FC<ICard> = ({ isFavourite, setIsFavourite, items }) => {
  return (
    <div>
      <div className={` sm:bg-white sm:rounded-3xl relative sm:p-3`}>
        <AddFavourite isFavourite={isFavourite} setIsFavourite={setIsFavourite} />

        <Link to={`/catalog/${items.id}`} className={`flex flex-col sm:flex-row`}>
          <img src={items.img} alt="bottle" />
          <div
            className={`flex flex-col sm:ml-5 text-left text-sm sm:text-base lg:text-lg leading-4 font-medium pt-2`}>
            <Discription {...items} />
            <h2 className={`sm:text-lg mt-2 sm:mt-0`}>{items.price}</h2>
          </div>
        </Link>
      </div>
    </div>
  );
};
