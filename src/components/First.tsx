import { motion } from 'framer-motion';

import bottle from '../assets/bottle.png';
import backGr from '../assets/backGr.png';
import choice from '../assets/choice.png';
import bottleDown from '../assets/DROP_WATER.png';

const textAnimation = {
  hidden: {
    y: 0,
    opacity: 0
  },
  visible: (custom: any) => ({
    transition: { duration: 1.5, delay: custom * 0.5 },
    y: 100,
    opacity: 0.8
  })
};
const bottleAnimation = {
  hidden: {
    scale: 0.9,
    y: 0
  },
  visible: (custom: any) => ({
    scale: 0.7,
    y: 1,
    transition: { duration: 1.5, delay: custom * 0.5 }
  })
};
const sectionAnimation = {
  hidden: {
    y: 0
  },
  visible: (custom: any) => ({
    y: -650,
    transition: { duration: 1.5, delay: custom }
  })
};
const downBottleAnimation = {
  hidden: {
    y: 0,
    opacity: 0
  },
  visible: (custom: any) => ({
    y: 550,
    opacity: 1,
    transition: { duration: 0.7, delay: custom * 1 }
  })
};
const h1Animation = {
  hidden: {
    y: 200,
    opacity: 0
  },
  visible: (custom: any) => ({
    transition: { duration: 1, delay: custom * 1 },
    y: 100,
    opacity: 1
  })
};

export const First = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      custom={3}
      viewport={{ amount: 0.2, once: true }}
      className={`flex max-w-full h-screen justify-center `}
      variants={sectionAnimation}>
      <motion.div className={`flex flex-col items-center`} initial="hidden" whileInView="visible">
        <motion.span
          className={`overflow-hidden text-4xl opacity-50, text-dark-blue mt-3 font-semibold tracking-tighter`}
          custom={2}
          variants={textAnimation}>
          вода великой степи
        </motion.span>
        <motion.img
          className={`overflow-hidden mt-24`}
          custom={2}
          variants={textAnimation}
          src={choice}
          alt="choice"
        />
      </motion.div>
      <motion.img
        custom={2}
        variants={bottleAnimation}
        className={`absolute z-0 mt-16`}
        src={bottle}
        alt="bottle"
      />
      <motion.img
        custom={3}
        className={`z-10 w-full absolute mt-64`}
        src={backGr}
        alt="background"
      />
      <motion.div
        custom={4}
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
      <motion.div initial="hidden" whileInView="visible" viewport={{ amount: 0.2, once: true }}>
        <motion.img
          custom={4}
          variants={downBottleAnimation}
          className={`absolute bottom-0 right-32 `}
          src={bottleDown}
          alt="bottleDown"
        />
      </motion.div>
    </motion.section>
  );
};
