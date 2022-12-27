export type IOrder = {
  id: number;
  userId: number;
  courierId: number;
  status: number;
  orderTypeId: number;
  productIds: number[];
  paymentMethodId: number;
  deliveryDateTime: string;
  phone: string;
  address: string;
  comment: string;
  totalPrice: number;
  paymentUrl: number;
  isSale: boolean;
  orderDateTime: string;
};

export type IUsersOrder = Pick<IOrder, 'id' | 'productIds' | 'paymentMethodId'
  | 'phone' | 'address' | 'comment' | 'totalPrice' | 'isSale'>;
