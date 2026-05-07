'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { refreshToken as refreshTokenApi, getMe } from '@/services/authService';

/**
 * Hook kiểm tra token khi load page
 * 1. Gọi getMe() để test token
 * 2. Nếu 401 → refresh token
 * 3. Nếu refresh fail → xóa tokens
 */
export const useAuthInit = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { accessToken, refreshToken, setTokens, clearTokens } = useAuthStore();

  useEffect(() => {
    const initAuth = async () => {
    
      // Nếu không có token → không cần làm gì
      if (!accessToken) {
        setIsInitialized(true);
        return;
      }

      setIsRefreshing(true);

      try {
        // Test token bằng cách gọi getMe
        try {
          await getMe();
          return;
        } catch (error: any) {
          // Nếu không phải 401 → return (có thể là network error)
          if (!error.message?.includes('401')) {
            console.warn('getMe failed:', error.message);
            return;
          }

          // Token hết hạn (401), tiến hành refresh
          console.log('Token expired (401), attempting to refresh...');
        }

        // Refresh token
        if (!refreshToken) {
          console.warn('No refresh token available, clearing tokens');
          clearTokens();
          return;
        }

        try {
          const response = await refreshTokenApi(refreshToken, accessToken);
          const { access_token: newAccessToken, refresh_token: newRefreshToken } = response.data;
          setTokens(newAccessToken, newRefreshToken);
        } catch (refreshError) {
          console.error('Refresh token failed:', refreshError);
          clearTokens();
        }
      } finally {
        setIsRefreshing(false);
        setIsInitialized(true);
      }
    };

    initAuth();
  }, [accessToken]); // Chạy khi component mount hoặc accessToken thay đổi (hydrate từ localStorage)

  return { isInitialized, isRefreshing };
};
