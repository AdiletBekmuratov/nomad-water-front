export type IEmployeeCreateLink = {
  quantity: number;
  role: string;
  warehouseId?: number;
};
export type IEmployeeCreate = {
  token?: string;
  id?: number;
  phone: string;
  password?: string;
  firstname: string;
  middleName: string;
  lastname: string;
  role: string;
  birthday: string;
  street: string;
  houseNumber: string;
  flat: string;
  created_date?: string;
  addressComment: string;
  bonuses: number;
  telegramAccount: string;
  //courier
  courierDeliveringStatus: number;
  successfulOrders: number;
  car: string;
  //id склада
  warehouseId: number;
  //покупатель без регистрации
  shopkeeperPhone: string;
};

export type ICouriers = {
  id: number;
  userId?: number;
  courierDeliveringStatus: number;
  successfulOrders: number;
  car: string;
};

export type ICouriersCreate = Pick<ICouriers, 'car'>;

export type IWorker = {
  id?: number;
  shopkeeperPhone: string;
  userId: number;
  warehouseId: number;
};
