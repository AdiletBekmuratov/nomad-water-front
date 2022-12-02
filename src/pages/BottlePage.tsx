import React from 'react';
import { CardBottle } from '@/components/Catalog';
import { Header, Layout } from '@/components/Layout';
import { dataBottle } from '@/assets/dataBottle';
import { Button } from '@/components/Forms';
import { Link, useParams } from 'react-router-dom';
import { Counter } from '@/components/Catalog/CardBottle/Counter';

//import heart from '../assets/crm/orderHeart.png';
import bottle2X from '../assets/crm/bottle2X.png';

const BottlePage = () => {
  const { id } = useParams();
  const urlId = parseInt(id);
  const bottle = dataBottle.find((item) => item.id === urlId);
  const [counter, setCounter] = React.useState<number>(1);
  //const [orderNumber, setOrderNumber] = React.useState('');

  // const onClickBuy = () => {
  //   setOrderNumber('283 00' + id);
  //   console.log(orderNumber);
  // };
  return (
    <div className={`w-full bg-gray-200 text-dark-blue`}>
      <Header>
        <>
          <Link to="/catalog" className={`flex items-center`}>
            <svg
              width="7"
              height="14"
              viewBox="0 0 7 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6 1.16668L1.27891 6.67461C1.11841 6.86186 1.11841 7.13816 1.27891 7.32541L6 12.8333"
                stroke="#98A2A5"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <span className="ml-7 font-medium text-base leading-6">К каталогу</span>
          </Link>
        </>
      </Header>
      <Layout className={`flex flex-col space-y-4 text-lg`}>
        <div className={`flex flex-col md:flex-row gap-4`}>
          <div>
            <div className={`relative bg-white rounded-2xl aspect-video`}>
              <img src={bottle2X} alt="bottleXs" className={`object-contain`} />
            </div>
            <div className={`mt-5 flex flex-col items-start sm:bg-white sm:p-5 sm:rounded-2xl`}>
              <h2 className={`font-semibold`}>{bottle.title}</h2>
              <p className={`text-sm opacity-60 sm:mt-4 sm:mb-2`}>{bottle.discription}</p>
              <div className={`text-sm grid grid-cols-2 justify-start gap-x-2`}>
                <span>Доставка:</span>
                <p className={`opacity-60`}>Сегодня до 16:00</p>
                <span>Объем:</span>
                <p className={`opacity-60`}>50 л</p>
              </div>
              {bottle.availability ? (
                <span className={`text-base text-green-color font-semibold `}>В наличии</span>
              ) : (
                <span className={`text-base text-red-600 font-semibold `}>Нет в наличии</span>
              )}
            </div>
          </div>

          <div
            className={`sm:bg-white sm:rounded-3xl mb-auto sm:p-5 sm:flex sm:flex-col flex-grow`}>
            <span className={`text-left text-sm font-semibold opacity-50 block mb-2`}>
              Заказать
            </span>
            <div className={`flex items-center justify-between mb-2`}>
              <h2 className={`text-lg font-semibold`}>{bottle.price} T</h2>
              <Counter counter={counter} setCounter={setCounter} />
            </div>
            <Button className={`py-3 :block`}>Заказать</Button>
          </div>
        </div>

        <div className={`text-lg`}>
          <h2>Рекомендации</h2>
          <div className={`grid gap-x-4 gap-y-6 pt-6 grid-cols-2 sm:grid-cols-1 `}>
            {dataBottle.slice(0, 2).map((items, id) => (
              <CardBottle key={id} items={items} />
            ))}
          </div>
        </div>
      </Layout>
    </div>
  );
};
export default BottlePage;
