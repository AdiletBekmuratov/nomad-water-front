import { Dispatch, FC, SetStateAction } from 'react';
import { Link } from 'react-router-dom';

import avatar from '@/assets/crm/avatar.png';
import logo from '@/assets/crm/logoHead.png';
import { AiOutlineHeart, AiOutlineMenu } from 'react-icons/ai';
import { useState } from 'react';
import Dropdown from '../Admin/Dropdown';
interface IHeader {
  className?: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const Header: FC<IHeader> = ({ setIsOpen, ...props }) => {
  const headerStyle = `flex items-center py-4 justify-between layout ${props.className}`;
  const [isDrop, setIsDrop] = useState();

  return (
    <div className="bg-white">
      <div className={`${headerStyle}`}>
        <div className="flex-1">
          <AiOutlineMenu
            onClick={() => setIsOpen((prev) => !prev)}
            className={`hidden lg:block cursor-pointer w-6 h-6`}
          />
        </div>

        <div className="flex justify-center items-center flex-1">
          <Link to="/" className={``}>
            <img src={logo} alt="nomadLogo" />
          </Link>
        </div>

        <div className="flex items-center justify-end space-x-8 flex-1">
          <Link to="/myFavourite" className={`cursor-pointer`}>
            <AiOutlineHeart className="h-6 w-6" />
          </Link>
          <img
            src={avatar}
            alt="avatar"
            className={`hidden lg:block cursor-pointer`}
            onClick={() => setIsDrop(!isDrop)}
          />
        </div>
      </div>
      {/* нужно будет подвинуть */}
      {isDrop && <Dropdown />}
    </div>
  );
};
