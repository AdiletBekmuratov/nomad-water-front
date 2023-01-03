import { FC } from 'react';
import { HiPencil, HiTrash } from 'react-icons/hi';
import { Button } from '../Forms';
import { AiFillFileImage } from 'react-icons/ai';

interface IActionButtonsProps {
  handleEditClick?: Function;
  handleDeleteClick?: Function;
  handleImageClick?: Function;
  handleConfirmClick?: Function;
}

export const ActionButtons: FC<IActionButtonsProps> = ({
  handleDeleteClick,
  handleEditClick,
  handleImageClick,
  handleConfirmClick
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
            <Button onClick={() => handleImageClick()} className="!rounded-full p-2 bg-medium-blue">
              <AiFillFileImage />
            </Button>
          </div>
        )}
        {handleConfirmClick && (
          <div data-tip="Delete" className="tooltip">
            <Button
              onClick={() => handleConfirmClick()}
              className="!rounded-full p-3 bg-medium-blue">
              Принять
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
