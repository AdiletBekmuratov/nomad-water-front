import logo from '../../assets/logoHead.png';
import { BiMenuAltRight } from 'react-icons/bi';

export const Header = () => {
  return (
    <header className={`h-10 fixed w-screen z-50`}>
      <div className={`flex items-center justify-between mx-20 py-12 `}>
        <div className={`font-semibold leading-4 text-dark-blue`}>
          <span className={`opacity-50`}>KZ </span>
          <span> | RU </span>
        </div>
        <div className={`my-0 mx-auto`}>
          <img src={logo} alt="logo" width={150} height={35} />
        </div>
        <div className={``}>
          <BiMenuAltRight className={`w-10 h-10`} />
        </div>
      </div>
    </header>
  );
};
