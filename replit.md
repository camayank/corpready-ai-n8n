# CorpReady - Corporate Training Platform

## Overview
CorpReady (corpready.in) is a full-stack AI-powered corporate training platform that provides personalized learning paths, industry certifications, skill assessments, and verified career opportunities for professionals and enterprises.

**Current State:** Successfully migrated from Vercel to Replit, rebranded from SkillPath to CorpReady with modern UI/UX.

## Recent Changes (November 18, 2025)
- **Complete Rebrand:** Transformed from SkillPath India to CorpReady corporate training platform
- **Modern UI/UX:** Updated design system with new corporate color palette (Indigo, Teal, Coral)
- **Glassmorphism Effects:** Added modern glass morphism patterns and gradient animations
- **Content Updates:** Repositioned platform for enterprise/corporate training market
- **Migrated from Vercel to Replit** environment
- Configured Vite frontend to run on port 5000 with host 0.0.0.0
- Configured Express backend to bind to 0.0.0.0 for Replit compatibility
- Fixed Prisma import paths (changed from `../../lib/prisma` to correct path `../../utils/db`)
- Added Express trust proxy setting for proper rate limiting in Replit environment
- Set up PostgreSQL database using Replit's built-in Neon database
- Configured all required environment variables and secrets
- Created unified startup script (`start.sh`) to run both backend and frontend
- Fixed start.sh directory navigation using subshells to properly start both services
- Verified authentication endpoints working correctly (tested admin login successfully)

## Project Architecture

### Technology Stack
- **Frontend:** React + Vite + TypeScript + Tailwind CSS + shadcn/ui
- **Backend:** Node.js + Express + TypeScript + Prisma ORM
- **Database:** PostgreSQL (Replit's managed Neon database)
- **AI Services:** GROQ API for AI features
- **Email:** SMTP integration for user notifications
- **Video Content:** YouTube API integration

### Project Structure
```
├── backend/                    # Express API server
│   ├── src/
│   │   ├── controllers/       # Route controllers
│   │   ├── middleware/        # Auth, rate limiting, error handling
│   │   ├── routes/            # API routes
│   │   ├── utils/             # Database, email, JWT utilities
│   │   └── index.ts          # Main server file
│   ├── prisma/               # Database schema and migrations
│   └── package.json          # Backend dependencies
│
├── coursera-path-main/        # React frontend application
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── pages/            # Page components
│   │   ├── services/         # API client services
│   │   └── contexts/         # React contexts
│   └── package.json          # Frontend dependencies
│
├── start.sh                  # Startup script for both servers
└── replit.md                 # This file
```

### Port Configuration
- **Frontend (Vite):** Port 5000 (exposed via webview)
- **Backend (Express):** Port 3000 (internal)
- **Database:** Managed by Replit (connection via DATABASE_URL)

### Environment Variables
The following environment variables are configured in Replit Secrets:
- `DATABASE_URL` - PostgreSQL connection (auto-configured by Replit)
- `JWT_ACCESS_SECRET` - JWT token signing secret
- `JWT_REFRESH_SECRET` - JWT refresh token secret
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD` - Email service config
- `EMAIL_FROM` - Sender email address
- `YOUTUBE_API_KEY` - YouTube Data API key
- `GROQ_API_KEY` - GROQ AI API key

## Key Features
1. **AI-Powered Skill Assessment:** Intelligent skill gap analysis and personalized roadmaps
2. **Corporate Training Programs:** Enterprise-grade learning paths and certifications
3. **Interactive Assessments:** AI-generated quizzes and skill validation
4. **Industry Certifications:** Recognized credentials for career advancement
5. **Talent Marketplace:** Connect skilled professionals with opportunities
6. **Mentorship Program:** Access to industry experts and coaches
7. **Admin Dashboard:** Comprehensive L&D and user management tools
8. **Analytics Dashboard:** Track ROI and skill development metrics

## User Preferences
- Using npm as the package manager for both frontend and backend
- Development server runs both backend and frontend concurrently
- Frontend proxies API requests to backend at `/api/*`

## Development Workflow

### Starting the Application
The application auto-starts via the "SkillPath India" workflow which runs `bash start.sh`.

### Database Management
- **Schema Changes:** Edit `backend/prisma/schema.prisma`
- **Apply Changes:** Run `cd backend && npx prisma db push`
- **View Data:** Run `cd backend && npx prisma studio`

### Adding Dependencies
- **Frontend:** `cd coursera-path-main && npm install <package>`
- **Backend:** `cd backend && npm install <package>`

## Test Credentials
The database has been seeded with test users for all roles:
- **Admin:** admin@skillpath.com / Admin@123456 (Note: Will be updated to corpready.in in next backend seed update)
- **Student:** student@skillpath.com / Student@123456
- **Curator:** curator@skillpath.com / Curator@123456
- **Operations:** ops@skillpath.com / Ops@123456
- **Partner:** partner@skillpath.com / Partner@123456

## Notes
- Frontend is configured to work with Replit's webview on port 5000
- Backend API is accessible at `https://<replit-domain>/api/`
- Database migrations use `prisma db push` (not migrate) for development
- The app uses Express trust proxy for proper client IP detection behind Replit's proxy
- Both frontend and backend run concurrently via start.sh using subshells
