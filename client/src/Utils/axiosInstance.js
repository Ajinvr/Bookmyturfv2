import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://bookmyturfv2.vercel.app',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
