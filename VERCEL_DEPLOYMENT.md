# Vercel Deployment Guide

## Environment Variables Required

Add these environment variables in your Vercel project settings:

### Frontend Environment Variables

```bash
VITE_API_BASE_URL=https://your-backend-api.com/api
VITE_APP_NAME=SkillPath India
VITE_APP_URL=https://your-vercel-domain.vercel.app
```

## Steps to Deploy

### 1. Import Project to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import your GitHub repository: `camayank/corpready-ai-n8n`
4. Select the repository

### 2. Configure Build Settings

Vercel should auto-detect the settings from `vercel.json`, but verify:

- **Framework Preset:** Vite
- **Root Directory:** `./` (leave as root)
- **Build Command:** `cd coursera-path-main && npm install && npm run build`
- **Output Directory:** `coursera-path-main/dist`
- **Install Command:** `cd coursera-path-main && npm install`

### 3. Add Environment Variables

In Vercel project settings → Environment Variables, add:

| Variable | Value | Environment |
|----------|-------|-------------|
| `VITE_API_BASE_URL` | `https://your-backend-url.com/api` | Production, Preview, Development |
| `VITE_APP_NAME` | `SkillPath India` | Production, Preview, Development |
| `VITE_APP_URL` | Auto-filled by Vercel | Production, Preview, Development |

**Important:** Replace `https://your-backend-url.com/api` with your actual backend URL

### 4. Deploy

Click "Deploy" and wait for the build to complete.

## Backend Deployment

The backend (Express + Prisma) needs to be deployed separately. Options:

### Option 1: Railway.app (Recommended)
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway link
railway up
```

### Option 2: Render.com
1. Create new Web Service
2. Connect GitHub repo
3. Set build command: `cd backend && npm install && npm run build`
4. Set start command: `cd backend && npm start`
5. Add environment variables (see below)

### Option 3: Fly.io
```bash
# Install flyctl
curl -L https://fly.io/install.sh | sh

# Deploy
cd backend
fly launch
fly deploy
```

## Backend Environment Variables

Add these to your backend hosting platform:

```bash
# Database
DATABASE_URL=postgresql://user:password@host:5432/dbname

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this

# Email (for verification)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# Frontend URL (for CORS)
FRONTEND_URL=https://your-vercel-app.vercel.app

# Environment
NODE_ENV=production
PORT=3000
```

## Post-Deployment Checklist

- [ ] Frontend deployed to Vercel
- [ ] Backend deployed (Railway/Render/Fly)
- [ ] Database migrated: `npx prisma migrate deploy`
- [ ] Database seeded: `npm run prisma:seed`
- [ ] Environment variables set on both platforms
- [ ] CORS configured to allow Vercel domain
- [ ] Admin user created (check seed output)
- [ ] Test login at `https://your-app.vercel.app/signin`
- [ ] Test admin panel at `https://your-app.vercel.app/admin`

## Troubleshooting

### Build Fails on Vercel

```bash
# Test build locally
cd coursera-path-main
npm install
npm run build
```

### API Connection Issues

1. Check browser console for CORS errors
2. Verify `VITE_API_BASE_URL` is set correctly
3. Ensure backend CORS allows Vercel domain:

```typescript
// backend/src/index.ts
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:8080',
  credentials: true
}));
```

### 404 on Page Refresh

Already handled by `vercel.json` rewrites. If still occurring:
- Check `outputDirectory` in vercel.json
- Verify `dist/index.html` exists after build

## Security Checklist

- [ ] Change default admin password after first login
- [ ] Rotate JWT secrets from default values
- [ ] Enable HTTPS only (Vercel does this automatically)
- [ ] Set secure cookie flags in production
- [ ] Review CORS origins
- [ ] Enable rate limiting on backend
- [ ] Set up database backups

## Admin Credentials (First Login)

```
Email: admin@skillpath.com
Password: Admin@123456
```

**⚠️ CRITICAL: Change this password immediately after first login!**
