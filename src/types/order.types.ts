export type IOrderQuality = {
  productId: number;
  quantity: number;
};

export type IOrder = {
  id: number;
  userId: number;
  courierId: number;
  statusId: number;
  rating?: number;
  orderProductsDto: IOrderQuality[];
  paymentMethod: string;
  deliveryDateTime: string;
  phone: string;
  address: string;
  comment: string;
  totalPrice: number;
  paymentUrl: number;
  isSale: boolean;
};

export type IUsersOrder = Pick<
  IOrder,
  'orderProductsDto' | 'paymentMethod' | 'phone' | 'address' | 'comment' | 'totalPrice' | 'isSale'
>;
