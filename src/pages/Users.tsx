import { dataUsers } from '@/assets/dataUsers';
import { Header } from '@/components/Layout/Header';
import { Sheet } from '@/components/Layout/Sheet';
import { EnamSort } from '@/types/types';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Input } from '@/components/Forms';
import { Layout } from '@/components/Layout';

import { AiOutlineSearch } from 'react-icons/ai';
import { FiDelete } from 'react-icons/fi';
import { PopUp } from '@/components/Layout/PopUp';

import avatar from '../assets/crm/avatar.png';

type SortItem = {
  name: string;
  sortProperty: EnamSort;
};
export const sortArr: SortItem[] = [
  { name: 'Покупатели', sortProperty: EnamSort.buyers },
  { name: 'Курьеры', sortProperty: EnamSort.couriers },
  { name: 'Работник склада', sortProperty: EnamSort.worker },
  { name: 'Мастер склада', sortProperty: EnamSort.master }
];

const Users = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [value, setValue] = React.useState('');
  const [isSelected, setIsSelected] = React.useState('Покупатели');
  const [isOpenPopUp, setIsOpenPopUp] = React.useState(false);
  const onClickFilter = (name: string) => {
    setIsSelected(name);
  };
  const searchArray = dataUsers.filter((items) =>
    items.firstName.toLowerCase().includes(value.toLowerCase())
  );
  const sortUsersArray = dataUsers.filter((items) =>
    items.role.toLowerCase().includes(isSelected.toLowerCase())
  );
  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const styleBaseFilter = `flex items-center justify-start lg:justify-center gap-2 py-2 px-4 rounded-3xl bg-white cursor-pointer`;

  return (
    <>
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
              <span className="mx-auto font-medium text-base leading-6">Пользователи</span>
              <button
                className={`flex gap-2 px-2 cursor-pointer`}
                onClick={() => setIsOpenPopUp(!isOpenPopUp)}>
                <span className={`hidden sm:block`}>Добавить</span>
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <rect width="28" height="28" rx="14" fill="#023646" />
                  <path
                    d="M13.353 17.4826V10.7374H14.6466V17.4826H13.353ZM10.5502 14.726V13.5094H17.4494V14.726H10.5502Z"
                    fill="white"
                  />
                </svg>
              </button>
              <Link to="/myAdmin">
                <img src={avatar} alt="avatar" className={`hidden lg:block`} />
              </Link>
            </>
          </Header>
          <Layout className={`text-xs`}>
            <Input
              id="search"
              name="search"
              value={value}
              onChange={onChangeInput}
              inputType="default"
              placeholder="Поиск..."
              className="rounded-full"
              leftIcon={<AiOutlineSearch />}
              rightIcon={
                <FiDelete
                  className={`cursor-pointer block ${value === '' && 'hidden'}`}
                  onClick={() => setValue('')}
                />
              }
            />

            <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 mt-3 mb-6`}>
              {sortArr.map((items) => (
                <button
                  key={items.name}
                  className={`${styleBaseFilter} ${items.name !== isSelected && 'opacity-50'}`}
                  onClick={() => onClickFilter(items.name)}>
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
                  <span>{items.name}</span>
                </button>
              ))}
            </div>
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3`}>
              {value === ''
                ? sortUsersArray.map((items) => (
                    <div
                      key={items.id}
                      className={`bg-white rounded-2xl py-2 px-4 flex flex-col gap-1`}>
                      <span className={`font-semibold`}>ID: {items.id}</span>
                      <span>
                        {items.firstName} {items.name}
                      </span>
                      <span>{items.phone}</span>
                    </div>
                  ))
                : searchArray.map((items) => (
                    <div
                      key={items.id}
                      className={`bg-white rounded-2xl py-2 px-4 flex flex-col gap-1`}>
                      <span className={`font-semibold`}>ID: {items.id}</span>
                      <span>
                        {items.firstName} {items.name}
                      </span>
                      <span>{items.phone}</span>
                    </div>
                  ))}

              {/* {isOpenPopUp && <ModalCat isOpenPopUp={isOpenPopUp} setIsOpenPopUp={setIsOpenPopUp} />} */}
            </div>
          </Layout>
        </div>
      </Sheet>
      <PopUp setIsOpenPopUp={setIsOpenPopUp} isOpenPopUp={isOpenPopUp}>
        <div
          className={`grid grid-cols-1 gap-2 sm:gap-3 xl:gap-5 w-screen sm:w-full py-5 px-6 lg:layout`}>
          <svg
            className={`mx-auto sm:hidden`}
            width="60"
            height="4"
            viewBox="0 0 60 4"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <rect width="60" height="4" rx="2" fill="#E6EAEE" />
          </svg>
          <h2 className="font-semibold text-sm text-center">Новый курьер</h2>
          <Input
            id="name"
            name="name"
            label="имя"
            inputType="default"
            placeholder="Иван"
            className="rounded-2xl"
          />
          <Input
            id="firstName"
            name="firstName"
            label="фамилия"
            inputType="default"
            placeholder="Петров"
            className="rounded-2xl"
          />
          <Input
            id="middleName"
            name="middleName"
            label="Отчество"
            inputType="default"
            placeholder="Андреевич"
            className="rounded-2xl"
          />
          <Input
            id="phone"
            name="phone"
            label="номер телефона"
            inputType="default"
            type={'tel'}
            mask="+7 (999) 999-99-99"
            placeholder="+7 (999) 999-99-99"
            className="rounded-2xl"
          />
          <Input
            id="car"
            name="car"
            label="машина"
            inputType="default"
            placeholder="Car info"
            className="rounded-2xl"
          />
          <div className={`grid grid-cols-1 gap-2 xl:mt-7 sm:grid-cols-2`}>
            <Button>Добавить</Button>
            <Button>Отмена</Button>
          </div>
        </div>
      </PopUp>
    </>
  );
};
export default Users;
