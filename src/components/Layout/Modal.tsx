import { Dispatch, FC, ReactNode, SetStateAction, useEffect, useRef, HTMLAttributes } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { usePrevious } from '@/hooks';

type Props = {
  children: ReactNode;
  isOpenModal: boolean;
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
} & Pick<HTMLAttributes<HTMLDivElement>, 'className'>;

export const Modal: FC<Props> = ({ children, isOpenModal, setIsOpenModal, className }) => {
  const nodeRef = useRef(null);
  const prevIsOpen = usePrevious(isOpenModal);
  const controls = useAnimation();

  const handleClose = async () => {
    await controls.start('hidden');
    setIsOpenModal(false);
  };

  // const handleOpen = async () => {
  //   await controls.start('visible');
  //   setIsOpenModal(true);
  // };

  // const onDragEnd = async (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
  //   const shouldClose = info.velocity.y > 20 || (info.velocity.y >= 0 && info.point.y > 45);
  //   if (shouldClose) {
  //     handleClose();
  //   } else {
  //     handleOpen();
  //   }
  // };

  useEffect(() => {
    if (prevIsOpen && !isOpenModal) {
      controls.start('hidden');
    } else if (!prevIsOpen && isOpenModal) {
      controls.start('visible');
    }
  }, [controls, isOpenModal, prevIsOpen]);

  useEffect(() => {
    const closeOnEscapeKey = (e: any) => (e.key === 'Escape' ? handleClose() : null);
    document.body.addEventListener('keydown', closeOnEscapeKey);
    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey);
    };
  }, [handleClose]);

  if (!isOpenModal) {
    return null;
  }

  return (
    <>
      <div className="fixed bg-black opacity-25 inset-0" onClick={handleClose} ref={nodeRef}></div>
      <motion.div
        ref={nodeRef}
        drag="y"
        //onDragEnd={onDragEnd}
        initial="hidden"
        animate={controls}
        transition={{
          type: 'spring',
          damping: 40,
          stiffness: 400
        }}
        variants={{
          visible: { y: 0 },
          hidden: { y: '100%' }
        }}
        dragConstraints={{ top: 0 }}
        dragElastic={0.2}
        className={`bg-white p-5 rounded-t-2xl sm:rounded-2xl z-10 fixed w-full left-0 bottom-0 
        sm:!top-1/2 sm:!left-1/2 sm:!bottom-auto sm:!-translate-x-1/2 sm:!-translate-y-1/2 sm:max-w-screen-sm
        ${className}`}>
        {children}
      </motion.div>
    </>
  );
};
