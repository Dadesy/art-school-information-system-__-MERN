import axios from 'axios';

const instance = axios.create({
  withCredentials: true,
  baseURL: 'http://localhost:5000/api',
});

instance.interceptors.request.use((config) => {
  config.headers.authorization = window.localStorage.getItem('token');
  return config;
});

export default instance;
