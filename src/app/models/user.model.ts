export interface User {
  id: number;
  userName: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  token: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: Omit<User, 'password'>;
}

