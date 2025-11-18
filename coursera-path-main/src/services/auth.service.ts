// Authentication Service

import { apiClient } from './api';
import type { User, LoginCredentials, SignupData } from '@/types';

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface VerifyEmailData {
  token: string;
}

export interface ForgotPasswordData {
  email: string;
}

export interface ResetPasswordData {
  token: string;
  newPassword: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>('/auth/login', credentials);
  }

  async signup(data: SignupData): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>('/auth/signup', data);
  }

  async logout(): Promise<void> {
    return apiClient.post<void>('/auth/logout');
  }

  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>('/auth/refresh', { refreshToken });
  }

  async verifyEmail(token: string): Promise<{ message: string }> {
    return apiClient.post<{ message: string }>('/auth/verify-email', { token });
  }

  async resendVerificationEmail(): Promise<{ message: string }> {
    return apiClient.post<{ message: string }>('/auth/resend-verification');
  }

  async forgotPassword(email: string): Promise<{ message: string }> {
    return apiClient.post<{ message: string }>('/auth/forgot-password', { email });
  }

  async resetPassword(data: ResetPasswordData): Promise<{ message: string }> {
    return apiClient.post<{ message: string }>('/auth/reset-password', data);
  }

  async changePassword(data: ChangePasswordData): Promise<{ message: string }> {
    return apiClient.post<{ message: string }>('/auth/change-password', data);
  }

  async getCurrentUser(): Promise<User> {
    return apiClient.get<User>('/auth/me');
  }

  // Token management in localStorage
  saveTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  clearTokens(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
}

export const authService = new AuthService();

// Set token getter for API client
apiClient.setTokenGetter(() => authService.getAccessToken());
