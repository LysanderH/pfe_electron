import axios from 'axios';

/**
 * Axios configuration function
 */
const apiClient = axios.create({
  baseURL: 'https://ctt.lysander-hans.com/api',
  withCredentials: true,
});

const token = sessionStorage.getItem('user') ?? '';
apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;

export default apiClient;
