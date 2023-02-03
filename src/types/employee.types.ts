export type IEmployeeCreateLink = {
  quantity: number;
  role: string;
  warehouseId?: number;
};

export type ICouriers = {
  id: number;
  userId?: number;
  courierDeliveringStatus: number;
  successfulOrders: number;
  car: string;
};

export type IWorker = {
  id?: number;
  shopkeeperPhone: string;
  userId: number;
  warehouseId: number;
};
