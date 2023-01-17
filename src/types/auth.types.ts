import { IProduct } from '@/types';
export interface IAuthState {
  user: IUser | null | undefined;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
  phone: string;
}
export interface IUsersState {
  users: IUser[];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}
export interface IUser {
  id?: number;
  phone: string;
  firstname: string;
  lastname: string;
  middleName: string;
  role: string;
  birthday: string;
  username?: string;
  houseNumber: string;
  street: string;
  flat: string;
  addressComment: string;
  bonuses: number;
  telegramAccount?: string;
  favorites?: IProduct[];
  createdDate?: string;
  updatedDate?: string;
  active?: boolean;
  chatId?: number;
}

export type IUserCreate = {
  phone: string;
};
