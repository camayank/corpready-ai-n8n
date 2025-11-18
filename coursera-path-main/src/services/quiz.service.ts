// Quiz and Assessment Service

import { apiClient } from './api';
import type { Quiz, QuizAttempt } from '@/types';

export interface SubmitQuizRequest {
  quizId: string;
  answers: number[];
  timeSpent: number;
}

class QuizService {
  async getQuiz(quizId: string): Promise<Quiz> {
    return apiClient.get<Quiz>(`/quizzes/${quizId}`);
  }

  async getCourseQuiz(courseId: string): Promise<Quiz> {
    return apiClient.get<Quiz>(`/courses/${courseId}/quiz`);
  }

  async getQuizAttempts(quizId: string): Promise<QuizAttempt[]> {
    return apiClient.get<QuizAttempt[]>(`/quizzes/${quizId}/attempts`);
  }

  async submitQuiz(data: SubmitQuizRequest): Promise<QuizAttempt> {
    return apiClient.post<QuizAttempt>(`/quizzes/${data.quizId}/submit`, {
      answers: data.answers,
      timeSpent: data.timeSpent,
    });
  }

  async canTakeQuiz(quizId: string, courseId: string): Promise<{
    canTake: boolean;
    reason?: string;
    attemptsRemaining?: number;
    progressPercentage?: number;
  }> {
    return apiClient.get<{
      canTake: boolean;
      reason?: string;
      attemptsRemaining?: number;
      progressPercentage?: number;
    }>(`/quizzes/${quizId}/can-take`, { params: { courseId } });
  }
}

export const quizService = new QuizService();
