import { DetailedHTMLProps, FC, HTMLAttributes, ReactNode } from 'react';

type Props = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
  children: ReactNode;
};

const mediumScreen = '';

export const Footer: FC<Props> = ({ children, className }) => {
  return (
    <footer
      className={`w-full ${mediumScreen} fixed left-0 bottom-20 shadow-sm ${className}`}>
      {children}
    </footer>
  );
};
