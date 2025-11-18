// Notification Service

import { apiClient } from './api';
import type { Notification } from '@/types';

class NotificationService {
  async getNotifications(): Promise<Notification[]> {
    return apiClient.get<Notification[]>('/notifications');
  }

  async getUnreadCount(): Promise<{ count: number }> {
    return apiClient.get<{ count: number }>('/notifications/unread-count');
  }

  async markAsRead(notificationId: string): Promise<void> {
    return apiClient.patch<void>(`/notifications/${notificationId}/read`);
  }

  async markAllAsRead(): Promise<void> {
    return apiClient.patch<void>('/notifications/mark-all-read');
  }

  async deleteNotification(notificationId: string): Promise<void> {
    return apiClient.delete<void>(`/notifications/${notificationId}`);
  }
}

export const notificationService = new NotificationService();
