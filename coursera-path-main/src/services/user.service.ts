// User Profile Service

import { apiClient } from './api';
import type { User, OnboardingData } from '@/types';

export interface UpdateProfileData {
  name?: string;
  phone?: string;
  gender?: 'male' | 'female' | 'other' | 'prefer-not-to-say';
  areaOfStudy?: string;
  graduationYear?: number;
}

class UserService {
  async getProfile(): Promise<User> {
    return apiClient.get<User>('/users/profile');
  }

  async updateProfile(data: UpdateProfileData): Promise<User> {
    return apiClient.patch<User>('/users/profile', data);
  }

  async completeOnboarding(data: OnboardingData): Promise<User> {
    return apiClient.post<User>('/users/onboarding', data);
  }
}

export const userService = new UserService();
