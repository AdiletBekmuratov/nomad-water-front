export interface IUserFull {
   id: number;
   phone: string;
   password: string;
   firstname: string;
   middleName: string;
   lastname: string;
   role: string;
   birthday: string;
   street: string;
   houseNumber: string;
   flat: string;
   created_date: string;
   addressComment: string;
   bonuses: number;
   telegramAccount: string;
}
export type IUserFullCreate = Omit<IUserFull, 'created_date' | 'password' | 'bonuses' | 'id'>;
//export type IIUserFullUpdate = Pick<IUserFull, 'firstname' | 'lastname'>;
