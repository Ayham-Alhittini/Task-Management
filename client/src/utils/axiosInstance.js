import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',
});

const refreshAccessToken = async () => {
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    const refreshToken = user?.credentials?.refreshToken;

    const response = await axios.post('http://localhost:5000/auth/generateAccessToken', {
      refreshToken,
    });

    // Update the user's access token in localStorage
    user.credentials.accessToken = response.data.accessToken;
    localStorage.setItem('user', JSON.stringify(user));

    return response.data.accessToken;
  } catch (error) {
    console.error('Failed to refresh access token', error);
    throw error;
  }
};



axiosInstance.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user?.credentials?.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);



axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshAccessToken();
        axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest);
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
