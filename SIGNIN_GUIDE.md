# 🔐 How to Sign In - Complete Guide

## 📋 Quick Start (Local Development)

### Step 1: Start Backend & Frontend

```bash
# Terminal 1 - Start Backend
cd backend
npm install
npm run dev

# Terminal 2 - Start Frontend
cd coursera-path-main
npm install
npm run dev
```

### Step 2: Setup Database (First Time Only)

```bash
cd backend

# Run migrations
npx prisma migrate dev

# Seed database (creates admin user + sample data)
npm run prisma:seed
```

---

## 👤 Sign In Options

### Option 1: Admin User (Pre-seeded)

**URL:** http://localhost:8080/signin

**Credentials:**
```
Email: admin@skillpath.com
Password: Admin@123456
```

**Access:**
- ✅ Full admin panel (/admin)
- ✅ User dashboard (/app)
- ✅ All features

---

### Option 2: Create New User

**URL:** http://localhost:8080/signup

**Steps:**
1. Fill signup form
2. Submit and get redirected to `/verify-email`
3. Check your email for verification link (or check backend logs for token)
4. Click verification link
5. Complete onboarding form
6. Access user dashboard

**Access:**
- ✅ User dashboard (/app)
- ❌ Admin panel (regular users can't access)

---

## 🔄 Sign In Flow

```
┌─────────────────────────────────────────┐
│ 1. Visit /signin                        │
│    Enter email + password               │
└────────────┬────────────────────────────┘
             │
             v
┌─────────────────────────────────────────┐
│ 2. Backend validates credentials        │
│    Returns: accessToken + refreshToken  │
└────────────┬────────────────────────────┘
             │
             v
┌─────────────────────────────────────────┐
│ 3. Tokens stored in localStorage        │
│    User data fetched and cached         │
└────────────┬────────────────────────────┘
             │
             v
┌─────────────────────────────────────────┐
│ 4. Route Guards Check:                  │
│    ✓ Is user logged in?                 │
│    ✓ Is email verified?                 │
│    ✓ Is onboarding complete?            │
│    ✓ Does user have required role?      │
└────────────┬────────────────────────────┘
             │
             v
┌─────────────────────────────────────────┐
│ 5. Redirect to appropriate page:        │
│    - /verify-email (if not verified)    │
│    - /onboarding (if not complete)      │
│    - /admin (if admin role)             │
│    - /app (if regular user)             │
└─────────────────────────────────────────┘
```

---

## 🎯 Testing Sign In

### Test Admin Access

```bash
# 1. Sign in as admin
Email: admin@skillpath.com
Password: Admin@123456

# 2. Should redirect to: /app (user dashboard)

# 3. Navigate to admin panel:
http://localhost:8080/admin

# 4. Should see:
✓ Admin Dashboard with KPIs
✓ Left sidebar navigation
✓ Users Management link
```

---

## 🔧 Troubleshooting

### Issue: "Invalid credentials"

**Check:**
```bash
# Verify database is seeded
cd backend
npm run prisma:seed

# Expected output:
✅ Admin user created: { email: 'admin@skillpath.com', role: 'ADMIN' }
✅ Domains created
✅ Topics created for Technology domain
```

---

### Issue: "Cannot access /admin"

**Reason:** User doesn't have ADMIN role

**Solutions:**

**Option A: Use admin account**
```
Email: admin@skillpath.com
Password: Admin@123456
```

**Option B: Promote existing user to admin**
```bash
# Using Prisma Studio
cd backend
npx prisma studio

# Navigate to "users" table
# Find your user
# Change "role" field to "ADMIN"
# Save
```

**Option C: Direct database update**
```bash
cd backend
npx prisma db seed

# Or manually via SQL:
psql $DATABASE_URL

UPDATE users SET role = 'ADMIN' WHERE email = 'your@email.com';
```

---

### Issue: Backend not responding

**Check:**
```bash
# Verify backend is running
curl http://localhost:3000/health

# Expected response:
{"status":"ok","timestamp":"2025-11-18T..."}

# Check backend logs
cd backend
npm run dev

# Should see:
🚀 Server running on port 3000
📝 Environment: development
```

---

### Issue: Frontend can't connect to backend

**Check environment variables:**

```bash
# coursera-path-main/.env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_NAME=SkillPath India
VITE_APP_URL=http://localhost:8080
```

**Restart frontend after changing .env:**
```bash
cd coursera-path-main
npm run dev
```

---

## 🔐 Backend Auth Endpoints

### POST /api/auth/signin

**Request:**
```json
{
  "email": "admin@skillpath.com",
  "password": "Admin@123456"
}
```

**Response (Success):**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "uuid",
    "email": "admin@skillpath.com",
    "name": "System Administrator",
    "role": "ADMIN",
    "isEmailVerified": true,
    "isOnboardingComplete": true
  }
}
```

---

### POST /api/auth/signup

**Request:**
```json
{
  "email": "newuser@example.com",
  "password": "SecurePass123!",
  "name": "John Doe"
}
```

**Response (Success):**
```json
{
  "message": "User registered successfully. Please verify your email.",
  "userId": "uuid"
}
```

---

### GET /api/auth/me (Protected)

**Headers:**
```
Authorization: Bearer <accessToken>
```

**Response:**
```json
{
  "id": "uuid",
  "email": "admin@skillpath.com",
  "name": "System Administrator",
  "role": "ADMIN",
  "isActive": true,
  "isEmailVerified": true,
  "isOnboardingComplete": true
}
```

---

## 🎭 Role-Based Access

| Page | USER | ADMIN | CURATOR | OPS | PARTNER |
|------|------|-------|---------|-----|---------|
| /app | ✅ | ✅ | ✅ | ✅ | ✅ |
| /admin | ❌ | ✅ | ✅ | ✅ | ✅ |
| /admin/users | ❌ | ✅ | ❌ | ❌ | ❌ |
| /admin/domains | ❌ | ✅ | ✅ | ❌ | ❌ |
| /admin/courses | ❌ | ✅ | ✅ | ❌ | ❌ |
| /admin/internships | ❌ | ✅ | ❌ | ❌ | ✅ |

---

## ⚡ Quick Commands

```bash
# Complete local setup from scratch
git clone https://github.com/camayank/corpready-ai-n8n.git
cd corpready-ai-n8n

