// Core data models for the application

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  gender?: 'male' | 'female' | 'other' | 'prefer-not-to-say';
  areaOfStudy?: string;
  graduationYear?: number;
  isEmailVerified: boolean;
  isOnboardingComplete: boolean;
  consentGiven: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  password: string;
}

export interface OnboardingData {
  phone: string;
  gender: 'male' | 'female' | 'other' | 'prefer-not-to-say';
  areaOfStudy: string;
  graduationYear: number;
  consentGiven: boolean;
}

export interface Domain {
  id: string;
  name: string;
  description: string;
  iconUrl?: string;
  color?: string;
}

export interface Topic {
  id: string;
  name: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedHours: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  domainId: string;
  topicId: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  objectives: string[];
  estimatedHours: number;
  thumbnailUrl?: string;
  modules: CourseModule[];
  createdAt: string;
}

export interface CourseModule {
  id: string;
  courseId: string;
  title: string;
  description: string;
  order: number;
  videos: Video[];
}

export interface Video {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  youtubeUrl: string;
  duration: number; // in seconds
  order: number;
  transcript?: string;
}

export interface VideoProgress {
  id: string;
  userId: string;
  videoId: string;
  courseId: string;
  watchedSeconds: number;
  lastPosition: number;
  completed: boolean;
  lastWatchedAt: string;
}

export interface CourseProgress {
  id: string;
  userId: string;
  courseId: string;
  progressPercentage: number;
  lastVideoId?: string;
  startedAt: string;
  lastAccessedAt: string;
  completedAt?: string;
}

export interface VideoNote {
  id: string;
  userId: string;
  videoId: string;
  content: string;
  timestamp: number; // position in video
  createdAt: string;
  updatedAt: string;
}

export interface Quiz {
  id: string;
  courseId: string;
  title: string;
  description: string;
  totalQuestions: number;
  passingScore: number; // percentage
  maxAttempts: number;
  timeLimit?: number; // in minutes
  questions: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  quizId: string;
  question: string;
  options: string[];
  correctAnswer: number; // index of correct option
  explanation?: string;
  order: number;
}

export interface QuizAttempt {
  id: string;
  userId: string;
  quizId: string;
  attemptNumber: number;
  answers: number[]; // array of selected option indices
  score: number;
  passed: boolean;
  startedAt: string;
  completedAt: string;
  timeSpent: number; // in seconds
}

export interface Certificate {
  id: string;
  userId: string;
  courseId: string;
  certificateCode: string;
  issueDate: string;
  pdfUrl: string;
  shareableUrl: string;
  issuedBy: string;
}

export interface Internship {
  id: string;
  title: string;
  company: string;
  description: string;
  requirements: string[];
  location?: string;
  isRemote: boolean;
  stipend?: number;
  duration: string;
  applyUrl: string;
  matchScore?: number; // 0-100
  status: 'approved' | 'pending' | 'rejected';
  postedAt: string;
  deadline?: string;
}

export interface SavedInternship {
  id: string;
  userId: string;
  internshipId: string;
  savedAt: string;
}

export interface InternshipApplication {
  id: string;
  userId: string;
  internshipId: string;
  status: 'pending' | 'reviewing' | 'accepted' | 'rejected';
  appliedAt: string;
  updatedAt: string;
}

export interface Mentor {
  id: string;
  name: string;
  title: string;
  expertise: string[];
  bio: string;
  avatarUrl?: string;
  linkedinUrl?: string;
  availableSlots: TimeSlot[];
}

export interface TimeSlot {
  id: string;
  mentorId: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

export interface MentorshipBooking {
  id: string;
  userId: string;
  mentorId: string;
  slotId: string;
  status: 'confirmed' | 'cancelled' | 'completed';
  notes?: string;
  bookedAt: string;
}

export interface PremiumLead {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  interestedIn: string;
  message?: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'course_generated' | 'quiz_ready' | 'certificate_ready' | 'internship_approved' | 'mentorship_booked';
  title: string;
  message: string;
  isRead: boolean;
  actionUrl?: string;
  createdAt: string;
}

export interface DashboardStats {
  coursesInProgress: number;
  coursesCompleted: number;
  certificatesEarned: number;
  quizzesPassed: number;
  totalWatchTime: number; // in minutes
}

export interface RecommendedContent {
  domains: Domain[];
  courses: Course[];
  internships: Internship[];
}
