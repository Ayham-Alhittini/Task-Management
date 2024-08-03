import axiosInstance from '../utils/axiosInstance'

class AuthService {

  singUp(userData) {
    return axiosInstance.post('/auth/singUp', userData);
  }

  singIn(userData) {
    return axiosInstance.post('/auth/login', userData).then(response => {
      localStorage.setItem('user', JSON.stringify(response.data));
    });
  }

}

export default new AuthService();