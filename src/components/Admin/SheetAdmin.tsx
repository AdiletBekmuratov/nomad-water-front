import { AnimatePresence, motion } from 'framer-motion';
import { FC, ReactNode } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineCloseCircle } from 'react-icons/ai';
// import { Link } from 'react-router-dom';

// import { AiOutlineCloseCircle } from 'react-icons/ai';

interface ISheetProps {
  children?: ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const SheetAdmin: FC<ISheetProps> = ({ children, isOpen, setIsOpen }) => (
  <div className={`h-screen flex text-dark-blue`}>
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.aside
            initial={{ width: 0 }}
            animate={{
              width: 250
            }}
            exit={{
              width: 0,
              transition: { duration: 0.5 }
            }}
            className={`bg-light-blue h-screen absolute z-20 rounded-r-3xl`}>
            <div className={`grid grid-cols-1 p-5  xl:px-7`}>
              <AiOutlineCloseCircle className="cursor-pointer" onClick={() => setIsOpen(false)} />
              <Link to="/requestsUser">Панель управления</Link>
              <Link to="/users">Пользователи</Link>
              <Link to="/couriers">Курьеры</Link>
              <Link to="/warehouses">Склады</Link>
              <Link to="/hardware">Оборудование</Link>
            </div>
          </motion.aside>
          <div
            onClick={() => setIsOpen(false)}
            className={`fixed bg-black opacity-50 inset-0 z-10`}></div>
        </>
      )}
    </AnimatePresence>
    <div className={`flex-1 flex-col bg-gray-200 `}>{children}</div>
  </div>
);
