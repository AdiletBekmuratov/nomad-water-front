import { motion } from 'framer-motion';

import bottle from '../../assets/lending/bottle.png';
import backGr from '../../assets/lending/backGr.png';

const textAnimation = {
  hidden: {
    y: 0,
    opacity: 0
  },
  visible: (custom: any) => ({
    transition: { duration: 1.5, delay: custom * 0.5 },
    y: 100,
    opacity: 1
  })
};
const bottleAnimation = {
  hidden: {
    scale: 1,
    y: 0
  },
  visible: (custom: any) => ({
    scale: 0.8,
    y: 1,
    transition: { duration: 1.5, delay: custom * 0.5 }
  })
};

export const First = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      custom={1}
      viewport={{ amount: 0.2, once: true }}
      className={`flex content `}>
      <motion.div
        className={`flex flex-col items-center`}
        viewport={{ amount: 0.2, once: true }}
        initial="hidden"
        whileInView="visible">
        <motion.span
          className={`lg:mt-10 text-xl lg:text-4xl text-medium-blue font-medium tracking-wide`}
          custom={2}
          variants={textAnimation}>
          вода великой степи
        </motion.span>
        <motion.span
          className={`mt-20 lg:mt-24 text-3xl md:text-5xl lg:text-7xl xl:text-8xl text-dark-blue font-extrabold tracking-tighter`}
          custom={2}
          variants={textAnimation}>
          выбор наших предков
        </motion.span>
        <motion.img
          custom={3}
          className={`z-10 lg:w-screen mt-48 md:mt-24 lg:mt-48 xl:mt-10 `}
          src={backGr}
          alt="background"
        />
      </motion.div>
      <motion.img
        custom={2}
        variants={bottleAnimation}
        className={`absolute z-0 mt-24 md:mt-24 lg:mt-32 
        h-96 w-auto lg:h-auto`}
        src={bottle}
        alt="bottle"
      />
    </motion.section>
  );
};
