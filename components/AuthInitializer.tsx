'use client';

import { useAuthInit } from '@/hooks/useAuthInit';

/**
 * Client component để kiểm tra token khi app load
 * Chạy effect check và refresh token nếu cần
 */
export const AuthInitializer = () => {
  useAuthInit();
  return null; // Component này không render gì
};
