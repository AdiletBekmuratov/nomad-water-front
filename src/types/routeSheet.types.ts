import { IUserFull, IProduct } from '@/types';
import { ICourier, ICourierOrder } from './courier.types';
export type IRouteSheet = {
  id?: number;
  courier: ICourier;
  IRouteSheetOrders: {
    id?: number;
    order: ICourierOrder;
  }[];
  routeSheetDate?: string;
  createdDateTime: string;
};
