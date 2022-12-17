import React, { FC, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import Dropdown from './Dropdown';

interface INavbarProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: FC<INavbarProps> = ({ setIsOpen }) => {
  const [isDrop, setIsDrop] = useState(false);

  return (
    <div className="flex justify-between items-center w-full bg-light-blue px-4 py-2">
      <div className="flex-1 flex items-center space-x-2">
        <div>
          <label onClick={() => setIsOpen((prev) => !prev)} className="md:hidden">
            <AiOutlineMenu className="h-5 w-5" />
          </label>
        </div>
        <div className="text-xl uppercase">Nomad Water</div>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full cursor-pointer" onClick={() => setIsDrop(!isDrop)}>
              <img src="https://placeimg.com/80/80/people" />
            </div>
          </label>
        </div>
        {isDrop ? <Dropdown /> : <></>}
      </div>
    </div>
  );
};

export default Navbar;
