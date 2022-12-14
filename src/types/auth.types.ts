export interface IAuthState {
  user: IUser | null | undefined;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}
export interface IUsersState {
  users: IUser[];
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}
export interface IUser {
  id: number | string;
  username: string;
  role: string;
  email: string;
  enabled: boolean;
  updatedAt: string;

  address_comment: string | null;
  birthday: string | null;
  bonuses: number | null;
  created_date: string;
  firstname: string | null;
  flat: string | null;
  house_number: string | null;
  lastname: string | null;
  middle_name: string | null;
  password: string;
  phone: string;
  street: string;
  telegram_account: string;
  updated_date: string;
}
