import axios from 'axios';

export const nasaApi = axios.create({
  baseURL: 'https://api.nasa.gov',
  timeout: 10000,
  params: {
    api_key: 'DEMO_KEY',
  },
});

nasaApi.interceptors.request.use(config => {
  console.log(`[NASA API] ${config.method?.toUpperCase()} ${config.url}`);
  return config;
});

nasaApi.interceptors.response.use(
  response => response,
  error => {
    const msg = error.response?.data?.msg ?? error.message;
    console.error('[NASA API Error]', msg);
    return Promise.reject(new Error(msg));
  }
);
