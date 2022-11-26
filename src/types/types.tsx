import React, { ReactNode } from 'react';

// export interface IdeliveryStatus {
//   [('waiting', 'completed', 'cancelled')];
// }
export interface IBottle {
  id: number;
  img?: string;
  title: string;
  discription: string;
  availability?: boolean;
  price?: number;
  count?: number;
  orderNumber?: number;
  deliveryStatus?: string;
  children?: ReactNode;
}

export interface ICard {
  items: IBottle;
  children?: ReactNode;
  className?: string;
  isFavourite: boolean;
  setIsFavourite: React.Dispatch<React.SetStateAction<boolean>>;
  counter: number;
  setCounter: React.Dispatch<React.SetStateAction<number>>;
}

export interface IFavourite {
  isFavourite: boolean;
  setIsFavourite: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface ICounter {
  counter: number;
  setCounter: React.Dispatch<React.SetStateAction<number>>;
  quantityInStock?: number;
}

export interface ICatalog {
  cardItems?: IBottle[];
}
