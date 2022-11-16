import React from 'react';
import { motion } from 'framer-motion';

import bottleX from '../assets/2l.png';
import bottleXl from '../assets/5l.png';
import bottle2Xl from '../assets/8l.png';

import astana from '../assets/astana2.png';

const data = [
  {
    id: 1,
    titleLeft: '4000+ клиентов',
    textLeft:
      'Описание характеристики с каким-то подверждением. Описание характеристики с каким-то подверждением.',
    titleRight: 'быстрая доставка',
    textRight:
      'Описание характеристики с каким-то подверждением. Описание характеристики с каким-то подверждением.',
    button: 'false',
    img: bottleX
  },
  {
    id: 2,
    titleLeft: 'качество фильтрации',
    textLeft:
      'Описание характеристики с каким-то подверждением. Описание характеристики с каким-то подверждением.',
    titleRight: 'полезные элементы',
    textRight:
      'Описание характеристики с каким-то подверждением. Описание характеристики с каким-то подверждением.',
    button: 'false',
    img: bottleXl
  },
  {
    id: 3,
    titleLeft: 'Большой выбор',
    textLeft:
      'Описание характеристики с каким-то подверждением. Описание характеристики с каким-то подверждением.',
    titleRight: '',
    textRight: '',
    button: 'true',
    img: bottle2Xl
  }
];
const astanaAnimation = {
  hidden: {
    x: 0,
    opacity: 1
  },
  visible: {
    transition: { duration: 2.5, delay: 0.3 },
    x: -1200,
    opacity: 0
  }
};

export const About = () => {
  return (
    <div className={`snap-y `}>
      {data.map((cart) => (
        <motion.div
          key={cart.id}
          className={`snap-start bg-light-blue text-dark-blue h-screen w-full relative px-7`}>
          <motion.div className={`absolute top-20 r-2 overflow-x-hidden`}>
            <motion.img
              whileInView="visible"
              custom={3}
              viewport={{ amount: 0.1 }}
              variants={astanaAnimation}
              className={``}
              src={astana}
              alt="astanahub"
            />
          </motion.div>
          <motion.div
            className={`flex w-full text-base pt-44 items-center leading-relaxed tracking-wide`}>
            <motion.div className={`w-64 h-44  ml-48 text-right`}>
              <h2 className={`text-2xl font-bold mb-5`}>{cart.titleLeft}</h2>
              <span>{cart.textLeft}</span>
            </motion.div>
            <motion.img className={`mx-auto `} src={cart.img} alt="bottleX" />
            <motion.div className={`w-64 h-44  mr-48 text-left `}>
              <h2 className={`text-2xl font-bold mb-5`}> {cart.titleRight}</h2>
              <span>{cart.textRight}</span>
            </motion.div>
          </motion.div>
        </motion.div>
      ))}
      {/* <motion.div
        className={`snap-start bg-light-blue text-dark-blue h-screen w-full relative px-7`}>
        <motion.div className={`absolute top-20 r-2 overflow-x-hidden`}>
          <motion.img
            whileInView="visible"
            custom={3}
            viewport={{ amount: 0.1 }}
            variants={astanaAnimation}
            className={``}
            src={astana}
            alt="astanahub"
          />
        </motion.div>
        <motion.div
          className={`flex w-full text-base pt-44 items-center leading-relaxed tracking-wide`}>
          <motion.div className={`w-64 h-44  ml-48 text-right`}>
            <h2 className={`text-2xl font-bold mb-5`}>4000+ клиентов</h2>
            <span>
              Описание характеристики с каким-то подверждением. Описание характеристики с каким-то
              подверждением.
            </span>
          </motion.div>
          <motion.img className={`mx-auto `} src={bottleX} alt="bottleX" />
          <motion.div className={`w-64 h-44  mr-48 text-left `}>
            <h2 className={`text-2xl font-bold mb-5`}> быстрая доставка</h2>
            <span>
              Описание характеристики с каким-то подверждением. Описание характеристики с каким-то
              подверждением.
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
      <motion.div
        className={`snap-start bg-light-blue text-dark-blue h-screen w-full relative px-7`}>
        <motion.div className={`absolute top-20 r-2 overflow-x-hidden`}>
          <motion.img
            whileInView="visible"
            custom={3}
            viewport={{ amount: 0.1 }}
            variants={astanaAnimation}
            className={``}
            src={astana}
            alt="astanahub"
          />
        </motion.div>
        <motion.div
          className={`flex w-full text-base pt-44 items-center leading-relaxed tracking-wide`}>
          <motion.div className={`w-64 h-44  ml-48 text-right`}>
            <h2 className={`text-2xl font-bold mb-5`}>4000+ клиентов</h2>
            <span>
              Описание характеристики с каким-то подверждением. Описание характеристики с каким-то
              подверждением.
            </span>
          </motion.div>
          <motion.img className={`mx-auto `} src={bottleX} alt="bottleX" />
          <motion.div className={`w-64 h-44  mr-48 text-left `}>
            <h2 className={`text-2xl font-bold mb-5`}> быстрая доставка</h2>
            <span>
              Описание характеристики с каким-то подверждением. Описание характеристики с каким-то
              подверждением.
            </span>
          </motion.div>
        </motion.div>
      </motion.div> */}
    </div>
  );
};
