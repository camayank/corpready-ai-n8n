// Course and Learning Service

import { apiClient } from './api';
import type {
  Course,
  CourseProgress,
  VideoProgress,
  VideoNote,
  Domain,
  Topic,
} from '@/types';

export interface GenerateCourseRequest {
  domainId: string;
  topicId: string;
  userAnswers?: Record<string, any>;
}

class CourseService {
  // Domain & Topic Selection
  async getDomains(): Promise<Domain[]> {
    return apiClient.get<Domain[]>('/domains');
  }

  async generateTopics(domainId: string, answers: Record<string, any>): Promise<Topic[]> {
    return apiClient.post<Topic[]>('/topics/generate', { domainId, answers });
  }

  async generateCourse(data: GenerateCourseRequest): Promise<Course> {
    return apiClient.post<Course>('/courses/generate', data);
  }

  // Course Management
  async getCourse(courseId: string): Promise<Course> {
    return apiClient.get<Course>(`/courses/${courseId}`);
  }

  async getMyCourses(): Promise<Course[]> {
    return apiClient.get<Course[]>('/courses/my-courses');
  }

  async getRecommendedCourses(): Promise<Course[]> {
    return apiClient.get<Course[]>('/courses/recommended');
  }

  // Progress Tracking
  async getCourseProgress(courseId: string): Promise<CourseProgress> {
    return apiClient.get<CourseProgress>(`/courses/${courseId}/progress`);
  }

  async getVideoProgress(videoId: string): Promise<VideoProgress | null> {
    return apiClient.get<VideoProgress>(`/videos/${videoId}/progress`);
  }

  async updateVideoProgress(
    videoId: string,
    data: { lastPosition: number; watchedSeconds: number; completed: boolean }
  ): Promise<VideoProgress> {
    return apiClient.post<VideoProgress>(`/videos/${videoId}/progress`, data);
  }

  // Video Notes
  async getVideoNotes(videoId: string): Promise<VideoNote[]> {
    return apiClient.get<VideoNote[]>(`/videos/${videoId}/notes`);
  }

  async createVideoNote(
    videoId: string,
    data: { content: string; timestamp: number }
  ): Promise<VideoNote> {
    return apiClient.post<VideoNote>(`/videos/${videoId}/notes`, data);
  }

  async updateVideoNote(
    noteId: string,
    data: { content: string }
  ): Promise<VideoNote> {
    return apiClient.patch<VideoNote>(`/notes/${noteId}`, data);
  }

  async deleteVideoNote(noteId: string): Promise<void> {
    return apiClient.delete<void>(`/notes/${noteId}`);
  }
}

export const courseService = new CourseService();
