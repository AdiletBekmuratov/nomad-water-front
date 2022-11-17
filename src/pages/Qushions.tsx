//import { Button, Input } from '@/components/Forms';
import React from 'react';

export const Qushions = () => {
  return (
    <section className={`bg-light-blue text-dark-blue h-screen relative flex items-center`}>
      <div className={`w-1/3 h-2/3 mx-auto mt-44`}>
        <span className={`text-2xl leading-7 font-extrabold tracking-wide`}>
          Появился вопрос? Мы всегда готовы вам помочь!
        </span>
        {/* <form action="">
          <Input inputType="formik" />
          <Input inputType="formik" />
          <Button children /> 
        </form>*/}
      </div>
    </section>
  );
};
