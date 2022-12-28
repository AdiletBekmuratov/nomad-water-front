import { FC } from 'react';
//import { Link } from 'react-router-dom';
import React from 'react';
import { AddFavourite } from './AddFavourite';
import { ICard } from '@/assets/types/types';
// import { Description } from './Description';
import { OrderStatus } from '@/components/Catalog/OrderStatus';
// import { Counter } from './Counter';
import { Button } from '@/components/Forms';
import { IProduct } from '@/types';

export const CardBottle: FC<ICard> = ({
  items,
  isFavourite,
  cardType,
  setIsFavourite,
  deliveryStatus
}) => {
  //let [counter, setCounter] = React.useState<number>(items.quantity ? items.quantity : 1);
  const [cartItems, setCartItems] = React.useState<IProduct[]>([]);
  const [isProductCart, setIsProductCart] = React.useState(false);
  const addItemsCart = (items: IProduct) => {
    setCartItems([...cartItems, items]);
    console.log(cartItems);
  };
  const isMounted = React.useRef(false);
  React.useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(cartItems);
      localStorage.setItem('cartItems', json);
    }
    isMounted.current = true;
    setIsProductCart(true);
  }, [cartItems]);

  return (
    <div
      className={`${
        cardType === 'order' ? 'bg-white' : ''
      } bg-white rounded-3xl relative p-2 shadow-xl`}>
      {cardType === 'catalog' && (
        <AddFavourite isFavourite={isFavourite} setIsFavourite={setIsFavourite} />
      )}
      {/* <Link
        to={`${cardType === 'catalog' ? `/catalog/${items.id}` : '/orderinfo'}`}
        className={`flex ${cardType === 'order' ? 'flex-row' : 'flex-col'} sm:flex-row `}></Link> */}
      <div
        className={`flex gap-3 md:gap-5 text-left p-5
          text-sm sm:text-base lg:text-lg leading-4 font-medium pt-2`}>
        {/* <Description {...items} isOrders={cardType === 'order'} /> */}
        <div className={'bg-white rounded-3xl w-40 h-40 flex items-center justify-center p-2 '}>
          <img src={items.imageUrl} alt="bottle" className="object-contain" />
        </div>
        <div className={`grid grid-cols-1 gap-1 p-1`}>
          {items.description}
          <h2 className={`sm:text-lg font-semibold sm:mt-0`}>{items.productPrice} T</h2>
          {cardType === 'order' && <OrderStatus variants={deliveryStatus} />}

          {/* <Counter counter={counter} setCounter={setCounter} /> */}
          {isProductCart ? (
            <Button
              className="w-40 h-10"
              onClick={() => {
                addItemsCart(items);
              }}>
              В корзину
            </Button>
          ) : (
            <Button
              className="w-40 h-10 bg-blue-400"
              onClick={() => {
                addItemsCart(items);
              }}>
              В корзине
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
