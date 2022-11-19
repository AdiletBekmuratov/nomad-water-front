import React from 'react';
import { motion } from 'framer-motion';
import bottleDown from '../../assets/DROP_WATER.png';
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
    y: 150,
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
      className={`content flex flex-col lg:flex-row px-7 lg:px-28 `}>
      <motion.div
        variants={h1Animation}
        className={`z-30 text-start text-base text-dark-blue py-4 lg:py-32 lg:mr-36 lg:ml-20`}>
        <span className={`opacity-80 text-base font-bold `}>Наш Опыт</span>
        <h1 className={`text-4xl font-bold leading-9 py-7`}>Качество проверенное временем</h1>
        <span className={`opacity-80`}>
          In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to
          demonstrate the visual form of a document or a typeface without relying on meaningful
          content.
        </span>
      </motion.div>
      <motion.img
        viewport={{ amount: 0.5, once: true }}
        variants={downBottleAnimation}
        className={`z-20 `}
        src={bottleDown}
        alt="bottleDown"
      />
    </motion.section>
  );
};
