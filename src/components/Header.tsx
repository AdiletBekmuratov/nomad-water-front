import logo from '../assets/logoHead.png';
import { BiMenuAltRight } from 'react-icons/bi';

export const Header = () => {
  return (
    <div className={`flex items-center justify-between pt-12 mx-20 h-10`}>
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
  );
};
