'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { handleRefreshToken } from '@/utils/apiClient';

/**
 * Hook to check for token expiry on page load.
 * 1. Checks if the access token exists and is expired using `expiresAt`.
 * 2. If expired, it calls the central `handleRefreshToken` logic.
 * 3. If the refresh fails, it clears all tokens.
 */
export const useAuthInit = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  
  useEffect(() => {
    let isMounted = true;

    const initAuth = async () => {
      const { accessToken, expiresAt, clearTokens } = useAuthStore.getState();

      if (accessToken && expiresAt) {
        // Check if token is expired
        if (expiresAt < Date.now()) {
          console.log('Token expired on load, attempting to refresh...');
          try {
            await handleRefreshToken();
          } catch (error) {
            console.error('Initial refresh failed, clearing tokens.', error);
            if (isMounted) {
              clearTokens();
            }
          }
        }
      }
      
      if (isMounted) {
        setIsInitialized(true);
      }
    };

    initAuth();

    return () => {
      isMounted = false;
    };
  }, []); // Run only once on mount

  return { isInitialized };
};
