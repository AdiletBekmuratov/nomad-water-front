import { DetailedHTMLProps, FC, HTMLAttributes, ReactNode } from 'react';

type Props = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
  children: ReactNode;
};

export const Footer: FC<Props> = ({ children }) => {
  return (
    <footer className="w-full h-20 bg-white fixed left-0 bottom-0 flex justify-center items-center">
      {children}
    </footer>
  );
};
