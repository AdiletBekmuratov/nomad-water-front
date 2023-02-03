import { IProduct, IProfile } from '@/types';

export type ICreateUserPhone = {
  phone: string;
};

export interface ILoginForm {
  phone: string;
  password?: string;
}

export interface IAuthState {
  user: IUser | null | undefined;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
  phone: string;
}
export interface IUser {
  id?: number;
  phone: string;
  firstname: string;
  lastname: string;
  middleName: string;
  role: string;
  birthday: string;

  bonuses: number;
  telegramAccount?: string;
  favorites?: IProduct[];
  color: string,
  annualSpent: number,

  createdDate?: string;
  updatedDate?: string;
  active?: boolean;
  chatId?: number;
  profiles?: IProfile[];
}

