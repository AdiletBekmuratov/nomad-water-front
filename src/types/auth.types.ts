import { IProduct, IProfile, IUserFull } from '@/types';

export type ICreateUserPhone = {
  phone: string;
};

export interface ILoginForm {
  phone: string;
  password?: string;
}

export interface IAuthState {
  user: IUserFull | null | undefined;
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

  bonuses?: number;
  telegramAccount?: string;
  favorites?: IProduct[];
  color?: string,
  annualSpent?: number,
  profiles?: IProfile[];

  createdDate?: string;
  updatedDate?: string;
  active?: boolean;
  chatId?: number;
}

