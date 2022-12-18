export type ICouriers = {
  id?: number;
  userId: number;
  courierDeliveringStatus: number;
  successfulOrders: number;
  car: string;
};
export type ICouriersCreate = Pick<ICouriers, 'car' | 'userId' | 'id'>;
export type ICouriersUpdate = Pick<ICouriers, 'car' | 'id'>;
