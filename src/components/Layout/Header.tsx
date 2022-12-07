import { FC, ReactNode } from 'react';
interface IHeader {
  children: ReactNode;
  className?: string;
}

export const Header: FC<IHeader> = (props) => {
  const headerStyle = `flex items-center py-4 layout ${props.className}`;
  return (
    <div className="bg-white">
      <div className={`${headerStyle}`}>{props.children}</div>
    </div>
  );
};
