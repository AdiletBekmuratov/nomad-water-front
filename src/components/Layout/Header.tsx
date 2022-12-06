import { FC, ReactNode } from 'react';
interface IHeader {
  children: ReactNode;
  className?: string;
}
export const Header: FC<IHeader> = ({ children }) => {
  const headerStyle = `flex items-center py-4 layout`;
  return (
    <div className="bg-white">
      <div className={`${headerStyle}`}>{children}</div>
    </div>
  );
};
