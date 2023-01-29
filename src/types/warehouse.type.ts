import { IProduct } from '@/types';
export type IWarehouse = {
  id?: number;
  phone: string;
  warehouseAddress: string;
  createdDate?: string;
  updatedDate?: string;
  warehouseBalanceList: IWarehouseUpdateBalance[];
};

export type IBalance = {
  id?: number;
  warehouseId: number;
  productId: number;
  quantity: number;
};
export type IWarehouseUpdateBalance = {
  id: number;
  product: IProduct;
  quantity: number;
  createdDate?: string;
  updatedDate?: string;
}
export type IBalanceDelete = {
  warehouseId: number;
  productId: number;
}

export type IWarehouseUpdate = Omit<IWarehouse, 'createdDate' | 'updatedDate' | 'warehouseBalanceList'>;
