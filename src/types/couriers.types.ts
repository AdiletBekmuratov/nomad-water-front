export type ICouriers = {
  id: number;
  userId: number;
  courierDeliveringStatus: number;
  successfulOrders: number;
  car: string;
};
export type ICouriersUpdate = Omit<ICouriers, 'successfulOrders' | 'courierDeliveringStatus'>;
