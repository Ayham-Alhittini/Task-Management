import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
});

axiosInstance.interceptors.request.use(
  (config) => {

    const user = JSON.parse(localStorage.getItem('user'));

    const token = user?.credentials?.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  }
);

export default axiosInstance;
