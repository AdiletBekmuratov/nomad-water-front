import Downshift, { ControllerStateAndHelpers } from 'downshift';
import { FC } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { Button } from './Button';

interface ISelectProps {
  initialSelectedItem?: object;
  items: object[];
  searchKey: string;
  id: string;
  label: string;
  onSelectionItemsChange: Function;
  onInputChange?:
    | ((inputValue: string, stateAndHelpers: ControllerStateAndHelpers<object>) => void)
    | undefined;
  customItem?: Function;
  inputValue: string | null | undefined;
}

export const Select: FC<ISelectProps> = ({
  id,
  initialSelectedItem,
  items,
  label,
  onSelectionItemsChange,
  searchKey,
  customItem,
  onInputChange,
  inputValue
}) => {
  const itemToString = (item: any) => {
    return item && item[searchKey] ? item[searchKey] : '';
  };

  return (
    <Downshift
      initialSelectedItem={initialSelectedItem}
      itemToString={itemToString}
      onChange={(selectedItem) => onSelectionItemsChange(selectedItem)}
      onInputValueChange={onInputChange}
      inputValue={inputValue}>
      {({
        getLabelProps,
        getInputProps,
        getItemProps,
        getToggleButtonProps,
        clearSelection,
        isOpen,
        selectedItem,
        getMenuProps,
        inputValue
      }) => {
        return (
          <div className="flex flex-col space-y-1 w-full">
            <label {...getLabelProps({ htmlFor: id, className: 'label' })}>
              <span className="label-text">{label}</span>
            </label>
            {label && (
              <label
                {...getLabelProps({ htmlFor: id })}
                className="font-montserrat text-dark-blue text-xs font-semibold">
                {label}
              </label>
            )}
            <div className="flex space-x-2">
              <input
                {...getInputProps({
                  id: id,
                  className: 'w-full outline-none ring-0 border p-2',
                  placeholder: 'Search'
                })}
                type="text"
              />

              <Button
                {...getToggleButtonProps({
                  className: 'btn btn-primary'
                })}>
                {isOpen ? 'close' : 'open'}
              </Button>

              {selectedItem ? (
                <Button
                  buttonColor="bg-red-500"
                  onClick={() => {
                    onSelectionItemsChange(null);
                    clearSelection();
                  }}>
                  <AiOutlineClose />
                </Button>
              ) : null}
            </div>
            <ul {...getMenuProps()} className={`rounded p-2 ${isOpen ? 'menu' : 'hidden'}`}>
              {isOpen
                ? items
                    .filter(
                      (item: any) =>
                        !inputValue || item[searchKey].toString().toLowerCase().includes(inputValue)
                    )
                    .map((item: any, index) => {
                      return (
                        <li
                          key={`menu-item-${index}`}
                          {...getItemProps({
                            item
                          })}
                          className="hover:opacity-75 mt-2">
                          {customItem ? customItem(item) : item[searchKey]}
                        </li>
                      );
                    })
                : null}
            </ul>
          </div>
        );
      }}
    </Downshift>
  );
};
