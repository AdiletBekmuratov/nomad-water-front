import { Layout } from '@/components/Layout';
import statisticFrame from '../assets/crm/statisticFrame.png';

const RequestsUser = () => {
  return (
    <Layout>
      <div
        className={`bg-white mb-4 py-5 px-7 lg:px-36 grid 
            md:grid-cols-2 grid-cols-1 items-center justify-center rounded-2xl sm:px-20`}>
        <div className={`flex flex-col items-center  font-semibold md:order-2`}>
          <span className={`text-sm xl:text-lg leading-4 `}>Статистика по продажам</span>
          <div className={`my-4 xl:text-base`}>
            Заработано: <span className={`text-blue-statisticSum`}>74 838 Т</span>
          </div>
        </div>
        <img src={statisticFrame} alt="statisticFrame" />
      </div>
      <h2 className={`text-sm font-semibold xl:text-xl xl:leading-5 xl:font-bold`}>Запросы</h2>
      <div className={`py-5 px-8 my-4 bg-white rounded-2xl`}>
        <div className={`flex justify-between text-sm sm:text-base xl:text-lg font-semibold mb-2`}>
          <h3>Суть запроса</h3>
          <span className={`text-red-600`}>Срочно</span>
        </div>
        <span>Описание запроса. к примеру, отсутствие товаров на складе</span>
      </div>
      <div className={`py-5 px-8 my-4 bg-white rounded-2xl`}>
        <div className={`flex text-sm font-semibold mb-2`}>
          <h3>Жалоба</h3>
        </div>
        <span>Описание запроса. к примеру, отсутствие товаров на складе</span>
      </div>
      <div className={`py-5 px-8 my-4 bg-white rounded-2xl`}>
        <div className={`flex justify-between text-sm font-semibold mb-2`}>
          <h3>Пополнение склада</h3>
          <span className={`text-green-color`}>Выполнено</span>
        </div>
        <span>Описание запроса. к примеру, отсутствие товаров на складе</span>
      </div>
      <div className={`py-5 px-8 my-4 bg-white rounded-2xl`}>
        <div className={`flex justify-between text-sm font-semibold mb-2`}>
          <h3>Ремонт служебной машины</h3>
          <span className={`text-green-color`}>Выполнено</span>
        </div>
        <span>Описание запроса. к примеру, отсутствие товаров на складе</span>
      </div>
      <div className={`py-5 px-8 my-4 bg-white rounded-2xl`}>
        <div className={`flex justify-between text-sm font-semibold mb-2`}>
          <h3>Ремонт служебной машины</h3>
          <span className={`text-green-color`}>Выполнено</span>
        </div>
        <span>Описание запроса. к примеру, отсутствие товаров на складе</span>
      </div>
    </Layout>
  );
};
export default RequestsUser;
