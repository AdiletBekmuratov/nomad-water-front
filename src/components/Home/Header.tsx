import logo from '../../assets/lending/logoHead.png';

export const Header = () => {
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
        <div className={` flex pt-2`}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 31 31"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <rect x="0.84375" y="0.804688" width="29.3906" height="2" rx="1" fill="#023646" />
            <rect x="10.8438" y="11.8047" width="19.3906" height="2" rx="1" fill="#023646" />
            <rect x="18.4844" y="22.8047" width="11.75" height="2" rx="1" fill="#023646" />
          </svg>
        </div>
      </div>
    </header>
  );
};
