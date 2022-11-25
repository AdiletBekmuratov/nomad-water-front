import favoriteNone from '../../../assets/crm/favoriteNone.png';
import favoriteHeart from '../../../assets/crm/favoriteHeart.png';

export const AddFavourite = ({ isFavourite, setIsFavourite }) => {
  const onClickHeart = () => setIsFavourite(!isFavourite);
  return (
    <>
      {isFavourite ? (
        <img
          onClick={onClickHeart}
          src={favoriteHeart}
          className={`absolute top-2 right-3 w-8 h-8 sm:w-12 sm:h-12 cursor-pointer`}
          alt="favoriteNone"
        />
      ) : (
        <img
          onClick={onClickHeart}
          src={favoriteNone}
          className={`absolute top-2 right-3 w-8 h-8 sm:w-12 sm:h-12 cursor-pointer`}
          alt="favoriteNone"
        />
      )}
    </>
  );
};
