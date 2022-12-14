import axiosInstance from '@/config/axios';

const getAllUsers = async () => {
  const response = await axiosInstance.get('admin/user');
  return response.data;
};

const getUserMe = async (id: string | number) => {
  const response = await axiosInstance.get(`admin/user/${id}`);
  return response.data;
};

const usersService = {
  getAllUsers,
  getUserMe
};

export default usersService;
