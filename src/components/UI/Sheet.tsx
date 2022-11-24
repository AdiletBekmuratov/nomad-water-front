import { AnimatePresence, motion } from 'framer-motion';
import { FC, ReactNode } from 'react';

interface ISheetProps {
  children: ReactNode;
  isOpen: boolean;
}

const itemVariants = {
  closed: {
    opacity: 0
  },
  open: { opacity: 1 }
};

export const Sheet: FC<ISheetProps> = ({ children, isOpen }) => (
  <div className="h-screen flex">
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          initial={{ width: 0 }}
          animate={{
            width: 300
          }}
          exit={{
            width: 0,
            transition: { duration: 0.5 }
          }}
          className="bg-red-500">
          <motion.div
            className="container"
            initial="closed"
            animate="open"
            exit="closed"
            variants={itemVariants}>
            <motion.a initial="closed" animate="open" exit="closed" variants={itemVariants}>
              dsad
            </motion.a>
          </motion.div>
        </motion.aside>
      )}
    </AnimatePresence>
    <div className="flex flex-1 flex-col bg-gray-200">{children}</div>
  </div>
);
