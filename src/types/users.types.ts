export interface IUserFull {
  id: number;
  phone: string;
  password: string;
  firstname: string;
  middleName: string;
  lastname: string;
  role: string;
  birthday: string;
  street: string;
  houseNumber: string;
  flat: string;
  created_date: string;
  addressComment: string;
  bonuses: number;
  telegramAccount: string;
  //courier
  courierDeliveringStatus: number;
  successfulOrders: number;
  car: string;
  //id склада
  warehouseId: number;
  shopkeeperPhone: string;
}
export type IOrdersUser = Pick<IUserFull, 'phone' | 'addressComment' | 'street' | 'houseNumber' | 'flat' | 'firstname'>;
export type IUserFullCreate = Omit<IUserFull, 'created_date' | 'password'>;
export type IUserFullUpdateME = Omit<IUserFull, 'id' | 'role' |
  'created_date' | 'bonuses' | 'courierDeliveringStatus' |
  'successfulOrders' | 'car' | 'warehouseId' | 'shopkeeperPhone'>;
