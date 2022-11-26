import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Counter } from './Counter';
import { AddFavourite } from './AddFavourite';
import { Discription } from './Discription';
import { IBottle } from '@/types/types';

interface ICardBottle {
  items: IBottle[];
}

export const CardBottle: FC<ICardBottle> = ({ items }) => {
  return <div></div>;
};
