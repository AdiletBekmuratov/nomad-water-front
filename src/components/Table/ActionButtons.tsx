import { FC } from 'react';
import { HiPencil, HiTrash } from 'react-icons/hi';
import { Button } from '../Forms';

interface IActionButtonsProps {
  handleEditClick?: Function;
  handleDeleteClick?: Function;
}

export const ActionButtons: FC<IActionButtonsProps> = ({ handleDeleteClick, handleEditClick }) => {
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
      </div>
    </>
  );
};
