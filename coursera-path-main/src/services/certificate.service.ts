// Certificate Service

import { apiClient } from './api';
import type { Certificate } from '@/types';

class CertificateService {
  async getMyCertificates(): Promise<Certificate[]> {
    return apiClient.get<Certificate[]>('/certificates/my-certificates');
  }

  async getCertificate(certificateId: string): Promise<Certificate> {
    return apiClient.get<Certificate>(`/certificates/${certificateId}`);
  }

  async verifyCertificate(certificateCode: string): Promise<{
    valid: boolean;
    certificate?: Certificate;
  }> {
    return apiClient.get<{
      valid: boolean;
      certificate?: Certificate;
    }>(`/certificates/verify/${certificateCode}`);
  }

  async downloadCertificate(certificateId: string): Promise<Blob> {
    const response = await apiClient.get<Response>(
      `/certificates/${certificateId}/download`
    );
    return response.blob();
  }

  // Trigger certificate generation (called after passing quiz)
  async requestCertificate(courseId: string): Promise<Certificate> {
    return apiClient.post<Certificate>('/certificates/generate', { courseId });
  }
}

export const certificateService = new CertificateService();
