import React, { ReactNode, FC, HTMLAttributes, useState } from 'react';
import { Header } from './Header';
import { MenuBottom } from './MenuBottom';
import { Sheet } from './Sheet';

interface ILayoutProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const Layout: FC<ILayoutProps> = ({ children, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="max-h-screen  min-h-screen ">
      <Sheet isOpen={isOpen} setIsOpen={setIsOpen}>
        <Header setIsOpen={setIsOpen} />
        <div
          {...props}
          className={`layout py-4 md:py-6 mb-20 md:mb-0 w-full min-h-screen ${props.className}`}>
          {children}
        </div>
        <MenuBottom />
      </Sheet>
    </div>
  );
};
