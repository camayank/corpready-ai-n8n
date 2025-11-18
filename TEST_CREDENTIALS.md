# Test Credentials for SkillPath India

This document contains test credentials for all user roles to help you explore all screens in the application.

## How to Set Up Test Users

Run the database seed script:

```bash
cd backend
npm run prisma:seed
```

Or if using Docker:

```bash
docker exec -it skillpath-backend npm run prisma:seed
```

## Test Accounts

### 👨‍💼 ADMIN - Full System Access

- **Email:** `admin@skillpath.com`
- **Password:** `Admin@123456`
- **Access:** All admin panel features, user management, system configuration
- **Routes:** `/admin/*`

**Admin Panel Screens:**
- ✅ Dashboard (`/admin`)
- ✅ Users Management (`/admin/users`)
- ✅ Internships Management (`/admin/internships`)
- ✅ Domains & Topics (`/admin/domains`)
- ✅ Courses Management (`/admin/courses`)

---

### 🎓 STUDENT - Regular User

- **Email:** `student@skillpath.com`
- **Password:** `Student@123`
- **Access:** Learning platform, courses, internships, mentorship
- **Routes:** `/app/*`

**User Screens:**
- ✅ Dashboard (`/app`)
- ✅ Course Curate (`/app/curate`)
- ✅ Course Player (`/app/course/:id`)
- ✅ Quiz Taker (`/app/quiz/:id`)
- ✅ Certificates (`/app/certificates`)
- ✅ Internships (`/app/internships`)
- ✅ Mentorship (`/app/mentorship`)
- ✅ Settings (`/app/settings`)

---

### 📚 CURATOR - Content Management

- **Email:** `curator@skillpath.com`
- **Password:** `Curator@123`
- **Access:** Content creation, course management, quality control
- **Routes:** `/app/*` (with curator privileges)

**Curator Features:**
- Create and edit courses
- Manage video content
- Review and approve content
- Generate quizzes

---

### ⚙️ OPS - Operations Team

- **Email:** `ops@skillpath.com`
- **Password:** `Ops@123456`
- **Access:** User support, reporting, system monitoring
- **Routes:** `/app/*` (with ops privileges)

**Operations Features:**
- View user analytics
- Generate reports
- Monitor system health
- Handle user support requests

---

### 🤝 PARTNER - Partner Organization

- **Email:** `partner@skillpath.com`
- **Password:** `Partner@123`
- **Access:** Partner dashboard, internship postings, analytics
- **Routes:** `/app/*` (with partner privileges)

**Partner Features:**
- Post internship opportunities
- View applications
- Access partner analytics
- Manage company profile

---

## Quick Access Guide

### Sign In Flow

1. Navigate to `/signin`
2. Enter credentials from above
3. Click "Sign In"
4. You'll be redirected based on your role:
   - ADMIN → `/admin` (Admin Dashboard)
   - Others → `/app` (User Dashboard)

### Testing Different Roles

To test different roles, simply:
1. Sign out from current account
2. Sign in with different credentials
3. Explore role-specific features

### Password Requirements

All passwords follow this pattern:
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character (@, $, !, %, *, ?, &, #)

---

## Screen Inventory

### ✅ Completed Screens (20/27 - 74%)

**Public Pages (6):**
- Landing page
- Sign In
- Sign Up
- Email Verification
- Forgot Password
- Reset Password

**User Pages (8):**
- Dashboard
- Course Curate
- Course Player
- Quiz Taker
- Certificates
- Internships
- Mentorship
- Settings

**Admin Pages (5):**
- Admin Dashboard
- Users Management
- Internships Management
- Domains & Topics Management
- Courses Management

**Onboarding (1):**
- Onboarding flow

### ⏳ Remaining Screens (7/27 - 26%)

**Admin Panels:**
- Analytics Dashboard
- Audit Logs
- Content Moderation
- Partner Management
- Reports & Exports
- Settings & Configuration
- System Notifications

---

## Role-Based Access Matrix

| Feature | USER | CURATOR | OPS | PARTNER | ADMIN |
|---------|------|---------|-----|---------|-------|
| View Courses | ✅ | ✅ | ✅ | ✅ | ✅ |
| Create Courses | ❌ | ✅ | ❌ | ❌ | ✅ |
| Manage Users | ❌ | ❌ | ⚠️ View | ❌ | ✅ |
| Post Internships | ❌ | ❌ | ❌ | ✅ | ✅ |
| Approve Internships | ❌ | ❌ | ❌ | ❌ | ✅ |
| View Analytics | ❌ | ⚠️ Own | ✅ | ⚠️ Own | ✅ |
| System Settings | ❌ | ❌ | ❌ | ❌ | ✅ |
| Audit Logs | ❌ | ❌ | ⚠️ View | ❌ | ✅ |

**Legend:**
- ✅ Full Access
- ⚠️ Limited Access
- ❌ No Access

---

## Security Notes

⚠️ **IMPORTANT:** These are development/testing credentials only!

**Before Production:**
1. Remove or disable all test accounts
2. Use strong, unique passwords
3. Enable 2FA for admin accounts
4. Set up proper email verification
5. Configure rate limiting
6. Enable audit logging
7. Review all security settings

**Never commit real credentials to version control!**

---

## Troubleshooting

### Can't Sign In?

1. Verify the database is seeded: `npm run prisma:seed`
2. Check database connection in `.env`
3. Verify backend is running on correct port
4. Check browser console for errors

### Account Locked?

Admin accounts can unlock users via:
```
/admin/users → Find user → Activate Account
```

### Need to Reset Database?

```bash
cd backend
npm run prisma:migrate reset
npm run prisma:seed
```

This will recreate all tables and seed test data.

---

## API Endpoints for Testing

### Authentication
- `POST /api/auth/signin` - Sign in
- `POST /api/auth/signup` - Sign up
- `POST /api/auth/signout` - Sign out
- `POST /api/auth/refresh` - Refresh token

### Admin Endpoints (Require Admin Role)
- `GET /api/admin/users` - List all users
- `GET /api/admin/internships` - List all internships
- `GET /api/admin/domains` - List all domains
- `GET /api/admin/courses` - List all courses

---

**Last Updated:** 2025-11-18
