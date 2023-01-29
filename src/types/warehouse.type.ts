import { IProduct } from '@/types';
export type IWarehouse = {
  id?: number;
  phone: string;
  warehouseAddress: string;
  createdDate?: string;
  updatedDate?: string;
  warehouseBalanceList: IBalance[];
};
export type IWarehouseUpdate = Omit<IWarehouse, 'createdDate' | 'updatedDate' | 'warehouseBalanceList'>;

export type IBalance = {
  id: number;
  product: IProduct;
  quantity: number;
  createdDate?: string;
  updatedDate?: string;
}
export type IBalanceAddProd = {
  warehouseId: number;
  productId: number;
  quantity: number;
};

export type IBalanceUpdate = {
  quantity: number;
  productId: number;
}
export type IBalanceDelete = {
  warehouseId: number;
  productId: number;
}

