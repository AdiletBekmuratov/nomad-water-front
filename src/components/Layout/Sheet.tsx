import { AnimatePresence, motion } from 'framer-motion';
import { FC, ReactNode } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';

import avatar from '../../assets/crm/avatar.png';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { ImExit } from 'react-icons/im';
import { Button } from '../Forms';

interface ISheetProps {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const itemVariants = {
  closed: {
    opacity: 0
  },
  open: { opacity: 1 }
};

export const Sheet: FC<ISheetProps> = ({ children, isOpen, setIsOpen }) => (
  <div className="h-screen flex text-dark-blue">
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
            className="bg-light-blue h-screen absolute z-20 rounded-r-3xl">
            <motion.div className={`px-3 xl:px-7 pt-6 flex justify-between items-center`}>
              <Link to="/" className={`text-sm leading-6 font-semibold `}>
                ВОДА ВЕЛИКОЙ СТЕПИ
                <div className={`border-b border-solid border-gray-400`}></div>
              </Link>
              <AiOutlineCloseCircle className="cursor-pointer" onClick={() => setIsOpen(false)} />
            </motion.div>

            <motion.div
              className={`container px-5 xl:px-7 pt-10 mb-5`}
              initial="closed"
              animate="open"
              exit="closed"
              variants={itemVariants}>
              <div className={`grid grid-cols-1 gap-2 mb-16 xl:mb-36`}>
                <div className={`flex gap-5 items-center`}>
                  <img src={avatar} alt="user" />
                  <Link to="/userPage">User</Link>
                  <ImExit />
                </div>
                <div className={`border-b-2 border-solid border-gray-500 w-52 my-5`}></div>
                <Link to="/catalog">Каталог</Link>
                <Link to="/myOrders">Мои заказы</Link>
                <Link to="/myOrders">Оборудование</Link>
                <Link to="/catalog">Сопутствующие товары</Link>
                <Link to="/myFavourite">Избранное</Link>
                <Link to="/catalog">Обратная связь</Link>
                <Link to="/">На главную</Link>

                <div className={`border-b-2 border-solid border-gray-500 w-52 my-5`}></div>
                <Link to="/myAdmin">Панель управления</Link>
                <Link to="/users">Пользователи</Link>
                <Link to="/users">Курьеры</Link>
                <Link to="/catalog">Склады</Link>
                <Link to="/catalog">Оборудование</Link>
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
