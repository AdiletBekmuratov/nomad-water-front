import { Button } from '@/components/Forms';
import { Modal } from '@/components/Layout/Modal';
import { useRateOrderMutation } from '@/redux/services/base.service';
import { IOrder } from '@/types';
import { ICourierOrder } from '@/types/courier.types';
import React, { FC, useState, Fragment, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { AiFillStar, AiOutlineCloseCircle, AiOutlineStar } from 'react-icons/ai';

type Props = {
  isOpenModal: boolean;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  data: ICourierOrder;
};

type Rating = {
  value: number;
  checked: boolean;
};

const RateOrder: FC<Props> = ({ isOpenModal, setIsOpenModal, data }) => {
  const [rateOrder] = useRateOrderMutation();
  const [rating, setRating] = useState<number>(0);

  useEffect(() => {
    if (!isOpenModal) {
      setRating(0);
    }
  }, [isOpenModal]);

  const handleRate = async () => {
    toast
      .promise(rateOrder({ id: data?.id, rating }).unwrap(), {
        loading: 'Загрузка...',
        success: 'Ваш отзыв учтен',
        error: (err) => err.data
      })
      .finally(() => {
        setIsOpenModal(false);
      });
  };

  return (
    <Modal isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal}>
      <div className="flex items-center justify-between">
        <h2 className={`text-center font-montserrat`}>Оцените заказ</h2>
        <button
          onClick={() => {
            setIsOpenModal(false);
          }}>
          <AiOutlineCloseCircle className={`w-5 h-5 md:w-7 md:h-7 hover:text-blue-500`} />
        </button>
      </div>
      <div className="w-full flex justify-center">
        {new Array(5)
          .fill(0)
          .map((item, index) =>
            rating - 1 >= index ? (
              <AiFillStar
                key={`filled-${index}`}
                className="w-7 h-7 text-yellow-500 cursor-pointer"
                onClick={() => setRating(index + 1)}
              />
            ) : (
              <AiOutlineStar
                key={`oullined-${index}`}
                className="w-7 h-7 hover:text-yellow-500 cursor-pointer"
                onClick={() => setRating(index + 1)}
              />
            )
          )}
      </div>
      <div className="w-1/3 mx-auto mt-4">
        <Button onClick={handleRate}>Оценить</Button>
      </div>
    </Modal>
  );
};

export default RateOrder;
