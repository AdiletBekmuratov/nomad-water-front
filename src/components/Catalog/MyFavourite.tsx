import { Input } from '@/components/Forms';
import { Header, Layout } from '@/components/Layout';
import { Sheet } from '@/components/Layout/Sheet';
import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FiDelete } from 'react-icons/fi';
import { FaRegHeart } from 'react-icons/fa';

import avatar from '../assets/crm/avatar.png';

const MyFavourite = () => {
  const [isOpen, setIsOpen] = React.useState(false);
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
    </Layout>
  );
};
export default MyFavourite;
