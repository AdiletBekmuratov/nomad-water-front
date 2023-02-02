import { IUserFull } from '@/types';
export type IRouteSheet = {
  id?: number;
  order: {
    id?: number;
    address: string;
    changedDateTime?: string;
    comment?: string;
    createdDateTime?: string;
    deliveryDateTime?: string;
    employee?: string;
    initialPrice: number;
    orderDateTime: string;
    phone: string;
    rating: number;
    totalPrice: number;
    user?: IUserFull;
  }[];
};
