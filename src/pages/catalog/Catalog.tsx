import { CardBottle } from '@/pages/catalog/CardBottle';
import { FC, useState } from 'react';

import React from 'react';
import { useGetAllProductsQuery, useGetProductCategoryQuery } from '@/redux/services/base.service';
import { IProduct } from '@/types';
import Loader from '@/components/Landing/Loader';
import { Input } from '@/components/Forms';
import { Layout } from '@/components/Layout';

import { AiOutlineSearch } from 'react-icons/ai';
import { FiDelete } from 'react-icons/fi';
import { useGetUserFavoriteQuery } from '@/redux/services/user.service';

const Catalog: FC = () => {
  //категория товаров
  const { data: categories = [] } = useGetProductCategoryQuery();
  //все товары и услуги
  const { data: products = [], isLoading } = useGetAllProductsQuery();
  const product = products.map((item: IProduct) => item);
  //получить товары по категории
  // const [categoriesId, setCategoriesId] = useState(0);

  //поиск по названию
  const [value, setValue] = useState('');
  const searchArrName = products.filter((items: IProduct) =>
    items.productName.toLowerCase().includes(value.toLowerCase())
  );
  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const categoriesButStyle = `flex items-center justify-center py-2 px-3 rounded-2xl bg-white cursor-pointer`;
  const { data: favorites = [] } = useGetUserFavoriteQuery();
  const favoriteProductsId = favorites.map((obj) => obj.id);
  let isFavor: boolean = false;
  if (isLoading) {
    return <Loader />;
  }
  return (
    <Layout>
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-3 items-center `}>
        <Input
          id="search"
          name="search"
          value={value}
          onChange={onChangeInput}
          inputType="default"
          placeholder="Поиск..."
          className="rounded-2xl"
          leftIcon={<AiOutlineSearch />}
          rightIcon={
            <FiDelete
              className={`cursor-pointer block ${value === '' && 'hidden'}`}
              onClick={() => setValue('')}
            />
          }
        />

        <div className={`grid sm:grid-cols-3 gap-4 md:gap-4`}>
          {categories.map((item) => (
            <button
              value={item.name}
              key={item.name}
              className={`${categoriesButStyle}`}
              // onClick={() => onChoiceButton(value)}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9.33 6H14.67C17.99 6 19.34 8.35 17.69 11.22L16.95 12.5C16.77 12.81 16.44 13 16.08 13H7.92C7.56 13 7.23 12.81 7.05 12.5L6.31 11.22C4.66 8.35 6.01 6 9.33 6Z"
                  fill="#023646"
                />
                <path
                  d="M8.79 14H15.22C15.61 14 15.85 14.42 15.65 14.75L15.01 15.85C13.36 18.72 10.64 18.72 8.99 15.85L8.35 14.75C8.16 14.42 8.4 14 8.79 14Z"
                  fill="#023646"
                />
              </svg>
              <span>{item.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={`grid gap-x-4 gap-y-6 pt-6 grid-cols-1 sm:grid-cols-2  `}>
        {value.length === 0
          ? product.map((items, id) => (
              <>
                <>{(isFavor = favoriteProductsId.includes(items.id))}</>
                <CardBottle key={id} items={items} isFavor={isFavor} />
              </>
            ))
          : searchArrName.map((items, id) => (
              <>
                <>{(isFavor = favoriteProductsId.includes(items.id))}</>
                <CardBottle key={id} items={items} isFavor={isFavor} />
              </>
            ))}
      </div>
      <div className={`border-b border-solid border-gray-300 mt-8 mb-4 md:border-none`}></div>
    </Layout>
  );
};
export default Catalog;
