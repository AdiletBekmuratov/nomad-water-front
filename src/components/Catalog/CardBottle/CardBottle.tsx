import { FC } from 'react';

import React from 'react';
import { AddFavourite } from './AddFavourite';
import { ICard } from '@/assets/types/types';

import { OrderStatus } from '@/components/Catalog/OrderStatus';

import { Button } from '@/components/Forms';

import { useAppDispatch } from '@/hooks/useAppDispatch';

import { addItem, deleteItem } from '@/redux/slices/cartSlice';
import { Modal } from '@/components/Layout/Modal';

export const CardBottle: FC<ICard> = ({
  items,
  isFavourite,

  setIsFavourite
}) => {
  //const cartItems = useAppSelector((state) => state.cart.cartItems);
  const [openModal, setOpenModal] = React.useState(false);
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
    <>
      <div
        className={`bg-white rounded-3xl relative p-1 shadow-xl cursor-pointer`}
        onClick={() => setOpenModal(true)}>
        <AddFavourite isFavourite={isFavourite} setIsFavourite={setIsFavourite} />

        <div
          className={`flex gap-3 md:gap-5 text-left p-5
          text-sm sm:text-base lg:text-lg leading-4 font-medium pt-2`}>
          <div className={'bg-white rounded-3xl w-40 h-40 flex items-center justify-center p-2 '}>
            <img src={items.imageUrl} alt="bottle" className="object-contain" />
          </div>
          <div className={`grid grid-cols-1 gap-1 p-1`}>
            {items.productName}
            <h2 className={`sm:text-lg font-semibold sm:mt-0`}>{items.productPrice} T</h2>
            {/* {cardType === 'order' && <OrderStatus variants={deliveryStatus} />} */}

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
      <Modal isOpenModal={openModal} setIsOpenModal={setOpenModal} className={`bg-gray-100 `}>
        <h2 className={`font-semibold text-center pb-3`}>{items?.productName}</h2>
        <div className={`grid grid-cols-2 gap-3`}>
          <div>
            <img src={items?.imageUrl} alt="bottleXs" className={``} />
            <div className={`mt-5 flex flex-col items-start sm:bg-white sm:p-5 sm:rounded-2xl`}>
              <div className={`text-sm grid grid-cols-2 justify-start gap-x-2`}>
                <span>Доставка:</span>
                <p className={`opacity-60`}>Сегодня до 20:00</p>
              </div>
              <div>
                <span>Наличие товара:</span>
                <p className={`text-base text-green-color font-semibold `}>В наличии</p>
              </div>
            </div>
          </div>

          <div
            className={`sm:bg-white sm:rounded-2xl mb-auto sm:p-2 sm:flex sm:flex-col flex-grow`}>
            <h2 className={`font-semibold`}>{items?.productName}</h2>
            <span className={`text-left text-sm font-semibold opacity-50 block mb-2`}>
              {items.description}
            </span>
          </div>
        </div>
      </Modal>
    </>
  );
};
