import { IProduct } from '@/types';
import React, { FC, useState, useEffect } from 'react';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import { Card } from '../Forms';

type Props = React.HTMLAttributes<HTMLDivElement> & {
  data: IProduct;
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
};

const mdStyles = 'md:flex md:h-16 md:w-full md:items-end';

const infoClass = 'font-montserrat font-normal text-xs text-dark-blue';

export const OrderCard: FC<Props> = ({ data, count, setCount, setTotal }) => {
  return (
    <div>
      <Card className={`mt-6 pr-10 md:col-span-3`}>
        <div className={`grid grid-cols-3 md:grid-cols-4 `}>
          <div
            className={`w-24 h-16 md:h-32 md:w-40 mx-auto bg-pseudo-white rounded-2xl flex col-span-1`}>
            <img className="justify-center" src={data.imageUrl} alt={``} />
          </div>
          <div className={`col-span-2 ml-4 md:col-span-3 `}>
            {data.description}
            <h2 className={`sm:text-lg font-semibold sm:mt-0`}>{data.productPrice} T</h2>
            <h6 className={`${infoClass}`}>
              Количество: <span className={`md:font-semibold`}>{count}</span>
            </h6>

            <div className={`hidden ${mdStyles}`}>
              <h2 className="text-dark-blue text-base font-montserrat font-medium w-60">
                {/* {total + ' Т'} */}
              </h2>
              {/* <div className="w-full h-9 flex justify-end items-center">
                <button
                  className="w-9 h-9 rounded-full border-2 font-montserrat"
                  onClick={() => {
                    handleCount('-');
                  }}>
                  -
                </button>
                <span className="w-10 text-center">{count}</span>
                <button
                  className="w-9 h-9 rounded-full border-2 font-montserrat"
                  onClick={() => {
                    handleCount('+');
                  }}>
                  +
                </button>
              </div> */}
              <div className={`flex items-center justify-between gap-3 w-40 lg:w-52 `}>
                <button disabled={count < 2} onClick={() => setCount(--count)}>
                  <AiOutlineMinusCircle className={`w-8 h-8 ${count < 2 && 'opacity-40'}`} />
                </button>
                <span className={`font-medium text-lg`}>{count}</span>{' '}
                <button
                  onClick={() => {
                    setCount(++count);
                    setTotal(data.productPrice * count);
                  }}>
                  <AiOutlinePlusCircle className={`w-8 h-8`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

{
  /* <div className={`flex items-center justify-between gap-3 w-40 lg:w-52 `}>
            <button
              onClick={() => (items ? items.quantity : 1) + 1}
              disabled={(items.quantity ? items.quantity : 1) < 2}>
              <AiOutlineMinusCircle
                className={`w-8 h-8 ${(items.quantity ? items.quantity : 1) < 2 && 'opacity-40'}`}
              />
            </button>
            <span className={`font-medium text-lg`}>{items.quantity ? items.quantity : 1}</span>{' '}
            <button onClick={() => (items.quantity ? items.quantity : 1) + 1}>
              <AiOutlinePlusCircle className={`w-8 h-8`} />
            </button>
          </div> */
}
