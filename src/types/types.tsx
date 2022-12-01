import React, { ReactNode } from 'react';

export interface IBottle {
  children?: ReactNode;
  id: number;
  img?: string;
  title: string;
  discription: string;
  availability?: boolean;
  price?: number;
  count?: number;
  orderNumber?: number;
  deliveryStatus?: string;
  orderAddress?: string;
  isOrders?: boolean;
}

export interface ICard {
  items: IBottle;
  children?: ReactNode;
  className?: string;
  deliveryStatus?: string;
  isOrders?: boolean;
  isFavourite?: boolean;
  setIsFavourite?: React.Dispatch<React.SetStateAction<boolean>>;
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
export interface IUsers {
  id: number;
  role: EnamSort;
  firstName: string;
  name: string;
  middleName: string;
  car?: string;
  phone: string;
  storage?: string;
}

export enum EnamSort {
  buyers = 'Покупатели',
  couriers = 'Курьеры',
  worker = 'Работник склада',
  master = 'Мастер склада'
}
