import { FC } from 'react';
import { HiPencil, HiTrash } from 'react-icons/hi';
import { Button } from '../Forms';
import { AiFillFileImage } from 'react-icons/ai';

interface IActionButtonsProps {
  handleEditClick?: Function;
  handleDeleteClick?: Function;
  handleImageClick?: Function;
  handleConfirmClick?: Function;
  handleCompleteClick?: Function;
  handleCancelOrder?: Function;
  handleRating?: Function;
  ratingId?: number;
  setRating?: Function | undefined;
}

export const ActionButtons: FC<IActionButtonsProps> = ({
  handleDeleteClick,
  handleEditClick,
  handleImageClick,
  handleConfirmClick,
  handleCompleteClick,
  handleCancelOrder,
  handleRating,
  ratingId,
  setRating
}) => {
  return (
    <>
      <div className="flex space-x-2">
        {handleEditClick && (
          <div data-tip="Edit" className="tooltip">
            <Button
              onClick={() => handleEditClick()}
              className={`bg-medium-blue !rounded-full p-2`}>
              <HiPencil />
            </Button>
          </div>
        )}
        {handleDeleteClick && (
          <div data-tip="Delete" className="tooltip">
            <Button
              onClick={() => handleDeleteClick()}
              className={`bg-medium-blue !rounded-full p-2`}>
              <HiTrash />
            </Button>
          </div>
        )}
        {handleImageClick && (
          <div data-tip="Delete" className="tooltip">
            <Button
              onClick={() => handleImageClick()}
              className={`!rounded-full p-2 bg-medium-blue`}>
              <AiFillFileImage />
            </Button>
          </div>
        )}
        {handleConfirmClick && (
          <div data-tip="Delete" className="tooltip">
            <Button
              onClick={() => handleConfirmClick()}
              className={`!rounded-full p-3 bg-medium-blue`}>
              Принять
            </Button>
          </div>
        )}
        {handleCompleteClick && (
          <div data-tip="Delete" className="tooltip">
            <Button
              onClick={() => handleCompleteClick()}
              className={`!rounded-full p-3 bg-medium-blue`}>
              Подтвердить
            </Button>
          </div>
        )}
        {handleCancelOrder && (
          <div data-tip="Delete" className="tooltip">
            <Button
              onClick={() => handleCancelOrder()}
              className={`!rounded-full p-3 bg-medium-blue`}>
              Отменить
            </Button>
          </div>
        )}
        {handleRating && (
          <div data-tip="Rate" className="tooltip">
            <Button onClick={() => handleRating()} className={`!rounded-full p-3 bg-medium-blue`}>
              Оценить
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
