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
    y: 200,
    opacity: 0
  },
  visible: (custom: any) => ({
    transition: { duration: 1.5, delay: custom * 0.7 },
    y: 0,
    opacity: 1
  })
};
// const butAnimation = {
//   hidden: {
//     x: -300,
//     opacity: 0
//   },
//   visible: (custom: any) => ({
//     transition: { duration: 1, delay: custom * 0.7 },
//     x: 0,
//     opacity: 1
//   })
// };
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
      <motion.section
        className={`text-dark-blue content pt-10 md:pt-16 px-7 md:px-12 lg:px-24 xl:px-56`}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.2, once: true }}
          custom={1}
          variants={astanaAnimation}
          className={`grid grid-cols-3 gap-7 my-5 lg:my-7 `}>
          <motion.img src={astana} alt="astanahub" />
          <motion.img src={astana} alt="astanahub" />
          <motion.img src={astana} alt="astanahub" />
        </motion.div>

        <motion.div
          className={` grid grid-cols-1 md:grid-cols-3 items-center md:pt-8 text-base lg:text-lg 
          leading-relaxed tracking-wide lg:tracking-widest`}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.2, once: true }}
            variants={textAnimation}
            custom={1}
            className={`text-center sm:text-right my-2 `}>
            <h2 className={`text-2xl font-bold mb-2 lg:mb-5`}>4000+ клиентов</h2>
            <span className={``}>
              Описание характеристики с каким-то подверждением. Описание характеристики с каким-то
              подверждением.
            </span>
          </motion.div>
          <motion.img
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.2, once: true }}
            variants={bottleAnimation}
            className={`mx-auto lg:block w-16 h-auto md:w-28 lg:w-auto`}
            src={bottleX}
            alt="bottleX"
          />
          <motion.div
            initial="hidden"
            whileInView="visible"
            custom={1}
            viewport={{ amount: 0.2, once: true }}
            variants={textAnimation}
            className={` my-2 text-center sm:text-left `}>
            <h2 className={`text-2xl font-bold mb-2 lg:mb-5`}> быстрая доставка</h2>
            <span>
              Описание характеристики с каким-то подверждением. Описание характеристики с каким-то
              подверждением.
            </span>
          </motion.div>
        </motion.div>
      </motion.section>

      <motion.section
        className={`text-dark-blue content pt-20 md:pt-24 lg:pt-32 px-7 md:px-12 lg:px-24 xl:px-56`}>
        <motion.div
          className={` grid grid-cols-1 md:grid-cols-3 md:pt-8 text-base lg:text-lg 
          items-center leading-relaxed tracking-wide lg:tracking-widest`}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.2, once: true }}
            variants={textAnimation}
            custom={1}
            className={`text-center sm:text-right my-2 `}>
            <h2 className={`text-2xl font-bold mb-2 lg:mb-5`}>качество фильтрации</h2>
            <span className={``}>
              Описание характеристики с каким-то подверждением. Описание характеристики с каким-то
              подверждением.
            </span>
          </motion.div>
          <motion.img
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.2, once: true }}
            variants={bottleAnimation}
            className={`mx-auto lg:block w-24 h-auto md:w-40 lg:w-auto`}
            src={bottleXl}
            alt="bottleX"
          />
          <motion.div
            initial="hidden"
            whileInView="visible"
            custom={1}
            viewport={{ amount: 0.2, once: true }}
            variants={textAnimation}
            className={` my-2 text-center sm:text-left `}>
            <h2 className={`text-2xl font-bold mb-2 lg:mb-5`}> полезные элементы</h2>
            <span>
              Описание характеристики с каким-то подверждением. Описание характеристики с каким-то
              подверждением.
            </span>
          </motion.div>
        </motion.div>
      </motion.section>

      <motion.section
        className={`text-dark-blue content pt-16 md:pt-24 lg:pt-32 px-7 md:px-12 lg:px-24 xl:px-56`}>
        <motion.div
          className={` grid grid-cols-1 md:grid-cols-3 md:pt-8 text-base lg:text-lg items-center 
            leading-relaxed tracking-wide lg:tracking-widest`}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.2, once: true }}
            variants={textAnimation}
            custom={1}
            className={`text-center sm:text-right my-2 `}>
            <h2 className={`text-2xl font-bold my-3 lg:mb-5`}>качество фильтрации</h2>
            <span className={``}>
              Описание характеристики с каким-то подверждением. Описание характеристики с каким-то
              подверждением.
            </span>
            <motion.div className={`my-3 lg:mt-5`}>
              <a
                href="/"
                type="button"
                className={`py-3 px-4 rounded-3xl leading-7 tracking-widest text-base text-center
                border  border-dark-blue hover:bg-medium-blue hover:text-white hover:border-none`}>
                открыть каталог
              </a>
            </motion.div>
          </motion.div>
          <motion.img
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.2, once: true }}
            variants={bottleAnimation}
            className={`mx-auto lg:block w-48 h-auto md:w-48 lg:w-auto`}
            src={bottle2Xl}
            alt="bottleX"
          />
        </motion.div>
      </motion.section>
    </>
  );
};
