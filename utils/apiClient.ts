import { useAuthStore } from '@/store/useAuthStore';
import { refreshToken as refreshTokenApi } from '@/services/authService';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.vidhub.io.vn';

let isRefreshing = false;
let failedQueue: { resolve: (value: unknown) => void; reject: (reason?: any) => void; }[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

const apiClient = async (url: string, options: RequestInit = {}) => {
  const { accessToken, refreshToken, setTokens, clearTokens } = useAuthStore.getState();

  const headers = new Headers(options.headers || {});
  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  options.headers = headers;

  const handleRefreshToken = async () => {
    if (!isRefreshing) {
      isRefreshing = true;
      if (refreshToken && accessToken) {
        try {
          const response = await refreshTokenApi(refreshToken, accessToken);
          const { access_token: newAccessToken, refresh_token: newRefreshToken } = response.data;
          setTokens(newAccessToken, newRefreshToken);
          processQueue(null, newAccessToken);
          return newAccessToken;
        } catch (err) {
          clearTokens();
          processQueue(err, null);
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      } else {
        isRefreshing = false;
        clearTokens();
        return Promise.reject(new Error("No refresh token available"));
      }
    } else {
        return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
        });
    }
  };

  const response = await fetch(`${API_BASE_URL}${url}`, options);

  if (response.status === 401) {
    const newAccessToken = await handleRefreshToken();
    if (typeof newAccessToken === 'string') {
        const newHeaders = new Headers(options.headers);
        newHeaders.set('Authorization', `Bearer ${newAccessToken}`);
        options.headers = newHeaders;
        return fetch(`${API_BASE_URL}${url}`, options);
    }
  }

  return response;
};

export default apiClient;
