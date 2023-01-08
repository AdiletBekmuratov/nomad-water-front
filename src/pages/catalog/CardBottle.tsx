import { FC } from 'react';
import { Link } from 'react-router-dom';
import React from 'react';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { addItem, deleteItem } from '@/redux/slices/cartSlice';
import { ICard } from '@/assets/types/types';

import { Button } from '@/components/Forms';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

export const CardBottle: FC<ICard> = ({ items }) => {
  //const cartItems = useAppSelector((state) => state.cart.cartItems);

  const [isChoice, setIsChoice] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState<boolean>(false);
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
      <div className={`bg-white rounded-3xl p-1 shadow-xl`}>
        <div
          className={`flex text-left  justify-between
          text-sm sm:text-base lg:text-lg leading-4 font-medium p-2`}>
          <Link to={`/catalog/${items.id}`}>
            <div className={'bg-white rounded-3xl w-40 h-40 flex items-center justify-center p-2 '}>
              <img src={items.imageUrl} alt="bottle" className="object-contain" />
            </div>
          </Link>
          <div className={`grid grid-cols-1 pt-2`}>
            <Link to={`/catalog/${items.id}`} className={`grid grid-cols-1`}>
              {items.productName}
              <span className={`text-lg font-semibold `}>{items.productPrice} T</span>
            </Link>
            <>
              {isChoice ? (
                <Button
                  className="w-40 h-10 bg-blue-400 text-sm"
                  onClick={() => {
                    onDeleteItem(items.id);
                  }}>
                  Убрать из корзины
                </Button>
              ) : (
                <Button className={`w-28 md:w-40 h-10 text-sm `} onClick={onClickAdd}>
                  В корзину
                </Button>
              )}
            </>
          </div>
          <div>
            {isFavorite ? (
              <button onClick={() => setIsFavorite(false)}>
                <AiFillHeart className={`w-6  h-6 m-2  cursor-pointer`} />
              </button>
            ) : (
              <button onClick={() => setIsFavorite(true)}>
                <AiOutlineHeart className={`w-6  h-6 m-2  cursor-pointer`} />
              </button>
            )}
          </div>
        </div>
      </div>
      {/* <Modal isOpenModal={openModal} setIsOpenModal={setOpenModal} className={`bg-gray-200`}>
        <h2 className={`font-semibold text-center pb-3`}>{items?.productName}</h2>
        <div className={`grid grid-cols-2 gap-3`}>
          <div>
            <div className={`bg-white flex items-center justify-center rounded-lg`}>
              <img src={items?.imageUrl} alt="bottleXs" className={``} />
            </div>

            <div className={`mt-5 flex flex-col items-start sm:bg-white sm:p-5 sm:rounded-2xl`}>
              <div className={`text-sm grid grid-cols-2 items-center gap-x-2`}>
                <span>Цена:</span>
                <p className={`font-medium`}>{items.productPrice}</p>
              </div>
              <div className={`text-sm grid grid-cols-2 items-center gap-x-2`}>
                <span>Доставка:</span>
                <p className={``}>Сегодня до 20:00</p>
              </div>
              <div className={`text-sm grid grid-cols-2 items-center gap-x-2`}>
                <span>Наличие товара:</span>
                <p className={`text-base text-green-color font-semibold `}>В наличии</p>
              </div>
            </div>
          </div>

          <div
            className={`sm:bg-white sm:rounded-2xl mb-auto sm:p-3 sm:flex sm:flex-col flex-grow`}>
            <h2 className={`font-semibold`}>{items?.productName}</h2>
            <span className={`text-left text-sm font-semibold opacity-50 block mb-2`}>
              {items.description}
            </span>
          </div>
        </div>
        <div className="flex justify-center items-center pt-4">
          {isChoice ? (
            <Button
              className="w-40 h-10 bg-blue-400 text-sm"
              onClick={() => {
                onDeleteItem(items.id);
              }}>
              Убрать из корзины
            </Button>
          ) : (
            <Button className={`w-28 md:w-40 h-10 text-sm `} onClick={onClickAdd}>
              В корзину
            </Button>
          )}
        </div>
      </Modal> */}
    </>
  );
};
