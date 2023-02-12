import { OSM_URL } from '@/redux/http';
import { IAddressData } from '@/types';
import axios from 'axios';
import { FC, useState, useCallback } from 'react';
import { SingleValue } from 'react-select';
import AsyncSelect from 'react-select/async';

interface REACT_SELECT_ADDRESS {
  label: string;
  value: IAddressData;
}

interface Props {
  setAddress?: Function;
  label?: string;
  id?: string;
}

const fetchAddressess = async (address: string) => {
  const resp = await axios.get<IAddressData[]>(`${OSM_URL}${address}`);
  let payload: REACT_SELECT_ADDRESS[] = resp.data.map((addressItem) => ({
    label: addressItem.display_name,
    value: addressItem
  }));
  return payload;
};

const SuggestionExample: FC<Props> = ({ setAddress, label, id }) => {
  const [inputData, setInputData] = useState('');
  const [debouncedCallback, setDebouncedCallback] = useState<any>(null);
  const [valueV, setValue] = useState<
    SingleValue<{
      label: string;
      value: IAddressData;
    }>
  >();

  const fetchAddressesWithDebouncing = useCallback(
    (inputValue: string, callback: (options: REACT_SELECT_ADDRESS[]) => void) => {
      if (debouncedCallback) {
        clearTimeout(debouncedCallback);
      }

      setDebouncedCallback(
        setTimeout(async () => {
          const options = await fetchAddressess(inputValue);
          callback(options);
        }, 1000)
      );
    },
    [debouncedCallback]
  );

  return (
    <div className="w-full">
      {label && (
        <label className="font-montserrat text-dark-blue text-xs font-semibold" htmlFor={id}>
          {label}
        </label>
      )}
      <AsyncSelect
        id={id ? id : ''}
        cacheOptions
        loadOptions={(inputValue, callback) => fetchAddressesWithDebouncing(inputValue, callback)}
        defaultOptions
        placeholder="Введите улицу, дом и выберите адрес"
        onInputChange={(value) => setInputData(value)}
        inputValue={inputData}
        onChange={(
          value: SingleValue<{
            label: string;
            value: IAddressData;
          }>
        ) => {
          setValue(value);
          setAddress &&
            setAddress({
              longitude: value ? (value.value.lon ? value.value.lon : '') : '',
              latitude: value ? (value.value.lat ? value.value.lat : '') : '',
              houseNumber: value
                ? value.value.address.house_number
                  ? value.value.address.house_number
                  : ''
                : '',
              street: value
                ? value.value.address.road
                  ? value.value.address.road
                  : ''
                : ''
            });
        }}
      />
    </div>
  );
};

export default SuggestionExample;
