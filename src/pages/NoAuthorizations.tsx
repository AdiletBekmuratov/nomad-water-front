import { Button, Input } from '@/components/Forms';
import React from 'react';

import googleplay from '../assets/crm/GooglePlay_en.png';
import appstore from '../assets/crm/AppStore_en.png';
import { Modal } from '@/components/UI';
import { RegByPhone } from '@/components/regByPhone';

export const NoAuthorizations = () => {
  return (
    <div className={`grid grid-cols-1 gap-5 justify-center max-w-screen-sm sm:px-36 mx-auto`}>
      <span className={`text-base lg:text-lg font-semibold text-center `}>
        Вы не авторизованы! Пожалуйста, авторизуйтесь или зарегистрируйтесь!
      </span>
      <Modal buttonOpenText="Зарегистрироваться" buttonCloseTest="Отмена">
        <div className={`flex flex-col gap-3`}>
          <span>Заполните все поля!</span>
          <RegByPhone />
        </div>
      </Modal>

      <Modal buttonOpenText="Войти" buttonCloseTest="Отмена">
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
      <p>Либо, скачайте мобильное приложение:</p>
      <div className="flex gap-5 justify-around">
        <img src={googleplay} width={130} alt="googleplay" />
        <img src={appstore} width={130} alt="appstore" />
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
      <Button>Перезвоните мне</Button>

      {/* <RegByPhone setIsAuth={setIsAuth} setUser={setUser} /> */}
    </div>
  );
};
