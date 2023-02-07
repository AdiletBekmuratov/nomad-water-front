import Downshift from 'downshift';
import { FC } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

interface ISelectProps {
  initialSelectedItem?: object;
  items: object[];
  searchKey: string;
  id: string;
  label: string;
  onSelectionItemsChange: Function;
  customItem?: Function;
}

export const Select: FC<ISelectProps> = ({
  id,
  initialSelectedItem,
  items,
  label,
  onSelectionItemsChange,
  searchKey,
  customItem
}) => {
  const itemToString = (item: any) => {
    return item && item[searchKey] ? item[searchKey] : '';
  };

  return (
    <Downshift
      initialSelectedItem={initialSelectedItem}
      itemToString={itemToString}
      onChange={(selectedItem) => onSelectionItemsChange(selectedItem)}>
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
          <div>
            <label {...getLabelProps({ htmlFor: id, className: 'label' })}>
              <span className="label-text">{label}</span>
            </label>
            <div className="flex space-x-2">
              <input
                {...getInputProps({
                  id: id,
                  className: 'input input-bordered w-full',
                  placeholder: 'Search'
                })}
                type="text"
              />

              <button
                {...getToggleButtonProps({
                  className: 'btn btn-primary'
                })}>
                {isOpen ? 'close' : 'open'}
              </button>

              {selectedItem ? (
                <button
                  className="btn btn-error"
                  onClick={() => {
                    onSelectionItemsChange(null);
                    clearSelection();
                  }}>
                  <AiOutlineClose />
                </button>
              ) : null}
            </div>
            <ul {...getMenuProps()} className={`bg-base-200 ${isOpen ? 'menu' : 'hidden'}`}>
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
                            item,
                            className: `rounded`
                          })}>
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
