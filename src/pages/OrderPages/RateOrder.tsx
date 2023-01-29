import { Button } from '@/components/Forms';
import { Modal } from '@/components/Layout/Modal';
import { useRateOrderMutation } from '@/redux/services/base.service';
import { IOrder } from '@/types';
import React, { FC, useState, Fragment, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { AiFillStar, AiOutlineCloseCircle, AiOutlineStar } from 'react-icons/ai';

type Props = {
  isOpenModal: boolean;
  setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  data: IOrder;
};

type Rating = {
  value: number;
  checked: boolean;
};

const RateOrder: FC<Props> = ({ isOpenModal, setIsOpenModal, data }) => {
  const [rateOrder] = useRateOrderMutation();
  const [rating, setRating] = useState<Rating[]>([
    { value: 1, checked: false },
    { value: 2, checked: false },
    { value: 3, checked: false },
    { value: 4, checked: false },
    { value: 5, checked: false }
  ]);

  useEffect(() => {
    if (!isOpenModal) {
      setRating([
        { value: 1, checked: false },
        { value: 2, checked: false },
        { value: 3, checked: false },
        { value: 4, checked: false },
        { value: 5, checked: false }
      ]);
    }
  }, [isOpenModal]);

  const handleRate = async () => {
    let rate = rating.filter((r) => r.checked === true);
    rate.sort((b, a) => b.value - a.value);
    toast
      .promise(rateOrder({ id: data?.id, rating: rate[rate.length - 1].value }).unwrap(), {
        loading: 'Загрузка...',
        success: 'Ваш отзыв учтен',
        error: (err) => err.data
      })
      .finally(() => setIsOpenModal(false));
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
        {rating
          .sort((a, b) => a.value - b.value)
          .map((r, idx) => (
            <Fragment key={r.value}>
              <label htmlFor={`rating-${r.value}`} className="cursor-pointer">
                {rating[idx].checked === true ? (
                  <AiFillStar className="w-7 h-7 text-yellow-500" />
                ) : (
                  <AiOutlineStar className="w-7 h-7 hover:text-yellow-500" />
                )}
              </label>
              <input
                type="checkbox"
                id={`rating-${r.value}`}
                value={r.value}
                hidden
                onChange={() =>
                  setRating((prev) => {
                    let newRate = prev.filter((rate) => rate.value !== r.value);
                    newRate.push({ value: r.value, checked: !r.checked });
                    for (let i = 0; i < idx; i++) {
                      newRate[i].checked = !r.checked;
                    }

                    return [...newRate];
                  })
                }
              />
            </Fragment>
          ))}
      </div>
      <div className="w-1/3 mx-auto mt-4">
        <Button onClick={handleRate}>Оценить</Button>
      </div>
    </Modal>
  );
};

export default RateOrder;
