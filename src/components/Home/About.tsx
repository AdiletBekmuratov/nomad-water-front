import React from 'react';
import { motion } from 'framer-motion';

import bottleX from '../../assets/2l.png';
import bottleXl from '../../assets/5l.png';
import bottle2Xl from '../../assets/8l.png';

import astana from '../../assets/astana2.png';

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
    transition: { duration: 1.5, delay: 0.1 },
    x: -1200,
    opacity: 0
  }
};
const textAnimation = {
  hidden: {
    y: 100,
    opacity: 0
  },
  visible: {
    transition: { duration: 1.5 },
    y: 0,
    opacity: 1
  }
};
const bottleAnimation = {
  hidden: {
    x: 0,
    opacity: 0
  },
  visible: {
    transition: { duration: 1, delay: 1 },
    x: -75,
    opacity: 1
  }
};

export const About = () => {
  return (
    <motion.section className={`w-full h-screen snap-start `}>
      {data.map((item) => (
        <motion.div
          key={item.id}
          className={`snap-start bg-light-blue text-dark-blue h-screen w-full relative px-7`}>
          <motion.div className={`absolute top-0 r-2 overflow-x-hidden`}>
            <motion.img
              whileInView="visible"
              custom={3}
              viewport={{ amount: 0.1 }}
              variants={astanaAnimation}
              src={astana}
              alt="astanahub"
            />
          </motion.div>
          <motion.img
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.5 }}
            variants={bottleAnimation}
            className={`absolute top-32 left-1/2 w-1/7 h-1/7
              `}
            src={item.img}
            alt="bottleX"
          />
          <motion.div
            className={`flex w-full text-base  pt-64 items-center leading-relaxed tracking-wide`}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.5 }}
              variants={textAnimation}
              className={`w-72 h-44  mx-auto text-right`}>
              <h2 className={`text-2xl font-bold mb-5`}>{item.titleLeft}</h2>
              <span className={`w-32`}>{item.textLeft}</span>
              {item.id === 3 && (
                <a
                  href="/"
                  type="button"
                  className={`mt-5 px-5 py-3 rounded-3xl leading-7 tracking-widest 
                  border text-base border-dark-blue hover:bg-medium-blue text-center`}>
                  открыть каталог
                </a>
              )}
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.5 }}
              variants={textAnimation}
              className={`w-64 h-44 mx-auto text-left `}>
              <h2 className={`text-2xl font-bold mb-5`}> {item.titleRight}</h2>
              <span className={`w-44`}>{item.textRight}</span>
            </motion.div>
          </motion.div>
        </motion.div>
      ))}
    </motion.section>
  );
};
