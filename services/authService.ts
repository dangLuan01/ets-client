import { useAuthStore } from '@/store/useAuthStore';
import { RegisterData, LoginData, LoginResponse } from '@/types/auth';
import apiClient from '@/utils/apiClient';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.vidhub.io.vn';

export const register = async (data: RegisterData) => {
  const response = await fetch(`${API_BASE_URL}/api/v1/auth/register`, {
    method: 'POST',
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Đã có lỗi xảy ra.');
  }

  if (response.status === 200) {
    return null;
  }

  return response.json();
};

export const login = async (data: LoginData): Promise<LoginResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
    method: 'POST',
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Đã có lỗi xảy ra.');
  }

  return response.json();
};

interface MeResponse {
  data: {
    username: string;
    email: string;
    target: number;
  }
}

export const getMe = async (): Promise<MeResponse> => {
    const response = await apiClient('/api/v1/user/info', {
      method: 'GET',
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Đã có lỗi xảy ra.');
    }
  
    return response.json();
};

export const refreshToken = async (refreshToken: string, accessToken: string) => {
  const response = await fetch(`${API_BASE_URL}/api/v1/auth/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Đã có lỗi xảy ra khi làm mới token.');
  }

  return response.json();
};

export const logout = async () => {
  const { accessToken, refreshToken } = useAuthStore.getState();
  const response = await fetch(`${API_BASE_URL}/api/v1/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Đã có lỗi xảy ra khi logout.');
  }

  return true;
};
