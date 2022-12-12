import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FiDelete } from 'react-icons/fi';

import { dataUsers } from '@/assets/dataUsers';
import { EnamSort } from '@/assets/types/types';
import { Button, Input } from '@/components/Forms';
import { Layout } from '@/components/Layout';
import { Modal } from '@/components/Layout/Modal';

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
  const [value, setValue] = React.useState('');
  const [isSelected, setIsSelected] = React.useState('');
  const [isOpenModal, setIsOpenModal] = React.useState(false);
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
                <Link
                  to="/userPage"
                  key={items.id}
                  className={`bg-white rounded-2xl py-2 px-4 flex flex-col gap-1`}>
                  <span className={`font-semibold`}>ID: {items.id}</span>
                  <span>
                    {items.firstName} {items.name}
                  </span>
                  <span>{items.phone}</span>
                </Link>
              ))
            : searchArray.map((items) => (
                <Link
                  to="/userPage"
                  key={items.id}
                  className={`bg-white rounded-2xl py-2 px-4 flex flex-col gap-1`}>
                  <span className={`font-semibold`}>ID: {items.id}</span>
                  <span>
                    {items.firstName} {items.name}
                  </span>
                  <span>{items.phone}</span>
                </Link>
              ))}
        </div>
      </Layout>
      <Modal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} className={`sm:px-36`}>
        <div className={`grid grid-cols-1 gap-2 sm:gap-3 xl:gap-5`}>
          <svg
            className={`mx-auto sm:hidden`}
            width="60"
            height="4"
            viewBox="0 0 60 4"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <rect width="60" height="4" rx="2" fill="#E6EAEE" />
          </svg>
          <h2 className="font-semibold text-sm text-center">Новый пользователь</h2>
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

          <Button>Добавить</Button>
          <Button
            onClick={() => {
              setIsOpenModal(false);
            }}>
            Отмена
          </Button>
        </div>
      </Modal>
    </>
  );
};
export default Users;
