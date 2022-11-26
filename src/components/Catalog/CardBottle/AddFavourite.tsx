import { FC } from 'react';
import { IFavourite } from '@/types/types';

import favoriteNone from '../../../assets/crm/favoriteNone.png';
import favoriteHeart from '../../../assets/crm/favoriteHeart.png';

export const AddFavourite: FC<IFavourite> = ({ isFavourite, setIsFavourite }) => {
  const onClickHeart = () => setIsFavourite(!isFavourite);
  const imgStyle = 'absolute top-2 right-7 w-8 h-8 sm:w-12 sm:h-12 cursor-pointer';
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
