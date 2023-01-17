import { IProduct } from '@/types';
import React, { ReactNode } from 'react';

export interface ICard {
  items: IProduct;
  children?: ReactNode;
  className?: string;
  isFavor?: boolean;
  isFavorite?: boolean;
  setIsFavorite?: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface IFavorite {
  isFavorite?: boolean;
  setIsFavorite?: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface ICounter {
  counter: number;
  setCounter: React.Dispatch<React.SetStateAction<number>>;
  quantityInStock?: number;
}
