export type ICourierOrder = {
  id: number;
  user: {
    id: number;
    phone: string;
    firstname: string;
    middleName: string;
    lastname: string;
    birthday: string;
    street: string;
    houseNumber: string;
    flat: string;
    addressComment: string;
  };
  courier: {
    id: number;
    courierDeliveringStatus: string;
    successfulOrders: string;
    car: string;
    user: {
      id: number;
      phone: string;
      firstname: string;
      middleName: string;
      lastname: string;
      street: string;
      houseNumber: string;
      flat: string;
      addressComment: string;
      active: true;
    };
  };
  statusId: number;
  orderType: string;
  paymentMethod: string;
  products: [];
  deliveryDateTime: string;
  phone: string;
  address: string;
  comment: string;
  totalPrice: number;
  paymentUrl: string;
  createdDateTime: string;
  orderDateTime: string;
  changedDateTime: string;
  sale: true;
};

