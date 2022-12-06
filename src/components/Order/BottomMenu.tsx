import { DetailedHTMLProps, FC, HTMLAttributes, ReactNode } from 'react';
import { motion } from 'framer-motion';

import { Footer } from './Footer';

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  children: ReactNode;
  isOpen: boolean;
  setIsEdited?: Function;
};

const smallScreen = 'sm:fixed sm:bottom-0';

export const BottomMenu: FC<Props> = (props) => {
  return (
    <motion.footer
      className={`w-full ${smallScreen}`}
      initial={{ y: '25rem' }}
      animate={{ y: 0, transition: { duration: 0.5 } }}>
      <Footer className={`${props.className} z-10`}>{props.children}</Footer>
    </motion.footer>
  );
};
