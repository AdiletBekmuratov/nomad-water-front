import { Header } from '@/components/Layout/Header';
import { dataBottle } from '@/assets/dataBottle';
import { FC, useState } from 'react';
import { CardBottle } from '@/components/Catalog/CardBottle/CardBottle';
import { Link } from 'react-router-dom';

import { Layout } from '@/components/Layout';
import { Input } from '@/components/Forms';
import React from 'react';
import { Sheet } from '@/components/Layout/Sheet';

import { AiOutlineSearch } from 'react-icons/ai';
import { FiDelete } from 'react-icons/fi';
import logo from '../assets/crm/logoHead.png';
import avatar from '../assets/crm/avatar.png';


const Catalog: FC = () => {
  const [isFavourite, setIsFavourite] = useState<boolean>(false);
  const [value, setValue] = useState('');
  const searchArray = dataBottle.filter((items) =>
    items.title.toLowerCase().includes(value.toLowerCase())
  );
  const [isOpen, setIsOpen] = useState(false);
  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const filterStyle = `flex items-center justify-center py-2 px-3 rounded-2xl bg-white cursor-pointer`;
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

            <Link to="/myFavourite" className={`cursor-pointer lg:mr-16 flex justify-end relative`}>
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
        </Header>
        <Layout>
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-3 items-center`}>
            <Input
              id="search"
              name="search"
              value={value}
              onChange={onChangeInput}
              inputType="default"
              placeholder="Поиск..."
              className="rounded-2xl"
              leftIcon={<AiOutlineSearch />}
              rightIcon={
                <FiDelete
                  className={`cursor-pointer block ${value === '' && 'hidden'}`}
                  onClick={() => setValue('')}
                />
              }
            />

            <div className={`grid sm:grid-cols-3 gap-4 md:gap-4`}>
              <div className={`${filterStyle}`}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9.33 6H14.67C17.99 6 19.34 8.35 17.69 11.22L16.95 12.5C16.77 12.81 16.44 13 16.08 13H7.92C7.56 13 7.23 12.81 7.05 12.5L6.31 11.22C4.66 8.35 6.01 6 9.33 6Z"
                    fill="#023646"
                  />
                  <path
                    d="M8.79 14H15.22C15.61 14 15.85 14.42 15.65 14.75L15.01 15.85C13.36 18.72 10.64 18.72 8.99 15.85L8.35 14.75C8.16 14.42 8.4 14 8.79 14Z"
                    fill="#023646"
                  />
                </svg>
                <span>Вода</span>
              </div>
              <div className={`opacity-50 ${filterStyle}`}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9.33 6H14.67C17.99 6 19.34 8.35 17.69 11.22L16.95 12.5C16.77 12.81 16.44 13 16.08 13H7.92C7.56 13 7.23 12.81 7.05 12.5L6.31 11.22C4.66 8.35 6.01 6 9.33 6Z"
                    fill="#023646"
                  />
                  <path
                    d="M8.79 14H15.22C15.61 14 15.85 14.42 15.65 14.75L15.01 15.85C13.36 18.72 10.64 18.72 8.99 15.85L8.35 14.75C8.16 14.42 8.4 14 8.79 14Z"
                    fill="#023646"
                  />
                </svg>
                <span>Оборудование</span>
              </div>
              <div className={`opacity-50 ${filterStyle}`}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M9.33 6H14.67C17.99 6 19.34 8.35 17.69 11.22L16.95 12.5C16.77 12.81 16.44 13 16.08 13H7.92C7.56 13 7.23 12.81 7.05 12.5L6.31 11.22C4.66 8.35 6.01 6 9.33 6Z"
                    fill="#023646"
                  />
                  <path
                    d="M8.79 14H15.22C15.61 14 15.85 14.42 15.65 14.75L15.01 15.85C13.36 18.72 10.64 18.72 8.99 15.85L8.35 14.75C8.16 14.42 8.4 14 8.79 14Z"
                    fill="#023646"
                  />
                </svg>
                <span>Услуги</span>
              </div>
            </div>
          </div>

          <div className={`grid gap-x-4 gap-y-6 pt-6 grid-cols-2 sm:grid-cols-1 `}>
            {value.length === 0
              ? dataBottle
                  .slice(0, 4)
                  .map((items, id) => (
                    <CardBottle
                      key={id}
                      items={items}
                      cardType="catalog"
                      isFavourite={isFavourite}
                      setIsFavourite={setIsFavourite}
                    />
                  ))
              : searchArray.map((items, id) => (
                  <CardBottle
                    key={id}
                    items={items}
                    cardType="catalog"
                    isFavourite={isFavourite}
                    setIsFavourite={setIsFavourite}
                  />
                ))}
          </div>
          <div className={`border-b border-solid border-gray-300 mt-8 mb-4 md:border-none`}></div>
        </Layout>
      </div>
    </Sheet>
  );
};
export default Catalog;
