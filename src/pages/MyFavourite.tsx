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
    <Sheet isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className={`w-full bg-gray-200 text-dark-blue `}>
        <Header>
          <>
            <svg
              onClick={() => setIsOpen((prev) => !prev)}
              className={`hidden lg:block mr-16 cursor-pointer`}
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M3 7.5H21" stroke="#023646" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M3 12.5H21" stroke="#023646" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M3 17.5H21" stroke="#023646" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span className="mx-auto font-medium text-base leading-6 flex items-center gap-2">
              Мои избранные <FaRegHeart />
            </span>

            <Link to="/myAdmin">
              <img src={avatar} alt="avatar" className={`hidden lg:block`} />
            </Link>
          </>
        </Header>
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
      </div>
    </Sheet>
  );
};
export default MyFavourite;
