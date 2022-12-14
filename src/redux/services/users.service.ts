import axiosInstance from '@/config/axios';

const getAllUsers = async () => {
  const response = await axiosInstance.get('admin/user');
  return response.data;
};

const usersService = {
  getAllUsers
};

export default usersService;
