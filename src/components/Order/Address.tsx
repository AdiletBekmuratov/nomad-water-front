import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import Arrow from '@/assets/back.svg';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  setIsOpen: Function;
  isOpen: boolean;
  isEdited?: boolean;
  setIsEdited?: Function;
};

export const Address: FC<Props> = (props) => {
  return (
    <div
      className="bg-white  w-4/5 md:w-11/12 mx-auto flex 
    justify-evenly items-center  gap-2 h-13 rounded-2xl lg:w-full">
      <h5 className="text-dark-blue font-montserrat font-semibold py-4 px-2">Куда доставить?</h5>
      <button
        onClick={() => {
          props?.setIsOpen(!props?.isOpen);
          //@ts-ignore
          props?.isOpen === true && props?.setIsEdited(false);
        }}>
        {/* {!props?.isOpen ? (
          <AiOutlineArrowDown className="cursor-pointer w-5 h-5" />
        ) : (
          <AiOutlineArrowUp className="cursor-pointer w-5 h-5" />
        )} */}
      </button>
    </div>
  );
};
