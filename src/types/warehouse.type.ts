export type IWarehouse = {
  id?: number;
  phone: string;
  warehouseAddress: string;
  createdDate: string;
  updatedDate: string;
};

export type IWarehouseUpdate = Omit<IWarehouse, 'createdDate' | 'updatedDate'>;
