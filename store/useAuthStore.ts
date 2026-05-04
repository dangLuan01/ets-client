import { User } from '@/types/user';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  setTokens: (accessToken: string, refreshToken:string) => void;
  setUser: (user: User) => void;
  clearTokens: () => void;
}

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      setTokens: (accessToken, refreshToken) => set({ accessToken, refreshToken }),
      setUser: (user) => set({ user }),
      clearTokens: () => set({ accessToken: null, refreshToken: null, user: null }),
    }),
    {
      name: 'auth-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);