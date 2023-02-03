import { IUser } from '@/types';

import { IProduct } from './products.type';

import { IUserFull } from './users.types';

export type ICourierOrder = {
  id: number;
  user: IUser;
  courier: {
    id: number;
    courierDeliveringStatus: string;
    successfulOrders: string;
    car: string;
    user: IUserFull;
    createdDate?: string,
    updatedDate?: string
  };
  employee: IUserFull;
  statusId: number;
  orderType: {
    id: number,
    name: string,
    createdDate: string,
    updatedDate: string
  };
  paymentMethod?: {
    id: number,
    name: string,
    createdDate: string,
    updatedDate: string
  };
  orderProducts: {
    id: number;
    product: IProduct;
    quantity: number;
  }[];
  deliveryDateTime: string;
  phone: string;
  address: string;
  comment: string;
  totalPrice: number;
  initialPrice: number;
  paymentUrl: string;
  rating: number;
  cancelReason: string;
  ratingComment:string;
  withDeposit: boolean;
  createdDateTime: string;
  orderDateTime: string;
  changedDateTime: string;
  sale: boolean;
};

