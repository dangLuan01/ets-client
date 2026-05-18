import { useAuthStore } from '@/store/useAuthStore';
import { refreshToken as refreshTokenApi } from '@/services/authService';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.vidhub.io.vn';

let isRefreshing = false;
let failedQueue: { resolve: (value: string) => void; reject: (reason?: Error) => void; }[] = [];

const processQueue = (error: Error | null, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    } else {
      prom.reject(new Error("Token refresh failed without providing an error."));
    }
  });
  failedQueue = [];
};

export const handleRefreshToken = async () => {
  if (isRefreshing) {
    return new Promise<string>((resolve, reject) => {
      failedQueue.push({ resolve, reject });
    });
  }

  isRefreshing = true;

  const { setTokens, clearTokens } = useAuthStore.getState();

  try {
    const { accessToken: currentAccessToken, refreshToken: currentRefreshToken } = useAuthStore.getState();
    if (!currentRefreshToken) {
      throw new Error("No refresh token available");
    }
    const response = await refreshTokenApi(currentRefreshToken, currentAccessToken || '');
    const { access_token: newAccessToken, refresh_token: newRefreshToken, expires_in: expiresIn } = response.data;
    
    setTokens(newAccessToken, newRefreshToken, expiresIn);
    processQueue(null, newAccessToken);
    return newAccessToken;
  } catch (err) {
    clearTokens();
    const error = err instanceof Error ? err : new Error('An unknown error occurred during token refresh.');
    processQueue(error, null);
    return Promise.reject(error);
  } finally {
    isRefreshing = false;
  }
};


const apiClient = async (url: string, options: RequestInit = {}) => {
  let { accessToken } = useAuthStore.getState();
  //const { refreshToken, expiresAt } = useAuthStore.getState();

  // Proactive token refresh (60-second buffer)
  // if (expiresAt && refreshToken && expiresAt < Date.now() + 60000) {
  //   try {
  //     accessToken = await handleRefreshToken();
  //   } catch (error) {
  //     console.error('Proactive token refresh failed', error);
  //     // Let the request proceed with the old token and fail with 401 if it's truly expired
  //   }
  // }

  const headers = new Headers(options.headers || {});
  if (accessToken) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  options.headers = headers;

  const response = await fetch(`${API_BASE_URL}${url}`, options);

  // Reactive fallback for 401
  if (response.status === 401) {
    console.warn('🔄 Received 401, attempting to refresh token...');
    try {
      const newAccessToken = await handleRefreshToken();
      if (typeof newAccessToken === 'string') {
          const newHeaders = new Headers(options.headers);
          newHeaders.set('Authorization', `Bearer ${newAccessToken}`);
          options.headers = newHeaders;
          return fetch(`${API_BASE_URL}${url}`, options);
      }
    } catch (error) {
      // If the reactive refresh fails, we should not retry.
      // The error is already handled (tokens cleared) in handleRefreshToken.
      console.error('Reactive token refresh failed:', error);
      return response; // Return the original 401 response
    }
  }

  return response;
};

export default apiClient;
