export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
  CURATOR = 'CURATOR',
  OPS = 'OPS',
  PARTNER = 'PARTNER',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  isEmailVerified: boolean;
  isOnboardingComplete: boolean;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
  _count?: {
    courseProgress: number;
    certificates: number;
    internshipApplications: number;
  };
}

export interface UserDetail extends User {
  phone?: string;
  gender?: string;
  areaOfStudy?: string;
  graduationYear?: number;
  courseProgress?: any[];
  certificates?: any[];
  internshipApplications?: any[];
  _count?: {
    videoProgress: number;
    quizAttempts: number;
    mentorshipBookings: number;
    courseProgress: number;
    certificates: number;
    internshipApplications: number;
  };
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
  role?: UserRole;
  isActive?: boolean;
  isEmailVerified?: boolean;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  users: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface AdminActionLog {
  id: string;
  adminId: string;
  action: string;
  targetType: string;
  targetId?: string;
  details?: Record<string, any>;
  reason?: string;
  ipAddress?: string;
  createdAt: string;
}

export interface ImpersonateResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  expiresIn: number;
}
