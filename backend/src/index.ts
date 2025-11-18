import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/errorHandler';
import { rateLimiter } from './middleware/rateLimiter';

// Import routes
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import domainRoutes from './routes/domain.routes';
import topicRoutes from './routes/topic.routes';
import courseRoutes from './routes/course.routes';
import videoRoutes from './routes/video.routes';
import quizRoutes from './routes/quiz.routes';
import certificateRoutes from './routes/certificate.routes';
import internshipRoutes from './routes/internship.routes';
import mentorRoutes from './routes/mentor.routes';
import mentorshipRoutes from './routes/mentorship.routes';
import notificationRoutes from './routes/notification.routes';
import dashboardRoutes from './routes/dashboard.routes';
import premiumRoutes from './routes/premium.routes';
import noteRoutes from './routes/note.routes';
import adminRoutes from './routes/admin';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:8080',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rateLimiter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/domains', domainRoutes);
app.use('/api/topics', topicRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/quizzes', quizRoutes);
app.use('/api/certificates', certificateRoutes);
app.use('/api/internships', internshipRoutes);
app.use('/api/mentors', mentorRoutes);
app.use('/api/mentorship', mentorshipRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/premium', premiumRoutes);
app.use('/api/notes', noteRoutes);

// Admin Routes
app.use('/api/admin', adminRoutes);

// Error handler (must be last)
app.use(errorHandler);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV}`);
});
