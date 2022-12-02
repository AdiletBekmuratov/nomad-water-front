import { DetailedHTMLProps, FC, HTMLAttributes, ReactNode } from 'react';
import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children?: ReactNode;
  isOpenPopUp: boolean;
  setIsOpenPopUp: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}
const itemVariants = {
  closed: {
    opacity: 0,
    y: 300
  },
  open: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};
// const shadow = {
//   closed: { opacity: 0, transition: { duration: 0.1 } },
//   open: { opacity: 0.5 }
// };
export const PopUp: FC<Props> = ({ children, isOpenPopUp, setIsOpenPopUp, className }) => {
  const childrenStyle = `absolute bg-white bottom-0 text-dark-blue rounded-t-3xl 
                           sm:inset-x-40 sm:inset-y-16 
                           lg:inset-x-80 lg:inset-y-20 
                           xl:inset-x-1/3 xl:inset-y-30
                           sm:rounded-3xl sm:item-center sm:justify-center sm:fixed`;
  return (
    <AnimatePresence>
      {isOpenPopUp && (
        <motion.div
          initial="closed"
          animate="open"
          exit="closed"
          className={``}
          //  variants={itemVariants}
        >
          <div
            onClick={() => setIsOpenPopUp(false)}
            className={`absolute bg-black opacity-50 inset-0 `}></div>
          <div className={`${childrenStyle}${className}`}>{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
