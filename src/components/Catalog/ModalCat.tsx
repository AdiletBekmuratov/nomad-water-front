import { AnimatePresence, motion } from 'framer-motion';
import { FC, ReactNode } from 'react';
import React from 'react';
import { Input } from '../Forms';

interface ISheetProps {
  children?: ReactNode;
  isOpenPopUp: boolean;
  setIsOpenPopUp: React.Dispatch<React.SetStateAction<boolean>>;
}

const itemVariants = {
  closed: {
    opacity: 0
  },
  open: { opacity: 1 }
};

export const ModalCat: FC<ISheetProps> = ({ isOpenPopUp, setIsOpenPopUp }) => (
  <div className="text-dark-blue">
    <AnimatePresence>
      {isOpenPopUp && (
        <>
          <motion.aside
            initial={{ width: 0 }}
            animate={{
              height: 470
            }}
            exit={{
              height: 0,
              transition: { duration: 0.5 }
            }}
            className={` z-10 fixed bottom-0  w-full `}>
            <motion.div
              className={`container flex flex-col `}
              initial="closed"
              animate="open"
              exit="closed"
              variants={itemVariants}>
              <div className={`flex flex-col w-screen`}>
                <svg
                  width="60"
                  height="4"
                  viewBox="0 0 60 4"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <rect width="60" height="4" rx="2" fill="#E6EAEE" />
                </svg>
                <h2>Новый курьер</h2>
                <input className={`outline-none`} placeholder="Поиск ..." />
              </div>
            </motion.div>
          </motion.aside>
          {/* <div
            onClick={() => setIsOpenPopUp(false)}
            className={`fixed bg-black opacity-50 inset-0 z-10`}></div> */}
        </>
      )}
    </AnimatePresence>
  </div>
);
