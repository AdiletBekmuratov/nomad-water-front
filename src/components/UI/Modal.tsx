import { FC, ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Button } from '../Forms';

type Props = {
  children: ReactNode;
  title: string;
  buttonOpenText: string;
  buttonCloseTest: string;
};

export const Modal: FC<Props> = (props) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button>{props.buttonOpenText}</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed bg-black opacity-50 inset-0" />
        <Dialog.Content className="bg-white p-5 rounded-md z-10 w-full fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-screen-md">
          <Dialog.Title className="text-center font-montserrat text-lg font-bold">
            {props.title}
          </Dialog.Title>
          <Dialog.Description className="font-montserrat">{props.children}</Dialog.Description>
          <Dialog.Close>
            <Button className="w-24">{props.buttonCloseTest}</Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
