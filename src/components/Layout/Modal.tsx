import { Dispatch, FC, ReactNode, SetStateAction, useEffect, useRef, HTMLAttributes } from 'react';
import { motion, PanInfo, useAnimation } from 'framer-motion';
import { usePrevious } from '@/hooks';

type Props = {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
} & Pick<HTMLAttributes<HTMLDivElement>, 'className'>;

export const Modal: FC<Props> = ({ children, isOpen, setIsOpen, className }) => {
  const nodeRef = useRef(null);
  const prevIsOpen = usePrevious(isOpen);
  const controls = useAnimation();

  const handleClose = async () => {
    await controls.start('hidden');
    setIsOpen(false);
  };

  const handleOpen = async () => {
    await controls.start('visible');
    setIsOpen(true);
  };

  const onDragEnd = async (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const shouldClose = info.velocity.y > 20 || (info.velocity.y >= 0 && info.point.y > 45);
    if (shouldClose) {
      handleClose();
    } else {
      handleOpen();
    }
  };

  useEffect(() => {
    if (prevIsOpen && !isOpen) {
      controls.start('hidden');
    } else if (!prevIsOpen && isOpen) {
      controls.start('visible');
    }
  }, [controls, isOpen, prevIsOpen]);

  useEffect(() => {
    const closeOnEscapeKey = (e: any) => (e.key === 'Escape' ? handleClose() : null);
    document.body.addEventListener('keydown', closeOnEscapeKey);
    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey);
    };
  }, [handleClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="fixed bg-black opacity-25 inset-0" onClick={handleClose} ref={nodeRef}></div>
      <motion.div
        ref={nodeRef}
        drag="y"
        onDragEnd={onDragEnd}
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
