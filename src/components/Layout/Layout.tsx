import React, { ReactNode, FC, HTMLAttributes } from 'react';
import { MenuBottom } from './MenuBottom';

interface ILayoutProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const Layout: FC<ILayoutProps> = ({ children, ...props }) => {
  return (
    <>
      <div {...props} className={`layout py-4 md:py-8 mb-20 md:mb-0 ${props.className}`}>
        {children}
      </div>
      <MenuBottom />
    </>
  );
};
