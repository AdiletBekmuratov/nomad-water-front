import { useGetALLProfilesQuery } from '@/redux/services/profile.service';
import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';

type Props = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  setIsOpen: Function;
  isOpen: boolean;
  isEdited?: boolean;
  setIsEdited?: Function;
};

export const Address: FC<Props> = (props) => {
  const { data: profiles = [], refetch } = useGetALLProfilesQuery();
  return (
    <div
      className="bg-white flex 
    justify-evenly items-center  gap-2 rounded-2xl lg:w-full">
      {profiles.length === 0 ? (
        <div>
          <h5 className="text-dark-blue font-montserrat font-semibold py-3 px-2">
            Куда доставить?
          </h5>
        </div>
      ) : (
        <div className="bg-white flex 
        justify-evenly items-center  gap-2 rounded-2xl lg:w-full">
          <h5 className="text-dark-blue font-montserrat font-semibold py-3 px-2">
            Куда доставить?
          </h5>
          <button
            onClick={() => {
              props?.setIsOpen(!props?.isOpen);
              //@ts-ignore
              props?.isOpen === true && props?.setIsEdited(false);
            }}>
            {!props?.isOpen ? (
              <AiOutlineArrowDown className="cursor-pointer w-5 h-5" />
            ) : (
              <AiOutlineArrowUp className="cursor-pointer w-5 h-5" />
            )}
          </button>
        </div>
      )}
    </div>
  );
};
