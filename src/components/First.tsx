import { motion } from 'framer-motion';

import bottle from '../assets/bottle.png';
import backGr from '../assets/backGr.png';

// const textAnimation = {
//   hidden: {
//     y: 0
//   },
//   visible: (custom: any) => ({
//     y: 200,

//     transition: { delay: custom * 0.6 }
//   })
// };
const imgAnimation = {
  hidden: {
    scale: 1,
    y: 0
  },
  visible: (custom: any) => ({
    scale: 0.7,
    y: 30,
    transition: { duration: 1.5, delay: custom * 0.5 }
  })
};

export const First = () => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      className={`flex max-w-full justify-center `}>
      <motion.div
        className={`flex flex-col items-center justify-center`}
        initial="hidden"
        whileInView="visible">
        <motion.span
          className={`overflow-hidden text-4xl text-dark-blue mt-3 font-semibold tracking-tighter`}
          custom={2}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 0.5, transition: { duration: 1.5, delay: 1 }, y: 100 }}
          exit={{ opacity: 0, y: '-1000' }}>
          вода великой степи
        </motion.span>
        <motion.span
          className={`overflow-hidden text-9xl text-dark-blue mt-28 font-bold tracking-tighter`}
          custom={2}
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, transition: { duration: 1.5, delay: 1 }, y: 100 }}
          exit={{ opacity: 0 }}>
          выбор наших предков
        </motion.span>
      </motion.div>
      <motion.img
        custom={2}
        variants={imgAnimation}
        className={`absolute z-0 mt-16`}
        src={bottle}
        alt="bottle"
      />
      <img className={`z-10 w-full absolute mt-64`} src={backGr} alt="background" />
      <div className={`flex max-w-full justify-center`}></div>
    </motion.div>
  );
};
