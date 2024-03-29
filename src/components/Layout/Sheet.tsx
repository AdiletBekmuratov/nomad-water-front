import { AnimatePresence, motion } from 'framer-motion';
import { Dispatch, FC, ReactNode, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineCloseCircle } from 'react-icons/ai';

import { FaFacebook, FaInstagram, FaTelegramPlane, FaWhatsapp } from 'react-icons/fa';
import { FiTwitter } from 'react-icons/fi';
interface ISheetProps {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const itemVariants = {
  closed: {
    opacity: 0
  },
  open: { opacity: 1 }
};

export const Sheet: FC<ISheetProps> = ({ children, isOpen, setIsOpen }) => (
  <div className=" text-dark-blue h-full">
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.aside
            initial={{ width: 0 }}
            animate={{
              width: 270
            }}
            exit={{
              width: 0,
              transition: { duration: 0.5 }
            }}
            className="bg-light-blue absolute z-20 rounded-r-3xl h-screen">
            <motion.div className={`px-3 xl:px-10 pt-6 flex justify-between items-center`}>
              <Link to="/" className={`text-sm leading-6 font-semibold`}>
                ВОДА ВЕЛИКОЙ СТЕПИ
                <motion.div className={`border-b border-solid border-gray-400`}></motion.div>
              </Link>
              <AiOutlineCloseCircle className="cursor-pointer" onClick={() => setIsOpen(false)} />
            </motion.div>
            <motion.div
              className={`container px-5 xl:px-10 pt-7 mb-5`}
              initial="closed"
              animate="open"
              exit="closed"
              variants={itemVariants}>
              <div className={`grid grid-cols-1 gap-2 `}>
                <Link to="/catalog">Каталог</Link>
                <Link to="/myOrders">Мои заказы</Link>
                {/* <Link to="/userPage">Мой аккаунт</Link> */}
                <Link to="/myFavorite">Избранные</Link>
                <Link to="/warehouses">Склады</Link>

                <div className={`border-b-2 border-solid border-gray-500 my-2 lg:my-3`}></div>

                <Link to="/">Партнерам</Link>
                <Link to="/">Вакансии</Link>
                <Link to="/">FAQ</Link>
                <Link to="/">Политика приватности</Link>                
                <Link to="/">Обратная связь</Link>
                <Link to="/">На главную</Link>
                <div className={`border-b-2 border-solid border-gray-500 my-2 lg:my-3`}></div>
                <div className={`grid gap-3`}>
                  <h2>Наши контакты:</h2>
                  <a href="tel:+77750001415">+7 (775) 000-14-15</a>
                  <a href="tel:+77292441414">+7 (7292) 44-14-14</a>
                  <a href="mailto:someone@example.com">someone@example.com</a>
                  <div className="flex gap-3 pt-3">
                    <a href="https://telegram.me/NomadWater_Bot">
                      <FaTelegramPlane className={`w-6 h-6 cursor-pointer`} />
                    </a>
                    <a href="https://wa.me/7750001415">
                      <FaWhatsapp className={`w-6 h-6 cursor-pointer`} />
                    </a>
                    <a href="http://www.instagram.com/nomad.water.aktau/">
                      <FaInstagram className={`w-6 h-6 cursor-pointer`} />
                    </a>
                    <FaFacebook className={`w-6 h-6 cursor-pointer`} />
                    <FiTwitter className={`w-6 h-6 cursor-pointer`} />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.aside>
          <div
            onClick={() => setIsOpen(false)}
            className={`fixed bg-black opacity-50 inset-0 z-10`}></div>
        </>
      )}
    </AnimatePresence>
    <div className="flex flex-1 flex-col bg-gray-200 ">{children}</div>
  </div>
);
