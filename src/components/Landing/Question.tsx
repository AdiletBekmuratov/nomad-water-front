import { FaInstagram, FaTelegramPlane, FaWhatsapp } from 'react-icons/fa';
import FaqComp from './FaqComp';

export const Question = () => {
  return (
    <section className={`content flex flex-col`}>
      <div
        className={` text-dark-blue flex flex-1 flex-col pt-24 lg:pt-32 pb-8 lg:pb-16 mx-16 sm:mx-32 md:mx-64 lg:px-16  xl:mx-96`}>
        <FaqComp header="Появился вопрос? Мы всегда готовы вам помочь!" />
      </div>

      <footer
        className={`grid grid-cols-1 lg:grid-cols-2 px-7 xl:px-48 lg:px-10 py-5 lg:py-7 
        bg-footer-color text-white text-sm lg:text-base font-bold leading-4 lg:leading-5 `}>
        <div
          className={` grid grid-flow-col grid-rows-2 gap-3 lg:gap-3 lg:grid-rows-3 mb-2 text-center lg:text-left`}>
          <a href="/">Акции</a>
          <a href="https://demo.nomad-water.kz/catalog">Каталог</a>
          <a href="/">Пункты приема</a>
          <a href="/">Новости</a>
          <a href="/">Партнерам</a>
          <a href="/">Карьера</a>
          <a href="/">FAQ</a>
          <a href="/">Политика приватности</a>
        </div>
        <div className={`flex flex-col items-left font-medium lg:mx-24 xl:mx-36`}>
          <span className={`text-center lg:text-left`}>Контакты</span>
          <div
            className={`flex justify-between lg:flex-col my-1 lg:my-4  leading-6 tracking-widest`}>
            <a href="tel:+77750001415">+7 (775) 000 1415</a>
            <a href="tel:+77292441414">+7 (7292) 44-14-14</a>
          </div>
          <div className={`flex justify-between mx-4 lg:mx-0`}>
            <a href="https://telegram.me/NomadWater_Bot">
              <FaTelegramPlane className={`w-6 h-6 cursor-pointer`} />
            </a>
            <a href="https://wa.me/7750001415">
              <FaWhatsapp className={`w-6 h-6 cursor-pointer`} />
            </a>
            <a href="http://www.instagram.com/nomad.water.aktau/">
              <FaInstagram className={`w-6 h-6 cursor-pointer`} />
            </a>
          </div>
        </div>
      </footer>
    </section>
  );
};
