import React from 'react';
import { motion } from 'framer-motion';
// import astanaHub from '../assets/astanaHub.png';
const imgAnimation = {
  hidden: {
    x: 100,
    opacity: 0
  },
  visible: (custom: any) => ({
    x: 0,
    y: 0,
    opacity: 1,
    transition: { delay: custom * 0.2 }
  })
};
export const AstanaHub = () => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ amount: 0.3, once: true }}
      // className={`w-screen h-24 bg-[url('/img/hero-pattern.svg')] bg-repeat-x `}
      className={` absolute bottom-0`}>
      {/* <img src={astanaHub} alt="astanaHub" /> */}
    </motion.div>
  );
};
