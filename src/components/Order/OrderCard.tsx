import { useAppSelector } from '@/hooks';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { decrementQuantity, deleteItem, incrementQuantity } from '@/redux/slices/cartSlice';
import { IOrderQuality, IProduct } from '@/types';
import React, { FC, useState } from 'react';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import { Card } from '../Forms';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  data: IProduct & { quantity: number };
};
const mdStyles = 'md:flex md:h-16 md:w-full md:items-end';

const infoClass = 'font-montserrat font-normal text-xs text-dark-blue';
const imgStyle = `absolute top-2 sm:top-5 right-2 sm:right-5 lg:top-5 lg:right-5 
  w-8 h-8 cursor-pointer opacity-50 hover:opacity-100`;

export const OrderCard: FC<Props> = ({ data }) => {
  const dispatch = useAppDispatch();
  const productItem = useAppSelector(
    (state) => state.cart.products.find((item) => item.id === data.id)!
  );

  const onDeleteItem = () => {
    dispatch(deleteItem(Number(data.id)));
  };

  const handleIncrement = () => {
    dispatch(incrementQuantity(Number(data.id)));
  };

  const handleDecrement = () => {
    dispatch(decrementQuantity(Number(data.id)));
  };

  return (
    <div>
      <Card className={`pr-10 md:col-span-3`}>
        <div className={`grid grid-cols-3 md:grid-cols-4 gap-2 `}>
          <TiDeleteOutline
            className={`${imgStyle}`}
            onClick={() => {
              onDeleteItem();
            }}
          />
          <div className={` bg-white flex items-center`}>
            <img className="justify-center" src={data.imageUrl} alt={``} />
          </div>
          <div className={`col-span-2 ml-4 md:col-span-3 `}>
            {data.productName}
            <h2 className={`sm:text-lg font-semibold sm:mt-0`}>{data.productPrice} T</h2>
            <h6 className={`${infoClass}`}>
              Количество: <span className={`md:font-semibold`}>{data.quantity}</span>
            </h6>
            <h6 className={`${infoClass}`}>
              На сумму:{' '}
              <span className={`md:font-semibold`}>
                {productItem.productPrice * productItem.quantity}
              </span>
            </h6>
            <div className={`hidden ${mdStyles}`}>
              <h2 className="text-dark-blue text-base font-montserrat font-medium w-60"></h2>

              <div className={`flex items-center justify-between gap-3 w-40 lg:w-52 `}>
                <button disabled={data.quantity < 2} onClick={handleDecrement}>
                  <AiOutlineMinusCircle
                    className={`w-7 h-7 ${data.quantity < 2 && 'opacity-40'}`}
                  />
                </button>
                <span className={`font-medium text-lg`}>{data.quantity}</span>{' '}
                <button onClick={handleIncrement}>
                  <AiOutlinePlusCircle className={`w-7 h-7`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
