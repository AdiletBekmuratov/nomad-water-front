import React from 'react';
import { motion } from 'framer-motion';
import bottleDown from '../../assets/DROP_WATER.png';
const downBottleAnimation = {
  hidden: {
    y: -300,
    opacity: 0
  },
  visible: (custom: any) => ({
    transition: { duration: 1, delay: custom * 0.3 },
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
    y: 200,
    opacity: 1
  })
};
export const Second = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      custom={3}
      viewport={{ amount: 0.5 }}
      className={`flex justify-center w-full h-screen snap-start bg-light-blue `}>
      <motion.div
        variants={h1Animation}
        className={`absolute z-30 left-44 top-full flex flex-col justify-start text-start text-base w-96 text-dark-blue`}>
        <span className={`opacity-80 text-base mb-3 font-bold`}>Наш Опыт</span>
        <h1 className={`text-3xl font-bold leading-9`}>Качество проверенное временем</h1>
        <span className={`opacity-80 mt-7`}>
          In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to
          demonstrate the visual form of a document or a typeface without relying on meaningful
          content.
        </span>
      </motion.div>
      <motion.div>
        <motion.img
          viewport={{ amount: 0.5, once: true }}
          variants={downBottleAnimation}
          className={`absolute t-0 right-32 z-30`}
          src={bottleDown}
          alt="bottleDown"
        />
      </motion.div>
    </motion.section>
  );
};
