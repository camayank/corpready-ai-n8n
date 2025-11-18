// Internship Service

import { apiClient } from './api';
import type { Internship, InternshipApplication, SavedInternship } from '@/types';

export interface InternshipFilters {
  isRemote?: boolean;
  location?: string;
  minStipend?: number;
  maxStipend?: number;
}

class InternshipService {
  async getInternships(filters?: InternshipFilters): Promise<Internship[]> {
    return apiClient.get<Internship[]>('/internships', { params: filters as any });
  }

  async getInternship(internshipId: string): Promise<Internship> {
    return apiClient.get<Internship>(`/internships/${internshipId}`);
  }

  async getRecommendedInternships(): Promise<Internship[]> {
    return apiClient.get<Internship[]>('/internships/recommended');
  }

  // Saved Internships
  async getSavedInternships(): Promise<SavedInternship[]> {
    return apiClient.get<SavedInternship[]>('/internships/saved');
  }

  async saveInternship(internshipId: string): Promise<SavedInternship> {
    return apiClient.post<SavedInternship>('/internships/save', { internshipId });
  }

  async unsaveInternship(internshipId: string): Promise<void> {
    return apiClient.delete<void>(`/internships/save/${internshipId}`);
  }

  // Applications
  async getMyApplications(): Promise<InternshipApplication[]> {
    return apiClient.get<InternshipApplication[]>('/internships/applications');
  }

  async applyToInternship(internshipId: string): Promise<InternshipApplication> {
    return apiClient.post<InternshipApplication>('/internships/apply', {
      internshipId,
    });
  }

  // Check eligibility (needs at least 1 certificate)
  async checkEligibility(): Promise<{ eligible: boolean; reason?: string }> {
    return apiClient.get<{ eligible: boolean; reason?: string }>(
      '/internships/check-eligibility'
    );
  }
}

export const internshipService = new InternshipService();
