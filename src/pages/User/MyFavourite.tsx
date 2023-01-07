import { Input } from '@/components/Forms';
import { Layout } from '@/components/Layout';

import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { FiDelete } from 'react-icons/fi';

const MyFavourite = () => {
  const [value, setValue] = React.useState('');
  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  return (
    <Layout className={`text-xs`}>
      <Input
        id="search"
        name="search"
        value={value}
        onChange={onChangeInput}
        inputType="default"
        placeholder="Поиск..."
        className="rounded-full"
        leftIcon={<AiOutlineSearch />}
        rightIcon={
          <FiDelete
            className={`cursor-pointer block ${value === '' && 'hidden'}`}
            onClick={() => setValue('')}
          />
        }
      />
      <div></div>
    </Layout>
  );
};
export default MyFavourite;
