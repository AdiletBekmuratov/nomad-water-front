import { DetailedHTMLProps, FC, HTMLAttributes, ReactNode } from 'react';
import { motion } from 'framer-motion';

import { Footer } from './Footer';

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  children: ReactNode;
  isOpen: boolean;
  setIsEdited?: Function;
};

export const BottomMenu: FC<Props> = (props) => {
  return (
    <motion.footer
      className="w-full fixed bottom-0"
      initial={{ y: '25rem' }}
      animate={{ y: 0, transition: { duration: 0.5 } }}>
      <Footer className={`${props.className} z-10`}>{props.children}</Footer>
    </motion.footer>
  );
};
