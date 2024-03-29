import {  FC, ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import { useAppSelector, useLocalStorage } from '@/hooks';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { addItem, deleteItem } from '@/redux/slices/cartSlice';
import { addItemDelayOrder, deleteItemDelayOrder, IDelayOrder } from '@/redux/slices/delayOrder';
import {
  useAddFavoriteMutation,
  useDeleteFavoriteMutation,
  useGetUserFavoriteQuery
} from '@/redux/services/user.service';
import { ICart, IProduct } from '@/types';

import { Button } from '@/components/Forms';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

export interface ICard {
  items: IProduct;
  children?: ReactNode;
  className?: string;
  isFavor?: boolean;
  isFavorite?: boolean;
  setIsFavorite?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const CardBottle: FC<ICard> = ({ items }) => {
  const dispatch = useAppDispatch();

  const { user = null, isLoading } = useAppSelector((state) => state.auth);
  const { data: favorites = [] } = useGetUserFavoriteQuery();
  //корзина
  const [cart, setCart] = useLocalStorage<ICart>('cart', { products: [], total: 0 });
  const choice = cart.products ? cart.products.some((item) => item.id === items.id) : false;
  const [isChoice, setIsChoice] = useState(choice);
  //отложенные заказы
  const [delayOrder, setDelayOrder] = useLocalStorage<IDelayOrder>('delayOrder', { products: [] });
  const choiceDelayOrder = delayOrder.products
    ? delayOrder.products.some((item) => item.id === items.id)
    : false;
  const [isChoiceDelay, setIsChoiceDelay] = useState(choiceDelayOrder);
  //избранные
  const favor = favorites ? favorites.some((item) => item.id === items.id) : false;
  const [isFavorite, setIsFavorite] = useState<boolean>(favor);
  const [addFavorite] = useAddFavoriteMutation();
  const [deleteFavorite] = useDeleteFavoriteMutation();
  //корзина ADD
  const onClickAdd = () => {
    let tempCart: ICart = JSON.parse(JSON.stringify(cart));
    tempCart.products ? tempCart.products.push({ ...items, quantity: 1 }) : [];
    dispatch(addItem({ ...items, quantity: 1 }));
    setIsChoice(true);
  };
  //корзина DELETE
  const onDeleteItem = () => {
    dispatch(deleteItem(Number(items.id)));
    setIsChoice(false);
  };
  //отложенные заказы ADD
  const onAddDelayOrder = () => {
    let tempCart: IDelayOrder = JSON.parse(JSON.stringify(delayOrder));
    tempCart.products ? tempCart.products.push({ ...items }) : [];
    dispatch(addItemDelayOrder({ ...items }));
    setIsChoiceDelay(true);
    toast.success('Заявка оставлена, мы Вам сообщим, когда товар появится на складе.');
  };
  //отложенные заказы DELETE
  const onDeleteDelayOrder = () => {
    dispatch(deleteItemDelayOrder(Number(items.id)));
    setIsChoiceDelay(false);
  };
  //избранные ADD
  const onClickAddFavorite = async (id: number) => {
    setIsFavorite(true);
    await toast.promise(addFavorite(Number(id)).unwrap(), {
      loading: 'Загрузка...',
      success: 'Добавлен в избранные',
      error: (error) => JSON.stringify(error, null, 2)
    });
  };
  //избранные  DELETE
  const onDeleteFavorite = async (id: number) => {
    setIsFavorite(false);
    await toast.promise(deleteFavorite(Number(id)).unwrap(), {
      loading: 'Загрузка...',
      success: 'Удален из избранных',
      error: (error) => JSON.stringify(error, null, 2)
    });
  };
  const onClickToast = () => {
    toast.success('Пожалуйста авторизуйтесь либо зарегистрируйтесь!');
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
              {!items.inWarehouse ? (
                isChoiceDelay ? (
                  <Button
                    className={`w-32 md:w-48 h-8 md:h-10 text-xs md:text-sm bg-blue-700 hover:bg-blue-900`}
                    onClick={onDeleteDelayOrder}>
                    Убрать из отложенных
                  </Button>
                ) : (
                  <Button
                    className={`w-32 md:w-40 h-8 md:h-10 text-xs md:text-sm bg-blue-700 hover:bg-blue-900`}
                    onClick={user === null ? onClickToast : onAddDelayOrder}>
                    На заказ
                  </Button>
                )
              ) : isChoice ? (
                <Button
                  className={`w-32 md:w-40 h-8 md:h-10 bg-blue-400 text-xs md:text-sm hover:bg-blue-900`}
                  onClick={onDeleteItem}>
                  Убрать из корзины
                </Button>
              ) : (
                <Button
                  className={`w-32 md:w-40 h-8 md:h-10 text-xs md:text-sm hover:bg-blue-900`}
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
