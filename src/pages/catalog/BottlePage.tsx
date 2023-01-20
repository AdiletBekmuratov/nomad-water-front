import React from 'react';
import { Link, useParams } from 'react-router-dom';

import { useGetAllProductsQuery } from '@/redux/services/base.service';
import { IProduct } from '@/types';

import { CardBottle } from '@/pages/catalog/CardBottle';
import { Button } from '@/components/Forms';
import { Layout } from '@/components/Layout';
import Loader from '@/components/Landing/Loader';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { addItem, deleteItem } from '@/redux/slices/cartSlice';
import { useAppSelector } from '@/hooks';
import { toast } from 'react-hot-toast';

const BottlePage = () => {
  const { user = null} = useAppSelector((state) => state.auth);
  const { id } = useParams();
  const { data = [], isLoading } = useGetAllProductsQuery();
  //const product = data?.map((item: IProduct) => item);
  const urlId: number = parseInt(id ?? '1');
  const product = data.find((item: IProduct) => item.id === urlId);
  const [isChoice, setIsChoice] = React.useState(false);
  const dispatch = useAppDispatch();
  const onClickAdd = () => {
    //@ts-ignore
    dispatch(addItem(product));
    setIsChoice(true);
  };
  const onDeleteItem = (id: number) => {
    dispatch(deleteItem(id));
    setIsChoice(false);
  };
  const onClickToast =  () => {
    toast.success('Вы не зарегистрированы!');
  };
  if (isLoading) {
    return <Loader />;
  }
  return (
    <Layout className={`flex flex-col space-y-4 text-lg`}>
      <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4`}>
        <div className={`grid grid-cols-1 gap-2`}>
          <div className={` bg-white rounded-2xl p-3 flex items-center justify-center`}>
            <img src={product?.imageUrl} className={``} alt="bottleXs" />
          </div>
          <div className={`grid grid-cols-1 items-center justify-center`}>
            <>
              {isChoice ? (
                <Button
                  className=" bg-blue-400 text-sm"
                  onClick={() => {
                    onDeleteItem(Number(product?.id));
                  }}>
                  Убрать из корзины
                </Button>
              ) : (
                <Button className={` text-sm `} onClick={user === null ? onClickToast : onClickAdd}>
                  В корзину
                </Button>
              )}
            </>
          </div>
        </div>

        <div className={`sm:bg-white sm:rounded-3xl mb-auto sm:flex sm:flex-col flex-grow`}>
          <div className={`flex flex-col items-start sm:bg-white sm:p-7 sm:rounded-2xl`}>
            <h2 className={`font-semibold`}>{product?.productName}</h2>
            <p className={`text-sm opacity-60 sm:my-3`}>{product?.description}</p>
            <div className={` flex flex-col items-start sm:bg-white  sm:rounded-2xl`}>
              <div className={`text-sm grid grid-cols-2 items-center gap-x-2`}>
                <span>Цена:</span>
                <p className={`font-medium`}>
                  {product?.productPrice}
                  {` `}T
                </p>
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
        </div>
      </div>

      <div className={`text-lg`}>
        <h2>Рекомендации</h2>
        <div className={`grid gap-x-4 gap-y-6 pt-6 sm:grid-cols-2 grid-cols-1 `}>
          {data.slice(0, 2).map((items) => (
            <CardBottle key={items.id} items={items} />
          ))}
        </div>
      </div>
    </Layout>
  );
};
export default BottlePage;
