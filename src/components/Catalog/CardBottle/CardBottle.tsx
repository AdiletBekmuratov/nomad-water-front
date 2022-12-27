import { FC } from 'react';
//import { Link } from 'react-router-dom';
import { AddFavourite } from './AddFavourite';
import { ICard } from '@/assets/types/types';
// import { Description } from './Description';
import { OrderStatus } from '@/components/Catalog/OrderStatus';
import { Button } from '@/components/Forms';

export const CardBottle: FC<ICard> = ({
  isFavourite,
  setIsFavourite,
  items,
  cardType,
  deliveryStatus
}) => {
  return (
    <div
      className={`${
        cardType === 'order' ? 'bg-white' : ''
      } bg-white rounded-3xl relative p-2 shadow-xl`}>
      {cardType === 'catalog' && (
        <AddFavourite isFavourite={isFavourite} setIsFavourite={setIsFavourite} />
      )}
      {/* <Link
        to={`${cardType === 'catalog' ? `/catalog/${items.id}` : '/orderinfo'}`}
        className={`flex ${cardType === 'order' ? 'flex-row' : 'flex-col'} sm:flex-row `}></Link> */}
      <div
        className={`flex gap-3 md:gap-5 text-left p-5
          text-sm sm:text-base lg:text-lg leading-4 font-medium pt-2`}>
        {/* <Description {...items} isOrders={cardType === 'order'} /> */}
        <div className={'bg-white rounded-3xl w-40 h-40 flex items-center justify-center p-2 '}>
          <img src={items.imageUrl} alt="bottle" className="object-contain" />
        </div>
        <div className={`grid grid-cols-1 p-3`}>
          {items.description}
          <h2 className={`sm:text-lg font-semibold sm:mt-0`}>{items.productPrice} T</h2>
          {cardType === 'order' && <OrderStatus variants={deliveryStatus} />}
          <Button className={`w-40 h-12`}>В корзину</Button>
        </div>
      </div>
    </div>
  );
};
