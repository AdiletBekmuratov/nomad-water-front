import { FC } from 'react';
import { Link } from 'react-router-dom';
import React from 'react';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { addItem, deleteItem } from '@/redux/slices/cartSlice';
import { ICard } from '@/assets/types/types';

import { Button } from '@/components/Forms';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import {
  useAddFavoriteMutation,
  useDeleteFavoriteMutation,
  useGetUserFavoriteQuery
} from '@/redux/services/user.service';
import { toast } from 'react-hot-toast';
import { useAppSelector, useLocalStorage } from '@/hooks';
import { ICart } from '@/types';

export const CardBottle: FC<ICard> = ({ items }) => {
  const { user = null, isLoading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [cart, setCart] = useLocalStorage<ICart>('cart', { products: [], total: 0 });
  const choice = cart.products ? cart.products.some((item) => item.id === items.id) : false;
  const [isChoice, setIsChoice] = React.useState(choice);
  const { data: favorites = [] } = useGetUserFavoriteQuery();
  const favor = favorites ? favorites.some((item) => item.id === items.id) : false;
  const [isFavorite, setIsFavorite] = React.useState<boolean>(favor);
  const [addFavorite] = useAddFavoriteMutation();
  const [deleteFavorite] = useDeleteFavoriteMutation();

  const onClickAdd = () => {
    let tempCart: ICart = JSON.parse(JSON.stringify(cart));
    tempCart.products ? tempCart.products.push({ ...items, quantity: 1 }) : [];
    dispatch(addItem({ ...items, quantity: 1 }));
    setIsChoice(true);
  };
  const onDeleteItem = () => {
    dispatch(deleteItem(Number(items.id)));
    setIsChoice(false);
  };
  const onClickAddFavorite = async (id: number) => {
    setIsFavorite(true);
    await toast.promise(addFavorite(Number(id)).unwrap(), {
      loading: 'Загрузка...',
      success: 'Добавлен в избранные',
      error: (error) => JSON.stringify(error, null, 2)
    });
  };
  const onDeleteFavorite = async (id: number) => {
    setIsFavorite(false);
    await toast.promise(deleteFavorite(Number(id)).unwrap(), {
      loading: 'Загрузка...',
      success: 'Удален из избранных',
      error: (error) => JSON.stringify(error, null, 2)
    });
  };
  const onClickToast = () => {
    toast.success('Вы не зарегистрированы!');
  };

  return (
    <>
      <div className={`bg-white rounded-3xl p-1 shadow-xl`}>
        <div
          className={`flex text-left justify-between
          text-sm sm:text-base lg:text-lg leading-4 font-medium p-2`}>
          <Link to={`/catalog/${items.id}`}>
            <div className={'bg-white rounded-3xl  flex items-center justify-center p-2 '}>
              <img
                src={items.imageUrl}
                alt="bottle"
                className={`object-contain w-20 h-20 md:w-40 md:h-40`}
              />
            </div>
          </Link>
          <div className={`grid grid-cols-1 pt-2 gap-3`}>
            <Link to={`/catalog/${items.id}`} className={`grid grid-cols-1`}>
              <span className={`text-xs md:text-sm font-semibold `}>{items.productName}</span>
              <span className={`text-xs md:text-sm font-semibold `}>{items.productPrice} T</span>
            </Link>
            <>
              {isChoice ? (
                <Button
                  className={`w-28 md:w-40 h-8 md:h-10 bg-blue-400 text-xs md:text-sm hover:bg-blue-900`}
                  onClick={onDeleteItem}>
                  Убрать из корзины
                </Button>
              ) : (
                <Button
                  className={`w-28 md:w-40 h-8 md:h-10 text-xs md:text-sm hover:bg-blue-900`}
                  onClick={user === null ? onClickToast : onClickAdd}>
                  В корзину
                </Button>
              )}
            </>
          </div>
          <div>
            {isFavorite ? (
              <button onClick={() => onDeleteFavorite(Number(items.id))}>
                <AiFillHeart className={`w-5 h-5 md:w-6 md:h-6 m-2 text-red-600 cursor-pointer`} />
              </button>
            ) : (
              <button
                onClick={user === null ? onClickToast : () => onClickAddFavorite(Number(items.id))}>
                <AiOutlineHeart
                  className={`w-5 h-5 md:w-6 md:h-6 m-2 text-red-600 cursor-pointer`}
                />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
