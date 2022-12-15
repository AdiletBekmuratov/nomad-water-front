import { FC, Dispatch, SetStateAction } from 'react';
import { Button } from '../Forms';
import { Modal } from '../Layout/Modal';

interface IDeleteModalProps {
  handleDelete: Function;
  loading: boolean;
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
}

export const DeleteModal: FC<IDeleteModalProps> = ({
  handleDelete,
  loading,
  setVisible,
  visible
}) => {
  return (
    <Modal isOpenModal={visible} setIsOpenModal={setVisible}>
      <p>Подвердите удаление?</p>
      <Button onClick={() => handleDelete()} loading={loading}>
        Подтвердить
      </Button>
    </Modal>
  );
};
