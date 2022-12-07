import React, { ReactNode, FC, HTMLAttributes } from 'react';

interface ILayoutProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const LayoutAdmin: FC<ILayoutProps> = ({ children, ...props }) => {
  return (
    <>
      <div {...props} className={`layout md:py-8 mb-20 md:mb-0 ${props.className}`}>
        {children}
      </div>
    </>
  );
};
