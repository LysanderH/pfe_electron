import axios from 'axios';

const token = sessionStorage.getItem('user')
  ? sessionStorage.getItem('user').replace(/"/g, '')
  : '';

axios.defaults.headers.common.Authorization = `Bearer ${token}`;
/**
 * Axios configuration function
 */
const apiClient = axios.create({
  baseURL: 'https://api.localhost/api',
  withCredentials: true,
});

export default apiClient;
