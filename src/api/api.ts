export type ApiError = {
  message: string;
  code?: string;
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T | null;
  error?: ApiError;
};

import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access-token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
