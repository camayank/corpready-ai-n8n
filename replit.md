# CorpReady Learning Pathways - Project Overview

## Overview

CorpReady Learning Pathways is a focused content curation platform that provides AI-powered learning pathway generation from YouTube videos. The platform enables personalized course curation, progress tracking, certificate generation, and career opportunities through an intuitive interface.

**Core Purpose:** Provide personalized, AI-curated learning pathways from YouTube's best content, organized into structured modules tailored to individual learning goals.

**Platform Type:** Full-stack web application with React frontend and Node.js backend  
**Scale:** 21 functional pages, 80+ features, 60+ API endpoints, 5 user roles

**Recent Updates (Nov 2025):**
- Migrated and rebranded from Vercel to Replit as "CorpReady"
- Redesigned landing page to focus on content curation features (not general corporate homepage)
- Configured Vite proxy for seamless frontend-backend communication
- Fixed authentication flow with proper NODE_ENV configuration
- Improved error handling for N8N AI integration and YouTube API services

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Technology Stack

**Frontend:**
- React 18 with TypeScript
- Vite for build tooling
- Tailwind CSS with shadcn/ui components
- TanStack Query for data fetching and caching
- React Router for navigation

**Backend:**
- Node.js 20+ with Express.js
- TypeScript for type safety
- Prisma ORM with PostgreSQL database
- JWT-based authentication with refresh tokens

**Development Tools:**
- tsx for TypeScript execution
- ESLint for code quality
- Jest for testing

### Authentication & Authorization

**Authentication Flow:**
- JWT access tokens (15-minute expiry)
- Refresh tokens (7-day expiry) stored in database
- HttpOnly cookies for secure token storage
- bcrypt password hashing (10 rounds)
- Email verification required for new accounts
- Password reset via time-limited tokens

**Authorization:**
- Role-based access control (RBAC) with 5 roles: USER, ADMIN, CURATOR, OPS, PARTNER
- Middleware-based permission checking
- Protected routes on frontend with guard components
- Backend route protection with role-specific middleware

**Rationale:** JWT provides stateless authentication while refresh tokens enable secure session management. Multi-role system allows granular permissions for different platform functions (content curation, operations, partnerships).

### Frontend Architecture

**Component Structure:**
- Page components in `src/pages/` for route-level views
- Reusable UI components in `src/components/` using shadcn/ui
- Layout components for consistent navigation (UserLayout, AdminLayout)
- Guard components for route protection (AuthGuard, EmailVerifiedGuard, OnboardingGuard, AdminGuard)

**State Management:**
- React Context for authentication state (AuthContext)
- TanStack Query for server state caching and synchronization
- Local component state for UI interactions

**Routing:**
- React Router with nested route structure
- Separate route hierarchies for user app (`/app/*`) and admin panel (`/admin/*`)
- Public routes for landing, authentication, and password reset
- Protected routes with multiple guard layers

**Rationale:** Component-based architecture promotes reusability. Context API handles global auth state while TanStack Query manages server data, avoiding prop drilling and reducing boilerplate. Guard components centralize access control logic.

### Backend Architecture

**API Design:**
- RESTful API endpoints organized by domain
- Route files in `src/routes/` map to controller functions
- Controllers in `src/controllers/` handle business logic
- Middleware chain: rate limiting → authentication → authorization → error handling

**Data Layer:**
- Prisma ORM for type-safe database queries
- Schema-first approach with migrations
- Database connection pooling
- Seed scripts for development data

**Security Measures:**
- Helmet.js for HTTP headers
- CORS configuration for cross-origin requests
- Express rate limiting (100 requests/15min general, 5 requests/15min for auth)
- Input validation with Zod schemas
- SQL injection prevention via Prisma parameterized queries

**Error Handling:**
- Centralized error handler middleware
- Consistent error response format
- Development vs. production error details
- Prisma error code translation

**Rationale:** Separation of routes, controllers, and services follows MVC pattern for maintainability. Prisma provides type safety and migration management. Layered middleware approach allows reusable security and validation logic.

