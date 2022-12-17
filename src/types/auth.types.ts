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
  id: number;
  email: string;
  username: string;
  role: string;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}