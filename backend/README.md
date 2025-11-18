# SkillPath India - Backend API

Backend API for SkillPath India learning platform built with Node.js, Express, TypeScript, and Prisma.

## Features

- 🔐 JWT-based authentication with refresh tokens
- 📚 Course generation and management
- 🎥 Video progress tracking
- 📝 Quiz system with automatic grading
- 🏆 Certificate generation
- 💼 Internship listings and applications
- 👨‍🏫 Mentorship booking system
- 🔔 Notifications
- 📊 User dashboard with stats

## Tech Stack

- **Runtime**: Node.js 20+
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT (jsonwebtoken + bcrypt)
- **Validation**: Zod
- **Email**: Nodemailer
- **Security**: Helmet, CORS, Rate Limiting

## Prerequisites

- Node.js 20 or higher
- PostgreSQL 14 or higher
- npm or bun

## Quick Start

1. **Install dependencies**:
```bash
cd backend
npm install
```

2. **Set up environment variables**:
```bash
cp .env.example .env
# Edit .env with your database credentials and secrets
```

3. **Set up database**:
```bash
# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# (Optional) Open Prisma Studio to view database
npm run prisma:studio
```

4. **Start development server**:
```bash
npm run dev
```

The API will be available at `http://localhost:3000`

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment | `development` |
| `PORT` | Server port | `3000` |
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/skillpath` |
| `JWT_ACCESS_SECRET` | Secret for access tokens | Random string |
| `JWT_REFRESH_SECRET` | Secret for refresh tokens | Random string |
| `JWT_ACCESS_EXPIRES_IN` | Access token expiry | `15m` |
| `JWT_REFRESH_EXPIRES_IN` | Refresh token expiry | `7d` |
| `SMTP_HOST` | Email server host | `smtp.gmail.com` |
| `SMTP_PORT` | Email server port | `587` |
| `SMTP_USER` | Email username | Your email |
| `SMTP_PASSWORD` | Email password | App password |
| `EMAIL_FROM` | Sender email | `noreply@skillpath.in` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:8080` |

## API Endpoints

### Authentication (`/api/auth`)
- `POST /signup` - Create new account
- `POST /login` - Login
- `POST /logout` - Logout
- `POST /refresh` - Refresh access token
- `POST /verify-email` - Verify email
- `POST /resend-verification` - Resend verification email
- `POST /forgot-password` - Request password reset
- `POST /reset-password` - Reset password
- `POST /change-password` - Change password (authenticated)
- `GET /me` - Get current user

### Users (`/api/users`)
- `GET /profile` - Get user profile
- `PATCH /profile` - Update profile
- `POST /onboarding` - Complete onboarding

### Courses (`/api/courses`)
- `POST /generate` - AI-generate course
- `GET /my-courses` - Get enrolled courses
- `GET /recommended` - Get recommendations
- `GET /:id` - Get course details
- `GET /:id/progress` - Get course progress

### Videos (`/api/videos`)
- `GET /:id/progress` - Get video progress
- `POST /:id/progress` - Update video progress
- `GET /:id/notes` - Get video notes
- `POST /:id/notes` - Create note

### Quizzes (`/api/quizzes`)
- `GET /:id` - Get quiz
- `GET /:id/attempts` - Get attempts
- `POST /:id/submit` - Submit quiz
- `GET /:id/can-take` - Check eligibility

### Certificates (`/api/certificates`)
- `GET /my-certificates` - Get certificates
- `GET /verify/:code` - Verify certificate
- `GET /:id/download` - Download PDF

### Internships (`/api/internships`)
- `GET /` - Get all internships
- `GET /recommended` - Get recommendations
- `GET /saved` - Get saved internships
- `POST /save` - Save internship
- `POST /apply` - Apply to internship
- `GET /applications` - Get applications

### Mentorship (`/api/mentors`, `/api/mentorship`)
- `GET /mentors` - Get all mentors
- `GET /mentors/:id` - Get mentor details
- `POST /mentorship/book` - Book session
- `GET /mentorship/my-bookings` - Get bookings

### Dashboard (`/api/dashboard`)
- `GET /stats` - Get user stats
- `GET /recommendations` - Get recommendations

### Notifications (`/api/notifications`)
- `GET /` - Get all notifications
- `GET /unread-count` - Get unread count
- `PATCH /:id/read` - Mark as read
- `PATCH /mark-all-read` - Mark all as read

## Database Schema

See `prisma/schema.prisma` for the complete schema.

**Main Models**:
- User - User accounts and profiles
- Course - Learning courses
- CourseModule - Course sections
- Video - YouTube videos
- Quiz - Assessments
- Certificate - Earned certificates
- Internship - Internship listings
- Mentor - Mentor profiles
- Notification - User notifications

## Development

```bash
# Start dev server with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# View database in browser
npm run prisma:studio

# Create new migration
npx prisma migrate dev --name migration_name
```

## Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

## Docker

```bash
# Build image
docker build -t skillpath-backend .

# Run container
docker run -p 3000:3000 --env-file .env skillpath-backend
```

## Security Features

- ✅ JWT authentication with refresh tokens
- ✅ Password hashing with bcrypt
- ✅ Rate limiting (100 req/15min)
- ✅ Strict auth rate limiting (5 attempts/15min)
- ✅ CORS protection
- ✅ Helmet security headers
- ✅ Input validation
- ✅ SQL injection protection (Prisma)

## Production Deployment

1. Set `NODE_ENV=production`
2. Use strong random secrets for JWT
3. Enable HTTPS
4. Set up proper SMTP server
5. Configure database backups
6. Set up monitoring (Sentry, etc.)
7. Use a reverse proxy (nginx, Caddy)
8. Enable database connection pooling

## License

Proprietary - SkillPath India
