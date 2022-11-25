import { DetailedHTMLProps, FC, HTMLAttributes, ReactNode } from 'react';
import { motion } from 'framer-motion';

import { Footer } from './Footer';

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  children: ReactNode;
  isOpen: boolean;
};

export const BottomMenu: FC<Props> = (props) => {
  return (
    <motion.footer className="w-full" initial={{ y: '50vw' }} animate={{ y: 15 }}>
      <Footer className={`${props.className}`}>{props.children}</Footer>
    </motion.footer>
  );
};
