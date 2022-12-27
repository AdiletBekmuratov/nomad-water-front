import { Dispatch, FC, SetStateAction } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import avatar from '@/assets/crm/avatar.png';
import logo from '@/assets/crm/logoHead.png';
import { AiOutlineHeart, AiOutlineMenu, AiOutlineShoppingCart } from 'react-icons/ai';
import { RxExit } from 'react-icons/rx';
//import { useState } from 'react';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { toast } from 'react-hot-toast';
import { logout } from '@/redux/slices/auth';
interface IHeader {
  className?: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const Header: FC<IHeader> = ({ setIsOpen, ...props }) => {
  const headerStyle = `flex items-center py-4 justify-between layout ${props.className}`;
  // const [isDrop, setIsDrop] = useState();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleLogout = async () => {
    toast
      .promise(dispatch(logout()).unwrap(), {
        success: 'Вышли из аккаунта',
        loading: 'Загрузка...',
        error: (err) => err.toString()
      })
      .then(() => {
        navigate('/login/user');
      });
  };

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

        <div className="flex items-center justify-end gap-2 md:gap-5 flex-1">
          <Link to="/myFavourite" className={`cursor-pointer`}>
            <AiOutlineHeart className="h-6 w-6" />
          </Link>
          <AiOutlineShoppingCart className="h-6 w-6" />
          {/* {isDrop && <Dropdown />} */}
          <Link to="/userPage">
            <img src={avatar} alt="avatar" className={`hidden lg:block cursor-pointer`} />
          </Link>

          <RxExit className="h-6 w-6" onClick={handleLogout} />
        </div>
      </div>
      {/* нужно будет подвинуть */}
    </div>
  );
};
