import { Header, Layout } from '@/components/Layout';
import { Sheet } from '@/components/Layout/Sheet';
import { RegByPhone } from '@/components/regByPhone';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import logo from '../assets/crm/logoHead.png';

const RegisterForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState({});

  return (
    <Sheet isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className={`w-full bg-gray-200 text-dark-blue `}>
        <Header>
          <>
            <svg
              onClick={() => setIsOpen((prev) => !prev)}
              className={`hidden lg:block mr-16 cursor-pointer`}
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M3 7.5H21" stroke="#023646" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M3 12.5H21" stroke="#023646" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M3 17.5H21" stroke="#023646" strokeWidth="1.5" strokeLinecap="round" />
            </svg>

            <Link to="/" className={`mx-auto`}>
              <img src={logo} alt="nomadLogo" />
            </Link>
          </>
        </Header>
        <Layout className={`flex flex-col gap-4 justify-center items-center max-w-screen-sm`}>
          <h2 className={`text-base lg:text-lg font-semibold text-center`}>
            Вы не авторизованы! Пожалуйста, авторизуйтесь или зарегистрируйтесь!
          </h2>
          <RegByPhone setIsAuth={setIsAuth} setUser={setUser} />
        </Layout>
      </div>
    </Sheet>
  );
};

export default RegisterForm;
