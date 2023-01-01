import { useAppDispatch } from '@/hooks/useAppDispatch';
import { deleteItem } from '@/redux/slices/cartSlice';
import { IProduct } from '@/types';
import React, { FC, useEffect, useState } from 'react';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';
import { Card } from '../Forms';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  data: IProduct;
  count: number;
  initialTotal: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
};

const mdStyles = 'md:flex md:h-16 md:w-full md:items-end';

const infoClass = 'font-montserrat font-normal text-xs text-dark-blue';
const imgStyle =
  'absolute top-2 sm:top-5 right-2 sm:right-5 lg:top-5 lg:right-5 w-8 h-8 cursor-pointer opacity-50 hover:opacity-100';

export const OrderCard: FC<Props> = ({ data, setCount, setTotal }) => {
  const dispatch = useAppDispatch();
  const onDeleteItem = (id: number) => {
    dispatch(deleteItem(id));
  };

  let [localCount, setLocalCount] = useState(1);
  const [localSum, setLocalSum] = useState(data.productPrice * localCount);
  useEffect(() => {
    setTotal(localSum);
  }, [localCount]);

  return (
    <div>
      <Card className={`pr-10 md:col-span-3`}>
        <div className={`grid grid-cols-3 md:grid-cols-4 `}>
          <TiDeleteOutline
            className={`${imgStyle}`}
            onClick={() => {
              onDeleteItem(data.id);
            }}
          />
          <div
            className={`w-24 h-16 md:h-32 md:w-40 mx-auto bg-pseudo-white rounded-2xl flex col-span-1`}>
            <img className="justify-center" src={data.imageUrl} alt={``} />
          </div>
          <div className={`col-span-2 ml-4 md:col-span-3 `}>
            {data.description}
            <h2 className={`sm:text-lg font-semibold sm:mt-0`}>{data.productPrice} T</h2>
            <h6 className={`${infoClass}`}>
              Количество: <span className={`md:font-semibold`}>{localCount}</span>
            </h6>
            <h6 className={`${infoClass}`}>
              На сумму: <span className={`md:font-semibold`}>{localSum}</span>
            </h6>
            <div className={`hidden ${mdStyles}`}>
              <h2 className="text-dark-blue text-base font-montserrat font-medium w-60"></h2>

              <div className={`flex items-center justify-between gap-3 w-40 lg:w-52 `}>
                <button
                  disabled={localCount < 2}
                  onClick={() => {
                    setLocalCount(--localCount);
                    setCount(localCount);
                    setLocalSum(data.productPrice * localCount);
                    setTotal(localSum);
                  }}>
                  <AiOutlineMinusCircle className={`w-7 h-7 ${localCount < 2 && 'opacity-40'}`} />
                </button>
                <span className={`font-medium text-lg`}>{localCount}</span>{' '}
                <button
                  onClick={() => {
                    setLocalCount(++localCount);
                    setCount(localCount);
                    setLocalSum(data.productPrice * localCount);
                    setTotal(localSum);
                  }}>
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
