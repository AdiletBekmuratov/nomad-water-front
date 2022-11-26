import { FC, ReactNode } from 'react';
interface IHeader {
  children: ReactNode;
  className?: string;
}
export const Header: FC<IHeader> = ({ children }) => {
  const headerStyle = `flex items-center py-4 px-10 lg:px-48 bg-white`;
  return <div className={`${headerStyle}`}>{children}</div>;
};
