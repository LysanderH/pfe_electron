import axios from 'axios';

/**
 * Axios configuration function
 */
const apiClient = axios.create({
  baseURL: 'https://api.sanctum.test',
  withCredentials: true,
});

export default apiClient;
