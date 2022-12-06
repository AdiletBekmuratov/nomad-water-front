import { Button, Input } from '@/components/Forms';
import React from 'react';

import { RegByPhone } from '@/components/regByPhone';

import googleplay from '../assets/crm/GooglePlay_en.png';
import appstore from '../assets/crm/AppStore_en.png';
import { Modal } from '@/components/Layout/Modal';

export const NoAuthorizations = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [buttonValue, setButtonValue] = React.useState('');
  return (
    <div className={`grid grid-cols-1 gap-5 justify-center max-w-screen-sm sm:px-36 mx-auto`}>
      <span className={`text-base lg:text-lg font-semibold text-center `}>
        Вы не авторизованы! Пожалуйста, авторизуйтесь или зарегистрируйтесь!
      </span>

      <Button
        onClick={() => {
          setIsOpen(true);
          setButtonValue('sign');
        }}>
        Войти
      </Button>
      {buttonValue === 'sign' && (
        <Modal isOpenModal={isOpen} setIsOpenModal={setIsOpen}>
          <div className={`flex flex-col gap-3`}>
            <span className={`text-lg font-semibold`}>Введите логин и пароль</span>
            <Input
              inputType="default"
              id="phone"
              name="phone"
              label="Номер телефона"
              mask="+7 (999) 999-99-99"
              placeholder="+7 (999) 999-99-99"
            />
            <Input
              inputType="default"
              id="password"
              name="password"
              type={'password'}
              label="Пароль"
            />
            <Button>Войти</Button>
          </div>
        </Modal>
      )}

      <Button
        onClick={() => {
          setIsOpen(true);
          setButtonValue('register');
        }}>
        Зарегистрироваться
      </Button>
      {buttonValue === 'register' && (
        <Modal isOpenModal={isOpen} setIsOpenModal={setIsOpen}>
          <div className={`flex flex-col gap-3`}>
            <span>Заполните все поля!</span>
            <RegByPhone />
          </div>
        </Modal>
      )}

      <p>Либо, скачайте мобильное приложение:</p>
      <div className="flex gap-5 justify-around">
        <img src={googleplay} width={130} alt="googleplay" />
        <img src={appstore} width={130} alt="appstore" />
      </div>

      <Button
        onClick={() => {
          setIsOpen(true);
          setButtonValue('call');
        }}>
        Перезвоните мне
      </Button>
      {buttonValue === 'call' && (
        <Modal isOpenModal={isOpen} setIsOpenModal={setIsOpen}>
          <div className={`flex flex-col gap-5`}>
            <div className={`sm:hidden flex justify-center`}>
              <svg
                width="60"
                height="4"
                viewBox="0 0 60 4"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <rect width="60" height="4" rx="2" fill="#E6EAEE" />
              </svg>
            </div>

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
            <Button>Готово! </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};
