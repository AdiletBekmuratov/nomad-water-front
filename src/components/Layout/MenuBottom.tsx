import { useAppSelector } from '@/hooks/useAppSelector';
import { AiOutlineHome, AiOutlineShoppingCart, AiOutlineUser } from 'react-icons/ai';
import { Link } from 'react-router-dom';

export const MenuBottom = () => {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <div
      className={`bg-white px-20 pt-5 pb-8 fixed w-full bottom-0 flex items-center justify-between lg:hidden`}>
      <Link to="/catalog" className={`cursor-pointer`}>
        <AiOutlineHome className={`w-6 h-6 text-dark-blue`} />
      </Link>
      <Link
        to={`${
          user?.role === 'ROLE_USER' || user?.role === 'ROLE_EMPLOYEE'
            ? '/order'
            : user?.role === 'ROLE_COURIER'
            ? '/courier/orders'
            : '/catalog'
        }`}
        className={`cursor-pointer `}>
        <AiOutlineShoppingCart className={`w-6 h-6 text-dark-blue`} />
      </Link>
      <Link
        to={`${
          user?.role === 'ROLE_USER' || user?.role === 'ROLE_EMPLOYEE'
            ? '/userPage'
            : user?.role === 'ROLE_COURIER'
            ? '/courier'
            : '/catalog'
        }`}
        className={`cursor-pointer `}>
        <AiOutlineUser className={`w-6 h-6 text-dark-blue`} />
      </Link>
    </div>
  );
};
