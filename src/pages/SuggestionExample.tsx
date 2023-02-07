import { useDebounce } from '@/hooks';
import { OSM_URL } from '@/redux/http';
import { IAddressData } from '@/types';
import axios from 'axios';
import { useState } from 'react';
import AsyncSelect from 'react-select/async';

const SELECT_DATA = [
  { id: 1, name: 'Text1' },
  { id: 2, name: 'Text2' },
  { id: 3, name: 'Text3' },
  { id: 4, name: 'Text4' }
];

interface REACT_SELECT_ADDRESS {
  label: string;
  value: IAddressData;
}

const fetchAddressess = async (address: string) => {
  const resp = await axios.get<IAddressData[]>(`${OSM_URL}${address}`);
  let payload: REACT_SELECT_ADDRESS[] = resp.data.map((addressItem) => ({
    label: addressItem.display_name,
    value: addressItem
  }));
  return payload;
};

const SuggestionExample = () => {
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
    <div className="h-screen flex items-center justify-center">
      <div className="w-[400px]">
        <AsyncSelect
          cacheOptions
          loadOptions={promiseOptions}
          defaultOptions
          onInputChange={(value) => setInputData(value)}
          inputValue={inputData}
          onChange={(value) => console.log(value)}
        />
      </div>
    </div>
  );
};

export default SuggestionExample;
