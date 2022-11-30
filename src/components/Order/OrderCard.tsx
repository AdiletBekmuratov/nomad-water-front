import React, { FC, useState, useEffect } from 'react';
import { Card } from '../Forms';

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  data: {
    name: string;
    price: number;
    count: number;
  };
  id: number;
  count?: number;
  handeCounts?: any;
};

const mdStyles = 'md:flex md:h-16 md:w-full md:items-end';

const infoClass = 'font-montserrat font-normal text-xs text-dark-blue';

export const OrderCard: FC<Props> = (props) => {
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setCount(props.count);
  }, []);

  useEffect(() => {
    setTotal(count * props.data.price);
    props.handeCounts(count, props.id);
  }, [count]);

  const handleCount = (argument: string) => {
    switch (argument) {
      case '+':
        return setCount(count + 1);
      case '-':
        return setCount(count - 1);
      default:
        break;
    }
  };

  return (
    <div className="w-4/5 md:w-11/12 md:h-44 mx-auto" key={``}>
      <Card className="mt-6 pr-10 md:col-span-3 ">
        <div className="grid grid-cols-3 md:grid-cols-4 ">
          <div className="w-24 h-16 md:h-32 md:w-40 mx-auto bg-pseudo-white rounded-2xl flex col-span-1">
            <img className="justify-center" src={`../components/Order/bottle.png`} alt={``} />
          </div>
          <div className="col-span-2 ml-4 md:col-span-3 ">
            <h6 className={`${infoClass} md:font-medium md:text-sm`}>{props.data.name}</h6>
            <h6 className={`${infoClass}`}>
              Количество: <span className="md:font-semibold">{count}</span>
            </h6>
            <h6 className={infoClass}>
              Цена: <span className="md:font-semibold">{props.data.price} T</span>
            </h6>
            <div className={`hidden ${mdStyles}`}>
              <h2 className="text-dark-blue text-base font-montserrat font-medium w-60">
                {total + ' Т'}
              </h2>
              <div className="w-full h-9 flex justify-end items-center">
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
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
