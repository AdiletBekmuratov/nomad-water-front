
import { IUserFull, IProduct } from '@/types';
import { ICourier, ICourierOrder } from './courier.types';
export type IRouteSheetOrders ={
  id?: number;
  order: ICourierOrder;
}
export type IRouteSheet = {
  id?: number;
  courier: ICourier;
  routeSheetOrders: IRouteSheetOrders[];
  routeSheetDate?: string;
  createdDateTime: string;
};
