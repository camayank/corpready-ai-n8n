// Mentorship and Premium Service

import { apiClient } from './api';
import type { Mentor, MentorshipBooking, PremiumLead } from '@/types';

export interface BookMentorRequest {
  mentorId: string;
  slotId: string;
  notes?: string;
}

export interface PremiumLeadRequest {
  name: string;
  email: string;
  phone: string;
  interestedIn: string;
  message?: string;
}

class MentorshipService {
  // Mentorship
  async getMentors(): Promise<Mentor[]> {
    return apiClient.get<Mentor[]>('/mentors');
  }

  async getMentor(mentorId: string): Promise<Mentor> {
    return apiClient.get<Mentor>(`/mentors/${mentorId}`);
  }

  async bookMentor(data: BookMentorRequest): Promise<MentorshipBooking> {
    return apiClient.post<MentorshipBooking>('/mentorship/book', data);
  }

  async getMyBookings(): Promise<MentorshipBooking[]> {
    return apiClient.get<MentorshipBooking[]>('/mentorship/my-bookings');
  }

  async cancelBooking(bookingId: string): Promise<void> {
    return apiClient.delete<void>(`/mentorship/bookings/${bookingId}`);
  }

  // Premium Leads
  async submitPremiumLead(data: PremiumLeadRequest): Promise<PremiumLead> {
    return apiClient.post<PremiumLead>('/premium/leads', data);
  }
}

export const mentorshipService = new MentorshipService();
