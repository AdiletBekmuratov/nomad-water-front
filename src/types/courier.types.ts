import { IEmployeeCreate } from '@/types/employee.types';
import { IProduct } from './products.type';
import { IProfile } from "./profile.types";

export type ICourierOrder = {
  id: number;
  user: {
    id: number;
    phone: string;
    firstname: string;
    middleName: string;
    lastname: string;
    role?:string;
    birthday: string;
    bonuses?:number;
    addressComment: string;
    profiles?:IProfile[];
    color:string;
    active:boolean;
  };
  courier: {
    id: number;
    courierDeliveringStatus: string;
    successfulOrders: string;
    car: string;
    user: {
      id: number;
      phone: string;
      firstname: string;
      middleName: string;
      lastname: string;
      street: string;
      houseNumber: string;
      flat: string;
      addressComment: string;
      active: true;
    };
  };
  employee:IEmployeeCreate;
  statusId: number;
  orderType:  {
    id: number,
    name: string,
    createdDate: string,
    updatedDate: string
};
  paymentMethod: {
    id: number,
    name: string,
    createdDate: string,
    updatedDate: string
};
orderProducts: {
  id:number;
  product:IProduct;
  quantity:number;
}[];
  deliveryDateTime: string;
  phone: string;
  address: string;
  comment: string;
  totalPrice: number;
  initialPrice:number;
  paymentUrl: string;
  rating:string;
  cancelReason:string;
  withDeposit:boolean;
  createdDateTime: string;
  orderDateTime: string;
  changedDateTime: string;
  sale: boolean;
};

