import { Dispatch, FC, SetStateAction } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import { useAppDispatch } from '@/hooks/useAppDispatch';
import { logout } from '@/redux/slices/auth';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useGetUserFavoriteQuery } from '@/redux/services/user.service';

import { FaUserTie } from 'react-icons/fa';
import logo from '@/assets/crm/logoHead.png';
import { RxExit } from 'react-icons/rx';
import { BsFillCartFill } from 'react-icons/bs';
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineLogin,
  AiOutlineMenu,
  AiOutlineShoppingCart
} from 'react-icons/ai';

interface IHeader {
  className?: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const Header: FC<IHeader> = ({ setIsOpen, ...props }) => {
  const { products = [] } = useAppSelector((state) => state.cart);

  const { user } = useAppSelector((state) => state.auth);
  const headerStyle = `flex items-center py-3 justify-between layout ${props.className}`;
  const { data: favorites = [] } = useGetUserFavoriteQuery();

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
        navigate('/catalog');
      });
  };

  return (
    <div className="bg-white">
      {user ? (
        <div className={`${headerStyle}`}>
          {/* //меню кнопка */}
          <div className="flex-1">
            <AiOutlineMenu
              onClick={() => setIsOpen((prev) => !prev)}
              className={`hidden md:block cursor-pointer w-6 h-6`}
            />
          </div>
          {/* //лого */}
          <div className="flex justify-center items-center flex-1">
            <Link to="/" className={``}>
              <img src={logo} alt="nomadLogo" />
            </Link>
          </div>
          <div className={`flex items-center justify-end gap-4 md:gap-4 flex-1`}>
            {/* //избранные */}
            {favorites.length > 0 ? (
              <Link to="/myFavorite" className={`cursor-pointer`}>
                <AiFillHeart className="h-6 w-6" />
              </Link>
            ) : (
              <Link to="/myFavorite" className={`cursor-pointer`}>
                <AiOutlineHeart className="h-6 w-6" />
              </Link>
            )}
           {/* //Корзина//Создание заказа */} 
            <div className={`hidden md:flex gap-4`}>
              <Link to="/order">
                {products.length === 0 ? (
                  <AiOutlineShoppingCart className="h-6 w-6 cursor-pointer" />
                ) : (
                  <BsFillCartFill className="h-6 w-6 cursor-pointer" />
                )}
              </Link>
              {/* //личная страница */}
              {user?.role === 'ROLE_COURIER' ? (
                <Link to="/courier">
                  <FaUserTie className="h-6 w-6" />
                </Link>
              ) : user?.role === 'ROLE_EMPLOYEE' ? (
                <Link to="/employee">
                  <FaUserTie className="h-6 w-6" />
                </Link>
              ) : user?.role === 'ROLE_MASTER' ? (
                <Link to="/master">
                  <FaUserTie className="h-6 w-6" />
                </Link>
              ) : (
                <Link to="/userPage">
                  <FaUserTie className="h-6 w-6" />
                </Link>
              )}
            </div>
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
