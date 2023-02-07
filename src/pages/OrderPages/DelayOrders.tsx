import { IProduct } from '@/types';
import React, { FC } from 'react';

type Props = {
  delayOrderProduct: IProduct[];
};

const DelayOrders: FC<Props> = ({ delayOrderProduct }) => {
  return (
    <div>
      <div className={`border-b-2 border-dotted border-gray-700 py-2 my-3 `}></div>
      <h2 className={`text-center text-lg font-semibold`}>Отложенные товары</h2>
      <span className="text-justify text-base">
        {' '}
        К сожалению, в данный момент эти товары недоступны к доставке, администрация приносит свои
        извинения и уже работает над изменением ситуации. Как только товар появится, с Вами свяжется
        наш оператор и согласует доставку.{' '}
      </span>

      <div className="grid gap-3 py-3">
        {delayOrderProduct.map((product) => (
          <div
            className={` flex flex-col md:flex-row flex-1 justify-evenly bg-light-blue rounded-lg 
      p-3 text-xs md:text-base gap-2 shadow-lg items-center`}
            key={product.id}>
            <div className={'bg-white rounded-sm  flex items-center justify-center p-2 '}>
              <img
                src={product.imageUrl}
                alt="bottle"
                className={`object-contain w-10 h-10 md:w-20 md:h-20`}
              />
            </div>
            <span className={`text-xs md:text-sm font-semibold `}>{product.productName}</span>
            <span className={`text-xs md:text-sm font-semibold `}>{product.productPrice} T</span>

            <span>
              <strong>Дата обновления: </strong>
              {` ${product?.updatedDate ? product.updatedDate : 'Дата обновления'} `}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DelayOrders;
