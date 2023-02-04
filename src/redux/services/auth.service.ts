import axiosInstance from '@/config/axios';
import { ILoginForm } from '@/types';

const getMe = async () => {
  const response = await axiosInstance.get('/user/me');
  return response.data;
};
const getPassword = async (phone: string) => {
  const response = await axiosInstance.post('/auth/generateCode', phone);
  console.log(phone);
  return response.data;
};

// Login user
const login = async (userData: ILoginForm) => {
  const response = await axiosInstance.post('/auth/login', userData);
  return response.data;
};

// Logout user
const logout = async () => {
  const response = await axiosInstance.post('/auth/logout');
  return response.data;
};

const authService = {
  
  getMe,
  logout,
  login,
  getPassword
};

export default authService;
