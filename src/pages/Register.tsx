import RegByEmail from '@/components/regByEmail';
import { RegByPhone } from '@/components/regByPhone';
import { FC, useState } from 'react';

const Register: FC = () => {
  const [isPhone, setPhone] = useState('phone');

  const handleChange = (e: any) => {
    setPhone(e.target.value);
  };

  return (
    <section className="flex justify-center ">
      <div className="block">
        <h3 className="font-roboto text-center font-semibold text-lg">Регистрация</h3>
        <form action="" className="flex justify-between">
          <input
            type="radio"
            name="handleCheck"
            id="phone"
            value={`phone`}
            checked={isPhone === 'phone' ? true : false}
            onChange={handleChange}
          />
          <label htmlFor="phone" className="font-roboto">
            По номеру
          </label>
          <input
            type="radio"
            name="handleCheck"
            id="email"
            value={`email`}
            checked={isPhone === 'email' ? true : false}
            onChange={handleChange}
          />
          <label htmlFor="email" className="font-roboto">
            По почте
          </label>
        </form>
        <div>{isPhone === 'phone' ? <RegByPhone /> : <RegByEmail />}</div>;
      </div>
    </section>
  );
};

export default Register;
