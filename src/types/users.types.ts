import { IProfile } from './profile.types';

export interface IUserFull {
  id?: number;
  phone: string;

  firstname: string;
  middleName: string;
  lastname: string;
  role: string;

  birthday: string;
  street?: string;
  houseNumber?: string;
  flat?: string;
  created_date?: string;
  addressComment?: string;
  bonuses?: number;
  telegramAccount?: string;
  color?: string;
  //courier
  userId?: number | undefined;
  annualSpent?: number,
  profiles?: IProfile[];
  courierDeliveringStatus?: number;
  successfulOrders?: number;
  car?: string;
  //id склада
  warehouseId?: number;
  shopkeeperPhone?: string;
  active:boolean;
  token?: string;
}
export type IOrdersUser = Pick<
  IUserFull,
  'phone' | 'addressComment' | 'street' | 'houseNumber' | 'flat' | 'firstname'
>;
export type IUserFullCreate = Omit<IUserFull, 'created_date'>;
