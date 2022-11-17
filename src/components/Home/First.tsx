import { motion } from 'framer-motion';

import bottle from '../../assets/bottle.png';
import backGr from '../../assets/backGr.png';
import choice from '../../assets/choice.png';

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
// const sectionAnimation = {
//   hidden: {
//     y: 0
//   },
//   visible: (custom: any) => ({
//     y: -650,
//     transition: { duration: 1.5, delay: custom }
//   })
// };

export const First = () => {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      custom={3}
      viewport={{ amount: 0.2, once: true }}
      className={`flex w-full h-screen snap-start justify-center `}>
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
        className={`absolute z-0 mt-24`}
        src={bottle}
        alt="bottle"
      />
      <motion.img
        custom={3}
        className={`z-10 w-full absolute mt-72`}
        src={backGr}
        alt="background"
      />
    </motion.section>
  );
};
