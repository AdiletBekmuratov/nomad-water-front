import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { logout } from '@/redux/slices/auth';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Dropdown = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
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
    <div
      className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y
       divide-gray-100 rounded-md bg-light-blue shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
      tabIndex={-1}>
      <div className="" role="none">
        {user && (
          <button
            className="text-gray-700 px-4 py-2 text-sm w-full flex justify-start hover:bg-white hover:rounded-md"
            role="menuitem"
            tabIndex={-1}
            onClick={() => navigate('/userPage')}>
            Профиль
          </button>
        )}
        <button
          onClick={handleLogout}
          className="text-gray-700 px-4 py-2 text-sm w-full flex justify-start hover:bg-white hover:rounded-md "
          role="menuitem"
          tabIndex={-1}
          id="menu-item-0">
          Выйти
        </button>
      </div>
    </div>
  );
};

export default Dropdown;
