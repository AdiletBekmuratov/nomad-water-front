import { motion } from 'framer-motion';

import bottleX from '../../assets/2l.png';
import bottleXl from '../../assets/5l.png';
import bottle2Xl from '../../assets/8l.png';
import astana from '../../assets/astana.png';

// const data = [
//   {
//     id: 1,
//     titleLeft: '4000+ клиентов',
//     textLeft:
//       'Описание характеристики с каким-то подверждением. Описание характеристики с каким-то подверждением.',
//     titleRight: 'быстрая доставка',
//     textRight:
//       'Описание характеристики с каким-то подверждением. Описание характеристики с каким-то подверждением.',
//     button: 'false',
//     img: bottleX
//   },
//   {
//     id: 2,
//     titleLeft: 'качество фильтрации',
//     textLeft:
//       'Описание характеристики с каким-то подверждением. Описание характеристики с каким-то подверждением.',
//     titleRight: 'полезные элементы',
//     textRight:
//       'Описание характеристики с каким-то подверждением. Описание характеристики с каким-то подверждением.',
//     button: 'false',
//     img: bottleXl
//   },
//   {
//     id: 3,
//     titleLeft: 'Большой выбор',
//     textLeft:
//       'Описание характеристики с каким-то подверждением. Описание характеристики с каким-то подверждением.',
//     titleRight: '',
//     textRight: '',
//     button: 'true',
//     img: bottle2Xl
//   }
// ];
const astanaAnimation = {
  hidden: {
    x: 300,
    opacity: 0
  },
  visible: {
    transition: { duration: 1.5, delay: 0.1 },
    x: 0,
    opacity: 1
  }
};
const textAnimation = {
  hidden: {
    y: 300,
    opacity: 0
  },
  visible: (custom: any) => ({
    transition: { duration: 1.5, delay: custom * 0.7 },
    y: 0,
    opacity: 1
  })
};
const butAnimation = {
  hidden: {
    x: -300,
    opacity: 0
  },
  visible: (custom: any) => ({
    transition: { duration: 1, delay: custom * 0.7 },
    x: 0,
    opacity: 1
  })
};
const bottleAnimation = {
  hidden: {
    x: 75,
    opacity: 0
  },
  visible: {
    transition: { duration: 1.3, delay: 0.3 },
    x: 0,
    opacity: 1
  }
};

export const About = () => {
  return (
    <>
      <motion.section className={`text-dark-blue content pt-10 lg:pt-16 px-7 lg:px-48`}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.2, once: true }}
          custom={1}
          variants={astanaAnimation}
          className={`grid grid-cols-3 gap-7 my-7 `}>
          <motion.img src={astana} alt="astanahub" />
          <motion.img src={astana} alt="astanahub" />
          <motion.img src={astana} alt="astanahub" />
        </motion.div>

        <motion.div
          className={` grid grid-cols-1 lg:grid-cols-3 text-base items-center leading-relaxed tracking-wide`}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.5, once: true }}
            variants={textAnimation}
            custom={1}
            className={`text-center lg:text-right my-4 `}>
            <h2 className={`text-2xl font-bold mb-5`}>4000+ клиентов</h2>
            <span className={``}>
              Описание характеристики с каким-то подверждением. Описание характеристики с каким-то
              подверждением.
            </span>
          </motion.div>
          <motion.img
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.5, once: true }}
            variants={bottleAnimation}
            className={`mx-auto hidden lg:block`}
            src={bottleX}
            alt="bottleX"
          />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.5, once: true }}
            custom={2}
            variants={textAnimation}
            className={` my-4 text-center lg:text-left `}>
            <h2 className={`text-2xl font-bold mb-5`}> полезные элементы</h2>
            <span>
              Описание характеристики с каким-то подверждением. Описание характеристики с каким-то
              подверждением.
            </span>
          </motion.div>
        </motion.div>
      </motion.section>
      <motion.section className={`text-dark-blue content pt-20 lg:pt-44 px-7 lg:px-48`}>
        <motion.div
          className={` grid grid-cols-1 lg:grid-cols-3 text-base items-center leading-relaxed tracking-wide`}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.5, once: true }}
            variants={textAnimation}
            custom={1}
            className={`text-center lg:text-right my-4 `}>
            <h2 className={`text-2xl font-bold mb-5`}>4000+ клиентов</h2>
            <span className={``}>
              Описание характеристики с каким-то подверждением. Описание характеристики с каким-то
              подверждением.
            </span>
          </motion.div>
          <motion.img
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.5, once: true }}
            variants={bottleAnimation}
            className={`mx-auto hidden lg:block`}
            src={bottleXl}
            alt="bottleX"
          />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.5, once: true }}
            custom={2}
            variants={textAnimation}
            className={` my-4 text-center lg:text-left `}>
            <h2 className={`text-2xl font-bold mb-5`}> полезные элементы</h2>
            <span>
              Описание характеристики с каким-то подверждением. Описание характеристики с каким-то
              подверждением.
            </span>
          </motion.div>
        </motion.div>
      </motion.section>
      <motion.section className={`text-dark-blue content pt-12 lg:pt-44 px-7 lg:px-48`}>
        <motion.div
          className={` grid grid-cols-1 lg:grid-cols-3 text-base items-center leading-relaxed tracking-wide`}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.4 }}
            variants={textAnimation}
            custom={1}
            className={`text-center lg:text-right mt-3 `}>
            <h2 className={`text-2xl font-bold md-2 lg:mb-5`}>4000+ клиентов</h2>
            <span className={``}>
              Описание характеристики с каким-то подверждением. Описание характеристики с каким-то
              подверждением.
            </span>
            <motion.div className={`mt-1 lg:mt-3`}>
              <motion.a
                initial="hidden"
                whileInView="visible"
                //viewport={{ once: true }}
                variants={butAnimation}
                custom={2}
                href="/"
                type="button"
                className={`py-2 px-4 rounded-3xl leading-7 tracking-widest text-base text-center
                border  border-dark-blue hover:bg-medium-blue hover:text-white hover:border-none`}>
                открыть каталог
              </motion.a>
            </motion.div>
          </motion.div>
          <motion.img
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.1 }}
            variants={bottleAnimation}
            className={`mx-auto `}
            src={bottle2Xl}
            alt="bottleX"
          />
        </motion.div>
      </motion.section>
    </>
  );
};
