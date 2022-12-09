import { dataBottle } from '@/assets/dataBottle';
import { CardBottle } from '@/components/Catalog/CardBottle/CardBottle';
import { Counter } from '@/components/Catalog/CardBottle/Counter';
import { Button } from '@/components/Forms';
import { Layout } from '@/components/Layout';
import React from 'react';
import { Link, useParams } from 'react-router-dom';

import bottleX from '../assets/crm/bottle2X.png';

const BottlePage = () => {
  const { id } = useParams();
  const urlId = parseInt(id ?? '1');
  const bottle = dataBottle.find((item) => item.id === urlId);
  const [counter, setCounter] = React.useState<number>(1);

  return (
    <Layout className={`flex flex-col space-y-4 text-lg`}>
      <div className={`flex flex-col md:flex-row gap-4`}>
        <div>
          <div className={` bg-white rounded-2xl aspect-video`}>
            <img src={bottleX} alt="bottleXs" className={`object-contain`} />
          </div>
          <div className={`mt-5 flex flex-col items-start sm:bg-white sm:p-5 sm:rounded-2xl`}>
            <h2 className={`font-semibold`}>{bottle?.title}</h2>
            <p className={`text-sm opacity-60 sm:my-3`}>{bottle?.description}</p>
            <div className={`text-sm grid grid-cols-2 justify-start gap-x-2`}>
              <span>Доставка:</span>
              <p className={`opacity-60`}>Сегодня до 16:00</p>
              <span>Объем:</span>
              <p className={`opacity-60`}>50 л</p>
            </div>
            {bottle?.availability ? (
              <span className={`text-base text-green-color font-semibold `}>В наличии</span>
            ) : (
              <span className={`text-base text-red-600 font-semibold `}>Нет в наличии</span>
            )}
          </div>
        </div>

        <div className={`sm:bg-white sm:rounded-3xl mb-auto sm:p-5 sm:flex sm:flex-col flex-grow`}>
          <span className={`text-left text-sm font-semibold opacity-50 block mb-2`}>Заказать</span>
          <div className={`flex items-center justify-between mb-2`}>
            <h2 className={`text-lg font-semibold`}>{bottle?.price} T</h2>
            <Counter counter={counter} setCounter={setCounter} />
          </div>
          <Link to="/order">
            <Button className={`py-3 :block`}>Заказать</Button>
          </Link>
        </div>
      </div>

      <div className={`text-lg`}>
        <h2>Рекомендации</h2>
        <div className={`grid gap-x-4 gap-y-6 pt-6 grid-cols-2 sm:grid-cols-1 `}>
          {dataBottle.slice(0, 2).map((items, id) => (
            <CardBottle cardType="catalog" key={id} items={items} />
          ))}
        </div>
      </div>
    </Layout>
  );
};
export default BottlePage;
