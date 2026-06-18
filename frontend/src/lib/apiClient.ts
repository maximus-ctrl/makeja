import axios from 'axios';
import { appConfig } from '../config/app';

export const api = axios.create({
  baseURL: appConfig.apiBaseUrl,
  headers: { Accept: 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('makeja_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export function setAuthToken(token: string) {
  localStorage.setItem('makeja_token', token);
}

export function clearAuthToken() {
  localStorage.removeItem('makeja_token');
}
