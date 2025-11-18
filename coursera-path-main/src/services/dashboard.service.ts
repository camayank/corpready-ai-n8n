// Dashboard Data Service

import { apiClient } from './api';
import type { DashboardStats, RecommendedContent } from '@/types';

class DashboardService {
  async getStats(): Promise<DashboardStats> {
    return apiClient.get<DashboardStats>('/dashboard/stats');
  }

  async getRecommendations(): Promise<RecommendedContent> {
    return apiClient.get<RecommendedContent>('/dashboard/recommendations');
  }
}

export const dashboardService = new DashboardService();
