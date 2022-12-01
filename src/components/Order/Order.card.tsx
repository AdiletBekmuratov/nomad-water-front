import { FC } from 'react';
import bottle from './bottle.png';

type Props = {
  order: {
    name: string;
    count: number;
    price: number;
    imgUrl?: string;
  };
};

export const Order: FC<Props> = (props) => {
  return (
    <div className="mt-6 flex items-center">
      <img src={bottle} alt="" className="w-24 h-16 object-contain bg-white shadow-lg rounded-lg" />
      <div>
        <p className="font-montserrat text-xs ml-2 text-dark-blue">{props.order.name}</p>
        <p className="font-montserrat text-xs ml-2 text-dark-blue">
          Количество: {props.order.count}
        </p>
        <p className="font-montserrat text-xs ml-2 text-dark-blue">Цена: {props.order.price} Т</p>
      </div>
    </div>
  );
};
