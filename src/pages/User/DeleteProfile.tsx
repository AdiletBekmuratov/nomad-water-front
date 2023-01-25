import { Button } from '@/components/Forms';
import { Modal } from '@/components/Layout/Modal';
import { useDeleteProfileMutation } from '@/redux/services/profile.service';
import { IProfile } from '@/types';
import { FC, Dispatch, SetStateAction } from 'react';
import { toast } from 'react-hot-toast';
import { AiOutlineCloseCircle } from 'react-icons/ai';

interface IDeleteProfileProps {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  data: IProfile;
}

export const DeleteProfile: FC<IDeleteProfileProps> = ({ setVisible, visible, data }) => {
  const [deleteProduct, { isLoading: isLoadingDelete }] = useDeleteProfileMutation();
  const handleDelete = async () => {
    toast
      .promise(deleteProduct(data!.id!).unwrap(), {
        loading: 'Loading',
        success: 'Удалено',
        error: (error) => JSON.stringify(error, null, 2)
      })
      .finally(() => {
        setVisible(false);
      });
  };
  return (
    <Modal isOpenModal={visible} setIsOpenModal={setVisible}>
      <div className="flex items-center justify-between">
        <h2 className={`text-center`}>Подтверждение удаления адреса</h2>
        <button
          onClick={() => {
            setVisible(false);
          }}>
          <AiOutlineCloseCircle className={`w-5 h-5 md:w-7 md:h-7 hover:text-blue-500`} />
        </button>
      </div>
      <h2 className={`text-2xl py-12 text-center font-normal text-red-600`}>Удалить {`${data.name}`}?</h2>

      <div className={`flex gap-3 justify-between`}>
        <Button onClick={() => handleDelete()} loading={isLoadingDelete}>
          Удалить
        </Button>
        <Button
          onClick={() => {
            setVisible(false);
          }}>
          Отмена
        </Button>
      </div>
    </Modal>
  );
};
