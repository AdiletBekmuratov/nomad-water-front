import { FC, ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { Button } from '../Forms';

type Props = ForwardRefExoticComponent<RefAttributes<HTMLDivElement>> & {
  children: ReactNode;
  buttonItem?: ReactNode;
  title?: string;
  buttonOpenText?: string;
  buttonCloseTest?: string;
  buttonClassName?: string;
  titleClass?: string;
  contentClass?: string;
  isTwoButton?: boolean;
  secondButtonText?: string;
  openButtonStyle?: string;
  className?: string;
  closeButtonStyle?: string;
};

export const Modal: FC<Props> = (props) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <div className={`flex items-center gap-2 cursor-pointer`}>
          <Button buttonColor={props.openButtonStyle}>{props.buttonOpenText}</Button>
          {props.buttonItem}
        </div>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed bg-black opacity-25 inset-0" />
        <Dialog.Content
          className={`bg-white p-5 sm:px-48 rounded-2xl z-10 ${
            props.contentClass ? props.contentClass : 'w-full'
          } fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-screen-sm`}>
          <div className={`flex flex-col gap-3`}>
            {props.children}
            {props.buttonOpenText && <Button>{props.buttonOpenText}</Button>}
            {props.buttonCloseTest && (
              <Dialog.Close>
                <Button>{props.buttonCloseTest}</Button>
              </Dialog.Close>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
