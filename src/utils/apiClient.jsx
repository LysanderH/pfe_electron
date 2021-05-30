import axios from 'axios';

/**
 * Axios configuration function
 */
const apiClient = axios.create({
  baseURL: 'https://api.localhost/api',
  withCredentials: true,
});

// window.addEventListener('storage', (e) => {
//   console.log(e);
//   token = sessionStorage.getItem('user') ?? '';
// });

const token = sessionStorage.getItem('user') ?? '';
apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;

export default apiClient;