# Backend setup
cd backend
npm install
npx prisma migrate dev
npm run prisma:seed
npm run dev

# Frontend setup (new terminal)
cd ../coursera-path-main
npm install
npm run dev

# Open browser
http://localhost:8080/signin
```

---

## 📧 Email Verification (Development)

During development, email verification links are logged to console:

```bash
# Backend terminal will show:
📧 Email Verification Link:
http://localhost:8080/verify-email?token=abc123...

# Copy this URL and open in browser
```

Or skip verification for testing:

```sql
-- Direct database update
UPDATE users SET "isEmailVerified" = true WHERE email = 'your@email.com';
```

---

## 🚀 Production Sign In

Once deployed to Vercel:

**URL:** `https://your-app.vercel.app/signin`

**Admin Credentials:** Same as above
```
Email: admin@skillpath.com
Password: Admin@123456
```

**⚠️ CRITICAL:** Change admin password immediately after first production login!

---

## 📝 Password Requirements

- Minimum 8 characters
- At least one uppercase letter (A-Z)
- At least one lowercase letter (a-z)
- At least one number (0-9)
- At least one special character (!@#$%^&*)

Example valid passwords:
- `Admin@123456` ✅
- `SecurePass123!` ✅
- `MyP@ssw0rd` ✅

---

**Need help?** Check backend logs for authentication errors:
```bash
cd backend
npm run dev

# Watch for error messages during signin attempts
```
