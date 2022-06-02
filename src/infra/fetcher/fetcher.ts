import axios from 'axios';
import { getCookie } from '@root/shared/utils/cookies/get-cookie';

export const fetcher = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_HOST,
});

fetcher.interceptors.request.use((config) => {
  const accessToken = getCookie('accessToken');

  if (!config.headers) {
    config.headers = {};
  }

  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return config;
});
