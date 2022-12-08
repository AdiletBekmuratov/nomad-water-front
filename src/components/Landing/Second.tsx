import React from 'react';
import { motion } from 'framer-motion';
import bottleDown from '../../assets/lending/DROP_WATER.png';
const downBottleAnimation = {
  hidden: {
    y: -100,
    opacity: 0
  },
  visible: (custom: any) => ({
    transition: { duration: 0.7, delay: custom * 0.3 },
    y: 0,
    opacity: 1
  })
};
const h1Animation = {
  hidden: {
    y: 400,
    opacity: 0
  },
  visible: (custom: any) => ({
    transition: { duration: 1, delay: custom * 0.3 },
    y: 100,
    opacity: 1
  })
};
export const Second = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      custom={3}
      viewport={{ amount: 0.5, once: true }}
      className={`content  `}>
      <div className={`flex flex-col sm:flex-row lg:flex-row px-7 md:px-10 xl:px-24`}>
        <motion.div
          variants={h1Animation}
          className={`z-30 flex flex-col text-start text-base text-dark-blue sm:px-6 lg:py-20 xl:ml-24`}>
          <span className={`opacity-80 text-base xl:text-xl font-bold `}>Наш Опыт</span>
          <h1 className={`text-2xl lg:text-3xl xl:text-4xl font-bold leading-9 sm:py-3 lg:py-7`}>
            Качество проверенное временем
          </h1>
          <span className={`opacity-80 text-xl`}>
            In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to
            demonstrate the visual form of a document or a typeface without relying on meaningful
            content.
          </span>
        </motion.div>
        <motion.img
          viewport={{ amount: 0.5, once: true }}
          variants={downBottleAnimation}
          className={`z-20 w-96 h-auto lg:w-auto mt-12`}
          src={bottleDown}
          alt="bottleDown"
        />
      </div>
    </motion.section>
  );
};
