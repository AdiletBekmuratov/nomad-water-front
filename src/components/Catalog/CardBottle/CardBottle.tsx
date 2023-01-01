import { FC } from 'react';

import React from 'react';
import { AddFavourite } from './AddFavourite';
import { ICard } from '@/assets/types/types';

import { OrderStatus } from '@/components/Catalog/OrderStatus';

import { Button } from '@/components/Forms';

import { useAppDispatch } from '@/hooks/useAppDispatch';

import { addItem, deleteItem } from '@/redux/slices/cartSlice';

export const CardBottle: FC<ICard> = ({
  items,
  isFavourite,
  cardType,
  setIsFavourite,
  deliveryStatus
}) => {
  //const cartItems = useAppSelector((state) => state.cart.cartItems);

  const [isChoice, setIsChoice] = React.useState(false);
  const dispatch = useAppDispatch();
  const onClickAdd = () => {
    dispatch(addItem(items));
    setIsChoice(true);
  };
  const onDeleteItem = (id: number) => {
    dispatch(deleteItem(id));
    setIsChoice(false);
  };

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
        <div className={`grid grid-cols-1 gap-1 p-1`}>
          {items.description}
          <h2 className={`sm:text-lg font-semibold sm:mt-0`}>{items.productPrice} T</h2>
          {cardType === 'order' && <OrderStatus variants={deliveryStatus} />}

          {/* <Counter counter={counter} setCounter={setCounter} /> */}

          <div>
            {isChoice ? (
              <Button
                className="w-40 h-10 bg-blue-400 text-sm"
                onClick={() => {
                  onDeleteItem(items.id);
                }}>
                Убрать из корзины
              </Button>
            ) : (
              <Button className="w-40 h-10 text-sm" onClick={onClickAdd}>
                В корзину
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
