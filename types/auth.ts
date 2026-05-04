export interface LoginData {
  email?: string;
  password?: string;
}

export interface RegisterData {
  username?: string;
  email?: string;
  password?: string;
  target?: number;
}

export interface LoginResponse {
  data: {
    access_token: string;
    refresh_token: string;
    expires_in: number;
  };
  message: string;
  status: string;
}
