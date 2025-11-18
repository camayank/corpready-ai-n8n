# SkillPath India - Full Stack Learning Platform

AI-powered learning platform for Indian students to discover personalized learning paths, earn certificates, and connect with internship opportunities.

## 🎯 Project Overview

**SkillPath India** helps Indian students:
- 📚 Discover AI-curated YouTube video courses
- 🎓 Complete quizzes and earn verified certificates
- 💼 Get matched with verified internships
- 👨‍🏫 Connect with mentors for career guidance

## 🏗️ Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Frontend      │────▶│   Backend API   │────▶│   PostgreSQL    │
│   (React + TS)  │     │   (Node.js)     │     │   Database      │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                               │
                               ▼
                        ┌─────────────────┐
                        │   n8n Workflow  │
                        │   (AI Curation) │
                        └─────────────────┘
```

## 📁 Project Structure

```
corpready-ai-n8n/
├── backend/              # Node.js + Express + Prisma backend
│   ├── src/
│   │   ├── controllers/  # Request handlers
│   │   ├── routes/       # API routes
│   │   ├── middleware/   # Auth, error handling, rate limiting
│   │   ├── services/     # Business logic
│   │   └── utils/        # Helpers (JWT, email, db)
│   ├── prisma/           # Database schema and migrations
│   ├── tests/            # Test files
│   └── package.json
├── src/                  # React frontend
│   ├── components/       # UI components
│   ├── pages/            # Page components
│   ├── services/         # API client
│   ├── contexts/         # React contexts
│   └── types/            # TypeScript types
├── .github/
│   └── workflows/        # CI/CD pipelines
├── docker-compose.yml    # Multi-container setup
├── Dockerfile.frontend   # Frontend Docker image
└── corpready-ai-n8n.json # n8n workflow definition
```

## 🚀 Quick Start

### Option 1: Docker (Recommended)

```bash
# Start all services
docker-compose up -d

# Access:
# - Frontend: http://localhost:8080
# - Backend API: http://localhost:3000
# - PostgreSQL: localhost:5432
```

### Option 2: Manual Setup

**Prerequisites:**
- Node.js 20+
- PostgreSQL 14+
- npm or bun

**Backend:**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database credentials
npm run prisma:generate
npm run prisma:migrate
npm run dev
```

**Frontend:**
```bash
npm install
npm run dev
```

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Routing**: React Router v6
- **UI Library**: shadcn-ui (Radix UI)
- **Styling**: Tailwind CSS
- **State**: React Query + Context API
- **Forms**: React Hook Form + Zod

### Backend
- **Runtime**: Node.js 20
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Auth**: JWT + bcrypt
- **Email**: Nodemailer
- **Security**: Helmet, CORS, Rate Limiting

### Infrastructure
- **Containerization**: Docker + Docker Compose
- **CI/CD**: GitHub Actions
- **Automation**: n8n workflows
- **AI**: Groq (llama-3.3-70b)

## 📋 Features

### ✅ Implemented
- [x] User authentication (signup, login, email verification)
- [x] Password reset flow
- [x] User onboarding
- [x] AI course curation wizard
- [x] Video player with progress tracking
- [x] Video notes with timestamps
- [x] Quiz system with auto-grading
- [x] Certificate generation
- [x] Internship listings and applications
- [x] Mentor booking system
- [x] User dashboard with stats
- [x] Notifications system
- [x] Responsive design
- [x] Complete backend API (37+ endpoints)
- [x] Database schema with 15+ models
- [x] Docker setup
- [x] CI/CD pipeline

### 🚧 To Implement
- [ ] PDF certificate generation
- [ ] Real-time notifications (WebSocket)
- [ ] Search functionality
- [ ] Payment integration for premium
- [ ] Email notifications
- [ ] Admin dashboard
- [ ] Analytics tracking
- [ ] E2E tests
- [ ] Performance optimization

## 🔑 Environment Variables

**Backend (.env)**:
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/skillpath
JWT_ACCESS_SECRET=your-secret-key
JWT_REFRESH_SECRET=your-refresh-secret
SMTP_HOST=smtp.gmail.com
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
FRONTEND_URL=http://localhost:8080
```

**Frontend (.env)**:
```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_NAME=SkillPath India
```

## 📚 API Documentation

See [backend/README.md](./backend/README.md) for complete API documentation.

**Base URL**: `http://localhost:3000/api`

**Key Endpoints**:
- `POST /auth/signup` - Create account
- `POST /auth/login` - Login
- `GET /auth/me` - Get current user
- `POST /courses/generate` - Generate AI course
- `GET /courses/my-courses` - Get enrolled courses
- `POST /quizzes/:id/submit` - Submit quiz
- `GET /certificates/my-certificates` - Get certificates
- `GET /internships` - List internships
- `POST /internships/apply` - Apply to internship

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests (when implemented)
npm test
```

## 🐳 Docker Commands

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild images
docker-compose up -d --build

# Access database
docker exec -it skillpath-db psql -U postgres -d skillpath
```

## 🔒 Security Features

- ✅ JWT authentication with refresh tokens
- ✅ Bcrypt password hashing
- ✅ Rate limiting (100 req/15min)
- ✅ Auth rate limiting (5 attempts/15min)
- ✅ CORS protection
- ✅ Helmet security headers
- ✅ Input validation (Zod)
- ✅ SQL injection protection (Prisma)
- ✅ Protected routes (frontend guards)
- ✅ Email verification

## 📊 Database Schema

**Main Models**:
- Users (authentication, profiles)
- Courses & Modules (learning content)
- Videos & Progress (watch tracking)
- Quizzes & Attempts (assessments)
- Certificates (achievements)
- Internships & Applications (career)
- Mentors & Bookings (mentorship)
- Notifications (engagement)

See `backend/prisma/schema.prisma` for complete schema.

## 🤖 n8n AI Workflow

The project includes an n8n workflow for AI-powered course curation:
- Chat interface for learning intent detection
- Groq LLM integration (llama-3.3-70b)
- YouTube API integration
- Memory-enabled conversational AI

Import `corpready-ai-n8n.json` into your n8n instance.

## 🚢 Deployment

### Production Checklist
- [ ] Set strong JWT secrets
- [ ] Enable HTTPS
- [ ] Configure production database
- [ ] Set up SMTP server
- [ ] Enable database backups
- [ ] Set up monitoring (Sentry)
- [ ] Configure CDN for static assets
- [ ] Set up rate limiting
- [ ] Enable logging
- [ ] Security audit

### Deployment Options
- **Frontend**: Vercel, Netlify, Cloudflare Pages
- **Backend**: Railway, Render, DigitalOcean, AWS
- **Database**: Supabase, Neon, Railway
- **All-in-one**: Docker on VPS (DigitalOcean, Linode)

## 📄 License

Proprietary - SkillPath India

## 👥 Team

Built with ❤️ for Indian students

## 🤝 Contributing

This is a private project. For questions or access, contact the maintainers.

---

**Status**: ✅ Full stack complete - Backend API, Frontend UI, Database, Docker, CI/CD all ready!
