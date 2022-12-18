export type ICouriers = {
  id?: number;
  userId?: number;
  courierDeliveringStatus: number;
  successfulOrders: number;
  car: string;
};
//export type ICouriersCreate = Pick<ICouriers, 'car'>;
//export type ICouriersId = Pick<ICouriers, 'userId'>;
export type ICouriersCreate = Pick<ICouriers, 'car' | 'userId' | 'id'>;
