import { Header, Layout } from '@/components/Layout';
import { Sheet } from '@/components/Layout/Sheet';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input } from '@/components/Forms';

import logo from '../assets/crm/logoHead.png';
import avatar from '../assets/crm/avatar.png';
import userPhoto from '../assets/crm/userPhoto.jpg';

import { NoAuthCatalog } from './NoAuthCatalog';

const UserPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(true);
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
            {isAuth && (
              <>
                <Link
                  to="/myFavourite"
                  className={`cursor-pointer lg:mr-16 flex justify-end relative`}>
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
                  <svg
                    className="absolute -top-1 -right-2"
                    width="6"
                    height="7"
                    viewBox="0 0 6 7"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <circle cx="3" cy="3.5" r="3" fill="#DB1A1A" fillOpacity="0.8" />
                  </svg>
                </Link>
                <Link to="/userPage">
                  <img src={avatar} alt="avatar" className={`hidden lg:block mr-4`} />
                </Link>
              </>
            )}
          </>
        </Header>
        <Layout>
          {!isAuth ? (
            <NoAuthCatalog />
          ) : (
            <div className={`flex flex-col items-center justify-center`}>
              <h2>Пользователь № 1001</h2>
              <div className={`grid grid-cols-1 md:grid-cols-2 gap-7 py-5`}>
                <img src={userPhoto} className={`md:order-2`} alt="user" width={200} />

                <div className={`grid grid-cols-1 gap-5 text-sm`}>
                  <h2 className={`text-base font-semibold`}>Айгерим Ибрагимова</h2>
                  <span>Адрес: Мангилик Ел С 4.6, блок А</span>
                  <span>Номер телефона: +7 777 707 7070</span>
                  <span>
                    Предпочитаемое время доставки:{' '}
                    <span className={`border-b-2 border-dotted border-black`}>после 20:00</span>
                  </span>
                  <Button>Изменить данные</Button>
                </div>
              </div>
              <div className={`flex flex-col gap-3 my-10`}>
                <span className={`text-base font-bold `}>
                  Оставьте номер и мы Вам обязательно перезвоним!
                </span>
                <Input
                  inputType="default"
                  id="phone"
                  name="phone"
                  label="Номер телефона"
                  mask="+7 (999) 999-99-99"
                  placeholder="+7 (999) 999-99-99"
                />
                <Button>Перезвоните мне</Button>
              </div>
              <div className={`grid grid-cols-2 gap-x-10 sm:hidden`}>
                <Link to="/catalog">К каталогу</Link>
                <Link to="/catalog">К акциям</Link>
              </div>
            </div>
          )}
        </Layout>
      </div>
    </Sheet>
  );
};

export default UserPage;
