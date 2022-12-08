import { FC, ReactNode, useState } from 'react';
import Navbar from './Navbar';
import { SheetAdmin } from './SheetAdmin';

interface ILayoutProps {
  children: ReactNode;
}

const LayoutAdmin: FC<ILayoutProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="h-screen max-h-screen overflow-y-hidden">
      <SheetAdmin isOpen={isOpen} setIsOpen={setIsOpen}>
        <Navbar setIsOpen={setIsOpen} />
        <div className="p-4 flex-grow overflow-auto">{children}</div>
      </SheetAdmin>
    </div>
  );
};

export default LayoutAdmin;
