import { IUser } from '@/types';

export const user: IUser = {

   id: '',
   username: '',
   role: '',
   email: '',
   enabled: false,
   updatedAt: '',

   address_comment: '',
   birthday: '',
   bonuses: null,
   created_date: '',
   firstname: '',
   flat: '',
   house_number: '',
   lastname: '',
   middle_name: '',
   password: '',
   phone: '',
   street: '',
   telegram_account: '',
   updated_date: ''
}


export interface IUsersState {
   users: IUser[];
   user: IUser;
   isError: boolean | null;
   isSuccess: boolean;
   isLoading: boolean;
   message: string;
}