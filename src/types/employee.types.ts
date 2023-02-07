export type IEmployeeCreateLink = {
  quantity: number;
  role: string;
  warehouseId?: number;
};

export type IWorker = {
  id?: number;
  shopkeeperPhone: string;
  userId: number;
  warehouseId: number;
};
