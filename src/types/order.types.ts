export type IOrder = {
  id: number;
  user: {
    id: number;
    phone: string;
    firstname: string;
    middleName: string;
    lastname: string;
    role: string;
    birthday: string;
    street: string;
    houseNumber: string;
    flat: string;
    addressComment: string;
    bonuses: number;
    telegramAccount: string;
    favorites: [];
    active: true;
  };
};
