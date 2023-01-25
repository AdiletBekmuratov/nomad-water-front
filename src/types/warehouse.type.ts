export type IWarehouse = {
  id?: number;
  phone: string;
  warehouseAddress: string;
  createdDate: string;
  updatedDate: string;
};
export type IWarehouseBalance = {
  id?: number;
  warehouseId?: number;
  productId: number;
  quantity: number;
};

export type IWarehouseUpdate = Omit<IWarehouse, 'createdDate' | 'updatedDate'>;
