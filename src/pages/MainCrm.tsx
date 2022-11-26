import { RegByPhone } from '../components/regByPhone';
import { useState } from 'react';
import { Header } from '@/components/Crm/Header';
import { Catalog } from '@/components/Crm';

import logo from '../assets/crm/logoHead.png';
import avatar from '../assets/crm/avatar.png';

const MainCrm = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [user, setUser] = useState([]);

  return (
    <div className={`w-full bg-bg-crm `}>
      <Header>
        <>
          <svg
            className={`hidden lg:block mr-16`}
            width="24"
            height="25"
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M3 7.5H21" stroke="#023646" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M3 12.5H21" stroke="#023646" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M3 17.5H21" stroke="#023646" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <img className={`mx-auto`} src={logo} alt="nomadLogo" />
          <a href="/" className={`cursor-pointer lg:mr-16`}>
            <svg
              width="24"
              height="22"
              viewBox="0 0 16 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8.37739 12.444C8.17043 12.5187 7.82957 12.5187 7.62261 12.444C5.85739 11.8285 1 8.32798 1 3.97565C1 2.0544 2.51565 0.5 4.38435 0.5C6.18368 0.5 7.02595 1.44965 7.60589 2.26215C7.80315 2.53852 8.19685 2.53852 8.39411 2.26215C8.97406 1.44965 9.81635 0.5 11.6157 0.5C13.4843 0.5 15 2.0544 15 3.97565C15 8.32798 10.1426 11.8285 8.37739 12.444Z"
                stroke="#023646"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <img src={avatar} alt="avatar" className={`hidden lg:block mr-4`} />
        </>
      </Header>
      {isAuth ? (
        <Catalog user={user} />
      ) : (
        <div
          className={`text-dark-blue flex flex-1 flex-col pt-24 lg:pt-32 pb-8 
          lg:pb-16 mx-16 sm:mx-32 md:mx-64 lg:px-16  xl:mx-96`}>
          <RegByPhone setIsAuth={setIsAuth} setUser={setUser} />
        </div>
      )}
    </div>
  );
};
export default MainCrm;
