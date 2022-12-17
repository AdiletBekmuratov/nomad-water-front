import { AnimatePresence, motion, Variants } from 'framer-motion';
import { FC, ReactNode, useEffect, useState } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useWindowSize } from '@/hooks';

interface ISheetProps {
  children?: ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const containerAnim: Variants = {
  initial: {
    x: '-100%'
  },
  animate: {
    x: 0,
    transition: {
      type: 'tween',
      when: 'beforeChildren'
    }
  },
  exit: {
    x: '-100%',
    transition: {
      type: 'tween',
      when: 'afterChildren'
    }
  }
};

const childAnim: Variants = {
  initial: { opacity: 0, y: 50 },
  animate: {
    opacity: 1,
    y: 0
  },
  exit: {
    opacity: 0,
    y: 50
  }
};

export const SheetAdmin: FC<ISheetProps> = ({ children, isOpen, setIsOpen }) => {
  const { width } = useWindowSize();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (width && width < 640) {
      setIsMobile(true);
      setIsOpen(false);
    } else {
      setIsMobile(false);
      setIsOpen(false);
    }
  }, [width]);
  const linkStyle = `hover:bg-medium-blue hover:text-white px-4 py-2 rounded-md transition-all`;
  return (
    <div className={`h-screen flex w-full`}>
      <AnimatePresence>
        {!isMobile ? (
          <aside className={`bg-light-blue h-screen w-64`}>
            <div className={`grid grid-cols-1 gap-2 p-2 text-dark-blue`}>
              <Link to="/admin/allUsers" className={`${linkStyle}`}>
                Пользователи
              </Link>
              <Link to="/admin/couriers" className={`${linkStyle}`}>
                Курьеры
              </Link>
              <Link to="/admin/warehouses" className={`${linkStyle}`}>
                Склады
              </Link>
              <Link to="/admin/hardware" className={`${linkStyle}`}>
                Оборудование
              </Link>
            </div>
          </aside>
        ) : (
          isOpen && (
            <>
              <motion.aside
                variants={containerAnim}
                initial="initial"
                animate="animate"
                exit="exit"
                className={`bg-light-blue h-screen absolute z-20 rounded-r-3xl w-64`}>
                <motion.div variants={childAnim} className={`grid grid-cols-1 p-5 md:px-7`}>
                  <AiOutlineCloseCircle
                    className="cursor-pointer"
                    onClick={() => setIsOpen(false)}
                  />

                  <Link to="/admin/allUsers" className={`${linkStyle}`}>
                    Пользователи
                  </Link>
                  <Link to="/admin/couriers" className={`${linkStyle}`}>
                    Курьеры
                  </Link>
                  <Link to="/admin/warehouses" className={`${linkStyle}`}>
                    Склады
                  </Link>
                  <Link to="/admin/hardware" className={`${linkStyle}`}>
                    Оборудование
                  </Link>
                </motion.div>
              </motion.aside>
              <div
                onClick={() => setIsOpen(false)}
                className={`fixed bg-black opacity-50 inset-0 z-10`}></div>
            </>
          )
        )}
      </AnimatePresence>
      <div className={`flex flex-1 flex-col bg-gray-200`}>{children}</div>
    </div>
  );
};
