import { Button, Input } from '@/components/Forms';
import React from 'react';

import googleplay from '../assets/crm/GooglePlay_en.png';
import appstore from '../assets/crm/AppStore_en.png';

export const NoAuthorizations = () => {
  return (
    <div className={`grid grid-cols-1 gap-5 justify-center max-w-screen-sm mx-auto`}>
      <span className={`text-base lg:text-lg font-semibold text-center`}>
        Вы не авторизованы! Пожалуйста, авторизуйтесь или зарегистрируйтесь!
      </span>
      <Button>Зарегистрироваться</Button>
      <Button>Войти</Button>
      <p>Либо, скачайте мобильное приложение:</p>
      <div className="flex gap-5 justify-around">
        <img src={googleplay} width={150} alt="googleplay" />
        <img src={appstore} width={150} alt="appstore" />
      </div>

      <span className={`text-base font-bold`}>Оставьте номер и мы Вам обязательно перезвоним!</span>
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
