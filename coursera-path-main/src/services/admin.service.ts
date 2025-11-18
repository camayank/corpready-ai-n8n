import { apiClient } from './api';
import type {
  User,
  UserDetail,
  PaginationParams,
  PaginatedResponse,
  ImpersonateResponse,
  UserRole,
} from '../types/admin';

class AdminService {
  // Users Management
  async getUsers(params?: PaginationParams): Promise<PaginatedResponse<User>> {
    return apiClient.get<PaginatedResponse<User>>('/admin/users', { params });
  }

  async getUserById(id: string): Promise<UserDetail> {
    return apiClient.get<UserDetail>(`/admin/users/${id}`);
  }

  async updateUser(
    id: string,
    data: Partial<User>
  ): Promise<User> {
    return apiClient.patch<User>(`/admin/users/${id}`, data);
  }

  async changeUserRole(
    id: string,
    role: UserRole,
    reason: string
  ): Promise<User> {
    return apiClient.post<User>(`/admin/users/${id}/change-role`, { role, reason });
  }

  async toggleUserActive(id: string, reason?: string): Promise<User> {
    return apiClient.post<User>(`/admin/users/${id}/toggle-active`, { reason });
  }

  async impersonateUser(id: string, reason: string): Promise<ImpersonateResponse> {
    return apiClient.post<ImpersonateResponse>(`/admin/users/${id}/impersonate`, { reason });
  }

  async deleteUser(id: string, reason?: string): Promise<{ message: string }> {
    return apiClient.delete<{ message: string }>(`/admin/users/${id}`, {
      body: JSON.stringify({ reason }),
    });
  }

  async exportUserData(id: string): Promise<Response> {
    return apiClient.get<Response>(`/admin/users/${id}/export-data`);
  }
}

export const adminService = new AdminService();
