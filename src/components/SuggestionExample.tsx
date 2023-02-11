import { OSM_URL } from '@/redux/http';
import { IAddressData } from '@/types';
import axios from 'axios';
import { FC, useState } from 'react';
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

  const promiseOptions = (
    inputValue: string,
    callback: (options: REACT_SELECT_ADDRESS[]) => void
  ) => {
    setTimeout(async () => {
      callback(await fetchAddressess(inputValue));
    }, 1000);
  };

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
        
        loadOptions={promiseOptions}
        defaultOptions
        placeholder='Введите улицу, дом и выберите адрес'
        onInputChange={(value) => setInputData(value)}
        inputValue={inputData}
        onChange={(value) => {
          setAddress &&
            setAddress({
              longitude: value?.value.lon,
              latitude: value?.value.lat,
              houseNumber: value?.value.address.house_number,
              street: value?.value.address.road
            });
        }}
      />
    </div>
  );
};

export default SuggestionExample;
