import { FC } from 'react';

import { Accordion, Address } from './index';

type Props = {
  setIsOpen: Function;
  isOpen: boolean;
  setIsEdited: Function;
  setIsValid: Function;
  isEdited: boolean;
  setAddress: Function;
};

export const OrderAcordion: FC<Props> = ({
  setIsOpen,
  isOpen,
  setIsEdited,
  setIsValid,
  isEdited,
  setAddress
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
          className="mx-auto mt-4 md:w-5/6 lg:order-3"
          setIsValid={setIsValid}
          setIsEdited={setIsEdited}
          isEdited={isEdited}
          setAddress={setAddress}
        />
      )}
    </div>
  );
};
