import { FC, ReactNode } from 'react';
// import { ReactComponent as Back } from '@/assets/back.svg';
import { IoIosArrowBack } from 'react-icons/io';

type Props = {
  children: ReactNode;
};

export const OrderHeader: FC<Props> = (props) => {
  return (
    <header className="bg-white w-full h-14 md:h-16 flex lg:h-16">
      <a href="#" className="items-center h-6 px-8 py-6">
        <IoIosArrowBack />
      </a>
      <h2 className="text-dark-blue text-base font-montserrat font-medium h-6 mt-5">
        {props.children}
      </h2>
    </header>
  );
};
