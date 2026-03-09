const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

export const API_ENDPOINTS = {
  MOVIES: `${BASE_URL}/movies`,
} as const;
