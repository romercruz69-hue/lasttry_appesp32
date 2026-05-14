import axios from 'axios';
import { config } from '../config';
import { useAuthStore } from '../stores/auth.store';

export const api = axios.create({
  baseURL: config.apiUrl,
  timeout: 10000,
});

api.interceptors.request.use((request) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});
