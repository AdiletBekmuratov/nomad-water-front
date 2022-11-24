import { FC } from 'react';
import Arrow from '../../assets/back.svg';

type Props = {
  setIsOpen: Function;
  isOpen: boolean;
};

export const Address: FC<Props> = ({ setIsOpen, isOpen }) => {
  return (
    <div className="bg-white mt-4 w-4/5 mx-auto flex flex-row justify-between items-start gap-2 h-13 rounded-2xl">
      <h5 className="text-dark-blue font-montserrat font-semibold py-4 px-6">Адрес и Контакты</h5>
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? (
          <img className="-rotate-90 py-5 px-8" src={Arrow} alt="" />
        ) : (
          <img className="rotate-90 py-5 px-8" src={Arrow} alt="" />
        )}
      </button>
    </div>
  );
};
