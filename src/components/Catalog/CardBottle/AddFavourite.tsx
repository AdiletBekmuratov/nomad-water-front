import { FC } from 'react';
import { IFavourite } from '@/types/types';

import favoriteNone from '../../../assets/crm/favoriteNone.png';
import favoriteHeart from '../../../assets/crm/favoriteHeart.png';

export const AddFavourite: FC<IFavourite> = ({ isFavourite, setIsFavourite }) => {
  const onClickHeart = () => setIsFavourite(!isFavourite);
  const imgStyle =
    'absolute top-2 right-2 lg:top-5 lg:right-5 w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 cursor-pointer';
  return (
    <>
      {isFavourite ? (
        <img onClick={onClickHeart} src={favoriteHeart} className={`${imgStyle}`} alt="favorite" />
      ) : (
        <img onClick={onClickHeart} src={favoriteNone} className={`${imgStyle}`} alt="favorite" />
      )}
    </>
  );
};
