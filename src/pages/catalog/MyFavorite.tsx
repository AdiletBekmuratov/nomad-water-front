import { useGetUserFavoriteQuery } from '@/redux/services/user.service';
import React from 'react';

import { Layout } from '@/components/Layout';
import { CardBottle } from '@/pages/catalog/CardBottle';
import { Button } from '@/components/Forms';
import Loader from '@/components/Landing/Loader';

import { GiBrokenHeart } from 'react-icons/gi';

import { Link } from 'react-router-dom';

const MyFavorite = () => {
  const { data: favorites = [], isLoading } = useGetUserFavoriteQuery();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Layout className={``}>
      <>
        <h2 className={`text-center font-semibold text-lg pb-3`}>Мои фавориты</h2>

        {favorites.length === 0 ? (
          <div className={`flex flex-col md:flex-row items-center justify-center gap-5 py-7`}>
            <GiBrokenHeart className={`w-7 h-7 text-red-600`} />
            <p className={`text-base font-semibold text-center  text-red-600`}>
              У вас нет любимых товаров, пожалуйста, добавьте их в каталоге!
            </p>
            <Link to="/catalog">
              <Button className={`w-44 bg-red-600 hover:bg-red-400`}>В каталог</Button>
            </Link>
          </div>
        ) : (
          <>
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-5 sm:py-5`}>
              {favorites.map((items, id) => (
                <CardBottle key={id} items={items} />
              ))}
            </div>
          </>
        )}
      </>
    </Layout>
  );
};
export default MyFavorite;
