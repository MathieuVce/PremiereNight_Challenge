import axios, {AxiosInstance, AxiosError, AxiosRequestConfig} from 'axios';
import {ApiError} from './types';

/**
 * TMDB API Configuration
 * In a production app, import from environment variables
 */
const TMDB_CONFIG = {
  apiKey: '6a30cbfce857a0d11ed468e037c353c8',
  baseURL: 'https://api.themoviedb.org/3',
  imageBaseURL:'https://image.tmdb.org/t/p',
  timeout: 8000,
  maxRetries: 3,
};

/**
 * Create axios instance with default configuration
 */
const createClient = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: TMDB_CONFIG.baseURL,
    timeout: TMDB_CONFIG.timeout,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });

  instance.interceptors.request.use(
    config => {
      config.params = {
        ...config.params,
        api_key: TMDB_CONFIG.apiKey,
      };

      // iOS specific: Force IPv4
      if (config.baseURL && !config.headers['X-Requested-With']) {
        config.headers['X-Requested-With'] = 'XMLHttpRequest';
      }

      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );

  // Handle errors globally
  instance.interceptors.response.use(
    response => response,
    (error: AxiosError<ApiError>) => {
      // Transform error to a more usable format
      if (error.response) {
        const apiError: ApiError = {
          status_code: error.response.status,
          status_message:
            error.response.data?.status_message || 'An error occurred',
          success: false,
        };
        return Promise.reject(apiError);
      } else if (error.request) {
        // Request was made but no response received (network error)
        const networkError: ApiError = {
          status_code: 0,
          status_message: 'Network error.',
          success: false,
        };
        return Promise.reject(networkError);
      } else {
        // Something else happened
        const unknownError: ApiError = {
          status_code: -1,
          status_message: error.message || 'An unknown error occurred',
          success: false,
        };
        return Promise.reject(unknownError);
      }
    },
  );

  return instance;
};

/**
 * Helper function to build image URLs
 */
export const buildImageUrl = (
  path: string | null,
  size: 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original' = 'w500',
): string | null => {
  if (!path) {
    return null;
  }
  return `${TMDB_CONFIG.imageBaseURL}/${size}${path}`;
};

/**
 * Helper function to build backdrop image URLs
 */
export const buildBackdropUrl = (
  path: string | null,
  size: 'w300' | 'w780' | 'w1280' | 'original' = 'w780',
): string | null => {
  if (!path) {
    return null;
  }
  return `${TMDB_CONFIG.imageBaseURL}/${size}${path}`;
};

/**
 * TMDB API client instance
 */
export const tmdbClient = createClient();

/**
 * Type-safe wrapper for GET requests
 */
export const get = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> => {
    const response = await tmdbClient.get<T>(url, config);
    return response.data;
};
