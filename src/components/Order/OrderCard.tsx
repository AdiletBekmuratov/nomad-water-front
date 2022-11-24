import React, { FC } from 'react';
import { Card } from '../Forms';

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  data: {
    name: string;
    price: number;
    count: number;
  };
};

const infoClass = 'font-montserrat font-normal text-xs text-dark-blue';

export const OrderCard: FC<Props> = (props) => {
  return (
    <div className="w-4/5 mx-auto" key={``}>
      <Card className="mt-6 pr-10">
        <div className="grid grid-cols-3">
          <div className="w-24 h-16 bg-pseudo-white rounded-2xl flex col-span-1">
            <img className="justify-center" src={`../components/Order/bottle.png`} alt={``} />
          </div>
          <div className="col-span-2 ml-4">
            <h6 className={infoClass}>{props.data.name}</h6>
            <h6 className={infoClass}>Количество: {props.data.count}</h6>
            <h6 className={infoClass}>Цена: {props.data.price}</h6>
          </div>
        </div>
      </Card>
    </div>
  );
};
