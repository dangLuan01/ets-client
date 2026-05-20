export interface User {
  username: string;
  avatar?: string;
  email: string;
  target: number;
}

export interface UserDetailResponse {
  data: {
    username: string;
    email: string;
    avatar?: string;
    target: number;
    exam_date?: string;
    has_password: boolean;
  } 
}

export interface UserDetail {
  username: string;
  email: string;
  avatar?: string;
  target: number;
  exam_date?: string;
  has_password: boolean;
}

export interface MeResponse {
  data: {
    username: string;
    email: string;
    avatar?: string;
    target: number;
  }
}

export interface UpdateUserData {
  name: string,
  target: number,
  exam_date?: string
}

export interface UpdatePasswordData {
  has_password: boolean,
  current_password?: string,
  new_password: string,
  confirm_password: string
}