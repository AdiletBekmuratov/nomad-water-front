import axios from 'axios';
import { API_URL } from '@/redux/http';

const axiosInstance = axios.create({
  // headers: { 'Authorization': `Bearer ${token}` },
  withCredentials: true,
  baseURL: API_URL
});

export default axiosInstance;
