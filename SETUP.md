# SkillPath India - Setup Guide

## Prerequisites

- Node.js 20+
- PostgreSQL 14+
- Docker & Docker Compose (optional)
- Git

## Local Development Setup

### 1. Clone Repository

```bash
git clone <repository-url>
cd corpready-ai-n8n
```

### 2. Database Setup

**Option A: Using Docker**
```bash
docker run -d \
  --name skillpath-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=skillpath \
  -p 5432:5432 \
  postgres:16-alpine
```

**Option B: Local PostgreSQL**
```bash
createdb skillpath
```

### 3. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Configure environment
cp .env.example .env

# Edit .env - set your database URL and secrets
# DATABASE_URL=postgresql://postgres:postgres@localhost:5432/skillpath
# JWT_ACCESS_SECRET=<generate-random-string>
# JWT_REFRESH_SECRET=<generate-random-string>

# Generate Prisma client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# (Optional) Seed database
npm run prisma:studio
# Use Prisma Studio to manually add sample data

# Start backend server
npm run dev
```

Backend will run on `http://localhost:3000`

### 4. Frontend Setup

```bash
# From root directory
npm install

# Configure environment (optional)
cp .env.example .env

# Start frontend dev server
npm run dev
```

Frontend will run on `http://localhost:8080`

### 5. Verify Setup

- Backend health: http://localhost:3000/health
- Frontend: http://localhost:8080
- Create an account and test the flow

## Docker Setup (Complete Stack)

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Access services:
# - Frontend: http://localhost:8080
# - Backend: http://localhost:3000
# - Database: localhost:5432
```

## Environment Configuration

### Backend (.env)

```env
NODE_ENV=development
PORT=3000

# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/skillpath?schema=public

# JWT Secrets (generate with: openssl rand -base64 32)
JWT_ACCESS_SECRET=your-super-secret-access-key-here
JWT_REFRESH_SECRET=your-super-secret-refresh-key-here
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password  # Generate from Google App Passwords
EMAIL_FROM=noreply@skillpath.in

# Frontend URL
FRONTEND_URL=http://localhost:8080

# Optional: API Keys
YOUTUBE_API_KEY=your-youtube-api-key
GROQ_API_KEY=your-groq-api-key
N8N_WEBHOOK_URL=http://localhost:5678/webhook/chat
```

### Frontend (.env)

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_NAME=SkillPath India
VITE_APP_URL=http://localhost:8080
```

## Database Management

### View Database
```bash
cd backend
npm run prisma:studio
```

### Create Migration
```bash
cd backend
npx prisma migrate dev --name your_migration_name
```

### Reset Database (⚠️ Deletes all data)
```bash
cd backend
npx prisma migrate reset
```

### Generate Prisma Client (after schema changes)
```bash
cd backend
npm run prisma:generate
```

## Email Setup (Gmail)

1. Go to Google Account settings
2. Enable 2-Factor Authentication
3. Generate App Password:
   - Go to Security → 2-Step Verification → App passwords
   - Select "Mail" and "Other (Custom name)"
   - Copy the generated password
4. Use this password in `SMTP_PASSWORD`

## Troubleshooting

### Backend won't start
```bash
# Check if PostgreSQL is running
psql -U postgres -h localhost

# Regenerate Prisma client
cd backend
npm run prisma:generate

# Check logs
cd backend
npm run dev
```

### Database connection errors
```bash
# Verify DATABASE_URL format
# postgresql://USERNAME:PASSWORD@HOST:PORT/DATABASE

# Test connection
psql postgresql://postgres:postgres@localhost:5432/skillpath
```

### Port already in use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 8080
lsof -ti:8080 | xargs kill -9
```

### Frontend API calls failing
- Check `VITE_API_BASE_URL` in frontend `.env`
- Verify backend is running on correct port
- Check browser console for CORS errors

### Email not sending
- Verify SMTP credentials
- Check spam folder
- Enable "Less secure app access" (Gmail) or use App Password
- Check backend logs for email errors

## n8n Setup (Optional)

For AI course generation:

1. Install n8n:
```bash
npm install -g n8n
```

2. Start n8n:
```bash
n8n start
```

3. Import workflow:
   - Open http://localhost:5678
   - Import `corpready-ai-n8n.json`
   - Configure Groq API credentials
   - Configure YouTube API credentials

4. Update backend `.env`:
```env
N8N_WEBHOOK_URL=http://localhost:5678/webhook/chat
```

## Running Tests

```bash
# Backend tests
cd backend
npm test

# Frontend tests
npm test
```

## Building for Production

### Backend
```bash
cd backend
npm run build
npm start
```

### Frontend
```bash
npm run build
npm run preview
```

### Docker Production Build
```bash
docker-compose -f docker-compose.prod.yml up -d
```

## Common Commands

```bash
# Backend
cd backend
npm run dev          # Start dev server
npm run build        # Build for production
npm run prisma:studio # Open database GUI
npm run lint         # Lint code

# Frontend
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Lint code

# Docker
docker-compose up -d              # Start all services
docker-compose down               # Stop all services
docker-compose logs -f backend    # View backend logs
docker-compose restart backend    # Restart backend
```

## Next Steps

1. Create your first account at http://localhost:8080/signup
2. Verify your email (check backend logs for verification link)
3. Complete onboarding
4. Start exploring the platform!

## Support

For issues or questions, check:
- Backend logs: `docker-compose logs -f backend`
- Frontend console: Browser DevTools
- Database: `npm run prisma:studio` (in backend directory)
