import { AiOutlineShoppingCart } from 'react-icons/ai';

import { Link } from 'react-router-dom';
import logo from '../../assets/lending/logoHead.png';

export const HeaderLend = () => {
  return (
    <header className={`fixed z-50 w-full px-10 lg:px-20 mt-4 lg:mt-7 text-sm font-semibold`}>
      <div className={`flex `}>
        <div className={` text-dark-blue flex items-center`}>
          <a href="/" className={`opacity-50 cursor-pointer mx-2`}>
            <span>KZ</span>
          </a>
          <span>|</span>
          <a href="/" className={` cursor-pointer mx-2`}>
            <span>RU</span>
          </a>
        </div>
        <div className={`my-0 mx-auto`}>
          <img src={logo} alt="logo" />
        </div>
        <div className={` flex pt-2 text-dark-blue opacity-70 cursor-pointer uppercase`}>
          <Link to="/catalog">
            <AiOutlineShoppingCart className="h-6 w-6 cursor-pointer" />
          </Link>
        </div>
      </div>
    </header>
  );
};
