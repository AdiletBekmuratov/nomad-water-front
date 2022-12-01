import { FC, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Button } from '../Forms';

type Props = ForwardRefExoticComponent<RefAttributes<HTMLDivElement>> & {
  children: ReactNode;
  title: string;
  buttonOpenText: string;
  buttonCloseTest: string;
  buttonClassName?: string;
  titleClass?: string;
  contentClass?: string;
  isTwoButton?: boolean;
  secondButtonText?: string;
  openButtonStyle?: string;
};

export const Modal: FC<Props> = (props) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button buttonColor={props.openButtonStyle}>{props.buttonOpenText}</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed bg-black opacity-25 inset-0" />
        <Dialog.Content
          className={`bg-white p-5 rounded-2xl z-10 ${
            props.contentClass ? props.contentClass : 'w-full'
          } fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-screen-md`}>
          <Dialog.Title
            className={`text-center font-montserrat ${
              props.titleClass ? props.titleClass : 'text-sm font-bold'
            }`}>
            {props.title}
          </Dialog.Title>
          <Dialog.Description
            className={`font-montserrat ${props.className ? props.className : ''}`}>
            {props.children}
          </Dialog.Description>
          {props.isTwoButton ? (
            <div className="w-full flex justify-around gap-2.5 mb-4">
              <Dialog.Close>
                <Button
                  className="w-40 md:w-56"
                  buttonColor="bg-gray-300 font-montserrat font-semibold"
                  textColor="text-dark-blue">
                  {props.buttonCloseTest}
                </Button>
              </Dialog.Close>
              <Dialog.Close>
                <Button
                  className="w-40 md:w-56"
                  buttonColor="bg-dark-blue font-montserrat font-semibold">
                  {props.secondButtonText}
                </Button>
              </Dialog.Close>
            </div>
          ) : (
            <Dialog.Close>
              <Button className="w-24">{props.buttonCloseTest}</Button>
            </Dialog.Close>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
