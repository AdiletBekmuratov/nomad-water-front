import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import Arrow from '../../assets/back.svg';

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  setIsOpen: Function;
  isOpen: boolean;
  isEdited?: boolean;
  setIsEdited?: Function;
};

export const Address: FC<Props> = ({ setIsOpen, isOpen, setIsEdited }) => {
  return (
    <div className="bg-white mt-4 w-4/5 md:w-11/12 mx-auto flex flex-row justify-between items-start gap-2 h-13 rounded-2xl lg:w-full">
      <h5 className="text-dark-blue font-montserrat font-semibold py-4 px-6">Адрес и Контакты</h5>
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          isOpen === true && setIsEdited(false);
        }}>
        {isOpen ? (
          <img className="-rotate-90 py-5 px-8" src={Arrow} alt="" />
        ) : (
          <img className="rotate-90 py-5 px-8" src={Arrow} alt="" />
        )}
      </button>
    </div>
  );
};
