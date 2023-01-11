import { FC } from 'react';

import { Accordion, Address } from './index';
import { IUsersOrder } from '@/types';

type Props = {
  setIsOpen: Function;
  isOpen: boolean;
  setIsEdited: Function;
  setIsValid: Function;
  isEdited: boolean;
  setAddress: Function;
  initial?: IUsersOrder;
};

export const OrderAcordion: FC<Props> = ({
  setIsOpen,
  isOpen,
  setIsEdited,
  setIsValid,
  isEdited,
  setAddress,
  initial
}) => {
  return (
    <div className="lg:order-3 col-span-2 lg:row-start-2">
      <Address
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        setIsEdited={setIsEdited}
        isEdited={isEdited}
      />
      {isOpen && (
        <Accordion
          className="mx-auto mt-4 md:w-5/6 lg:order-3 lg:w-11/12"
          setIsValid={setIsValid}
          setIsEdited={setIsEdited}
          isEdited={isEdited}
          setAddress={setAddress}
          initial={initial}
        />
      )}
    </div>
  );
};
