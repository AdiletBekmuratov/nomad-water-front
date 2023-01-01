import { Dispatch, FC, SetStateAction } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { toast } from 'react-hot-toast';
import { logout } from '@/redux/slices/auth';
import { useAppSelector } from '@/hooks/useAppSelector';

import { FaUserTie } from 'react-icons/fa';
import logo from '@/assets/crm/logoHead.png';
import { RxExit } from 'react-icons/rx';
import {
  AiOutlineHeart,
  AiOutlineLogin,
  AiOutlineMenu,
  AiOutlineShoppingCart
} from 'react-icons/ai';

//import { useState } from 'react';

interface IHeader {
  className?: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const Header: FC<IHeader> = ({ setIsOpen, ...props }) => {
  const { user } = useAppSelector((state) => state.auth);
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
      {user ? (
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

          <div className={`flex items-center justify-end gap-2 md:gap-5 flex-1`}>
            <Link to="/myFavourite" className={`cursor-pointer`}>
              <AiOutlineHeart className="h-6 w-6" />
            </Link>
            <Link to="/order">
              <AiOutlineShoppingCart className="h-6 w-6 cursor-pointer" />
            </Link>
            {/* {isDrop && <Dropdown />} */}
            {user?.role === 'ROLE_COURIER' ? (
              <Link to="/courier">
                <FaUserTie className="h-6 w-6" />
              </Link>
            ) : user?.role === 'ROLE_EMPLOYEE' ? (
              <Link to="/employee">
                <FaUserTie className="h-6 w-6" />
              </Link>
            ) : (
              <Link to="/userPage">
                <FaUserTie className="h-6 w-6" />
              </Link>
            )}

            <RxExit className="h-6 w-6 cursor-pointer" onClick={handleLogout} />
          </div>
        </div>
      ) : (
        <div className={`${headerStyle}`}>
          <div className="flex-1">
            <AiOutlineMenu
              onClick={() => setIsOpen((prev) => !prev)}
              className={`hidden lg:block cursor-pointer w-6 h-6`}
            />
          </div>
          <div className="flex justify-center items-center flex-1">
            <Link to="/" className={`mx-auto`}>
              <img src={logo} alt="nomadLogo" />
            </Link>
          </div>
          <div className={`flex items-center justify-end gap-2 md:gap-5 flex-1`}>
            <Link to="/login/user" className="flex items-center gap-1">
              Войти
              <AiOutlineLogin className={`h-6 w-6 cursor-pointer`} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
