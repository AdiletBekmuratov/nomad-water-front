import { dataBottle } from '@/assets/dataBottle';
import { IBottle } from '@/types/types';
import { FC, useState } from 'react';
import { CardBottle } from './CardBottle/CardBottle22';

interface ICatalog {
  items: IBottle[];
}

export const Catalog1: FC<ICatalog> = ({items}) => {
  // const [counter, setCounter] = useState<number>(1);
  // const [isFavourite, setIsFavourite] = useState<boolean>(false);
  return <div className={``}></div>;
};