### Database Design

**Core Models:**
- User: Profile data, credentials, role, verification status
- Course: Generated learning paths with modules and videos
- Quiz: Assessments with questions and answers
- Certificate: Earned achievements with verification codes
- Internship: Job opportunities with application tracking
- Mentor: Expert profiles with booking time slots
- Progress tracking: VideoProgress, CourseProgress, QuizAttempt

**Key Relationships:**
- One-to-many: User → Courses, Certificates, Applications
- Many-to-many: User ↔ Courses (via CourseProgress), User ↔ Internships (via saved/applied)
- Hierarchical: Course → Module → Video
- Audit trail: AdminActionLog tracks all admin operations

**Rationale:** Normalized schema reduces data duplication. Progress tracking models enable resume learning and analytics. Audit logging provides compliance and security.

### AI Integration

**N8N Workflow:**
- Webhook endpoint for course generation requests
- Integration with OpenRouter API (Meta LLaMA model)
- Conversational flow for gathering user preferences
- Course structure generation based on user input

**Fallback Strategy:**
- Mock data returned when N8N unavailable
- Graceful degradation ensures platform functionality

**Rationale:** External AI service separation allows model upgrades without code changes. Webhook pattern enables async processing of compute-intensive tasks.

### File Upload & Storage

**Video Content:**
- YouTube video embedding (no file storage required)
- Video metadata stored in database
- Progress tracking with timestamp-based notes

**PDF Certificates:**
- PDFKit library for server-side generation
- Generated on-demand, not pre-stored
- Unique verification codes for authenticity

**Rationale:** YouTube integration eliminates video hosting costs. On-demand PDF generation reduces storage requirements and ensures fresh data.

### Frontend-Backend Communication

**API Client:**
- Centralized ApiClient class in `src/services/api.ts`
- Automatic token injection for authenticated requests
- Error handling with ApiError custom class
- Query parameter serialization

**Service Layer:**
- Domain-specific service files (auth.service, user.service, etc.)
- Type-safe request/response with TypeScript interfaces
- Encapsulates API endpoints from components

**Rationale:** Service layer abstracts API details from components, making endpoint changes easier. Centralized client enables consistent error handling and authentication.

## External Dependencies

### Third-Party Services

**Email (Nodemailer):**
- SMTP configuration for transactional emails
- Email verification tokens
- Password reset links
- Required environment variables: SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD, EMAIL_FROM

**AI/LLM (OpenRouter):**
- Course generation workflow
- Meta LLaMA model for conversational curation
- Optional: Platform functions without it using fallback data

**YouTube API:**
- Video embedding via iframe
- No API key required for public video playback
- Metadata stored in application database

### Infrastructure Services

**PostgreSQL Database:**
- Version 14+ required
- Connection via DATABASE_URL environment variable
- Supports local development and cloud hosting (e.g., Supabase, Railway)

**Deployment Platforms:**

**Frontend (Vercel):**
- Automatic Vite builds
- Environment variables: VITE_API_BASE_URL, VITE_APP_NAME, VITE_APP_URL
- SPA routing with rewrites configuration

**Backend (Node.js hosting):**
- Requires Node.js 20+ runtime
- Environment variables: All JWT secrets, database URL, SMTP config, N8N webhook URL
- Process manager recommended (PM2, Docker)

### NPM Packages

**Frontend Core:**
- @tanstack/react-query: Server state management
- react-router-dom: Client-side routing
- @radix-ui/*: Headless UI primitives (30+ packages)
- tailwindcss: Utility-first CSS

**Backend Core:**
- express: Web framework
- @prisma/client + prisma: Database ORM
- jsonwebtoken: JWT creation/verification
- bcryptjs: Password hashing
- zod: Runtime validation
- helmet, cors, express-rate-limit: Security middleware
- nodemailer: Email sending
- pdfkit: PDF generation

**Rationale:** Established packages reduce development time. Radix UI provides accessible components. Prisma's type generation eliminates runtime database errors. Zod enables schema-first validation.