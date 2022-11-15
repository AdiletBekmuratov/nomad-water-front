import { FC, useState } from 'react';
import Choose from './choose';

const Register: FC = () => {
  const [isPhone, setPhone] = useState('phone');

  const handleChange = (e: any) => {
    setPhone(e.target.value);
  };

  return (
    <section className="flex justify-center ">
      <div className="block">
        <h3 className="font-roboto text-center font-semibold text-lg">Регистрация</h3>
        <form action="">
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
        <Choose isPhone={isPhone} />
      </div>
    </section>
  );
};

export default Register;
