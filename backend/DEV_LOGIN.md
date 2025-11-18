# Development Login - Quick Access Guide

🚀 **Fast login without credentials for testing and development**

## ⚠️ Security Notice

This feature is **ONLY available in development mode** (`NODE_ENV=development`). It will automatically **fail in production** with a 403 error.

---

## 🎯 Quick Start

### Using cURL:

```bash
# Login as default user (student)
curl -X POST http://localhost:3000/api/auth/dev-login \
  -H "Content-Type: application/json" \
  -d '{}'

# Login as specific role
curl -X POST http://localhost:3000/api/auth/dev-login \
  -H "Content-Type: application/json" \
  -d '{"role": "ADMIN"}'

# Login with custom email
curl -X POST http://localhost:3000/api/auth/dev-login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@corpready.in"}'
```

### Using JavaScript/Fetch:

```javascript
// Login as student
const response = await fetch('http://localhost:3000/api/auth/dev-login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({})
});

const { user, accessToken, refreshToken } = await response.json();

// Login as admin
const adminResponse = await fetch('http://localhost:3000/api/auth/dev-login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ role: 'ADMIN' })
});
```

---

## 📋 Available Test Roles

The system provides pre-configured test users for each role:

| Role | Email | Description |
|------|-------|-------------|
| `USER` | `student@corpready.in` | Default student user |
| `ADMIN` | `admin@corpready.in` | Administrator with full access |
| `CURATOR` | `curator@corpready.in` | Content curator role |
| `OPS` | `ops@corpready.in` | Operations team role |
| `PARTNER` | `partner@corpready.in` | Partner organization role |

---

## 🔧 API Endpoint

**Endpoint:** `POST /api/auth/dev-login`

**Request Body** (all fields optional):
```json
{
  "email": "string",     // Custom email (optional)
  "role": "USER|ADMIN|CURATOR|OPS|PARTNER"  // Role to login as (optional)
}
```

**Response:**
```json
{
  "user": {
    "id": "uuid",
    "email": "student@corpready.in",
    "name": "Test User",
    "role": "USER",
    "isEmailVerified": true,
    "isOnboardingComplete": true,
    "isActive": true
  },
  "accessToken": "jwt-token",
  "refreshToken": "jwt-token",
  "message": "🚀 Logged in as student@corpready.in (USER) - Development Mode"
}
```

---

## 💡 Usage Examples

### Example 1: Quick Login to Test UI

```bash
# Get tokens for frontend testing
curl -X POST http://localhost:3000/api/auth/dev-login -H "Content-Type: application/json" -d '{}'

# Response includes accessToken and refreshToken
# Use accessToken in Authorization header: "Bearer <accessToken>"
```

### Example 2: Test Admin Features

```bash
# Login as admin
curl -X POST http://localhost:3000/api/auth/dev-login \
  -H "Content-Type: application/json" \
  -d '{"role": "ADMIN"}'

# Now test admin-only endpoints
curl -X GET http://localhost:3000/api/admin/users \
  -H "Authorization: Bearer <accessToken>"
```

### Example 3: Multi-User Testing

```bash
# Create multiple test users with different roles
curl -X POST http://localhost:3000/api/auth/dev-login -d '{"role": "USER"}' -H "Content-Type: application/json"
curl -X POST http://localhost:3000/api/auth/dev-login -d '{"role": "ADMIN"}' -H "Content-Type: application/json"
curl -X POST http://localhost:3000/api/auth/dev-login -d '{"role": "CURATOR"}' -H "Content-Type: application/json"
```

### Example 4: Custom Test User

```bash
# Login with custom email (user will be created if doesn't exist)
curl -X POST http://localhost:3000/api/auth/dev-login \
  -H "Content-Type: application/json" \
  -d '{"email": "mytest@corpready.in", "role": "USER"}'
```

---

## 🎨 Frontend Integration

### React/Next.js Example:

```typescript
// utils/devLogin.ts
export async function devLogin(role: 'USER' | 'ADMIN' | 'CURATOR' | 'OPS' | 'PARTNER' = 'USER') {
  if (process.env.NODE_ENV !== 'development') {
    throw new Error('Dev login only available in development');
  }

  const response = await fetch('http://localhost:3000/api/auth/dev-login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ role }),
  });

  if (!response.ok) {
    throw new Error('Dev login failed');
  }

  const { user, accessToken, refreshToken } = await response.json();

  // Store tokens
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
  localStorage.setItem('user', JSON.stringify(user));

  return { user, accessToken, refreshToken };
}

// Usage in component:
const handleDevLogin = async () => {
  try {
    const { user } = await devLogin('USER');
    console.log('Logged in as:', user.email);
    // Redirect to dashboard
    router.push('/app');
  } catch (error) {
    console.error('Login failed:', error);
  }
};
```

### Add Dev Login Button (Development Only):

```tsx
// components/DevLoginButton.tsx
'use client';

import { devLogin } from '@/utils/devLogin';

export function DevLoginButton() {
  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-yellow-100 border-2 border-yellow-400 p-4 rounded-lg shadow-lg">
      <p className="text-xs font-bold mb-2">🛠️ DEV MODE</p>
      <div className="space-y-2">
        <button onClick={() => devLogin('USER')} className="btn-sm">
          Login as Student
        </button>
        <button onClick={() => devLogin('ADMIN')} className="btn-sm">
          Login as Admin
        </button>
      </div>
    </div>
  );
}
```

---

## ✅ Features

- **Instant login** without typing credentials
- **Auto-create test users** if they don't exist
- **Pre-configured roles** for all user types
- **Fully authenticated tokens** - works like normal login
- **Development-only** - automatically disabled in production
- **No rate limiting** applied to dev-login endpoint

---

## 🔒 Security

This endpoint is **protected by environment check**:

```typescript
if (process.env.NODE_ENV !== 'development') {
  return res.status(403).json({
    error: 'Development login is only available in development mode'
  });
}
```

**In production:**
- Endpoint returns 403 Forbidden
- No users are created
- No tokens are issued
- Request is logged as failed attempt

---

## 🐛 Troubleshooting

### Error: "Development login is only available in development mode"

**Solution:** Check your `.env` file:
```bash
NODE_ENV=development
```

### Error: "Development login failed"

**Possible causes:**
1. Database connection issue
2. Missing DATABASE_URL in .env
3. Prisma client not generated

**Solution:**
```bash
# Generate Prisma client
npm run prisma:generate

# Check database connection
npm run prisma:studio
```

### Test user not being created

**Solution:** Check backend logs for detailed error message
```bash
# Run backend with logs
npm run dev
```

---

## 📚 Related Documentation

- [Authentication Flow](./docs/authentication.md)
- [User Roles & Permissions](./docs/roles.md)
- [API Documentation](./docs/api.md)

---

## 🎯 Next Steps After Login

Once logged in with dev-login, you can:

1. **Access protected routes** using the access token
2. **Test role-based permissions** by logging in as different roles
3. **Complete onboarding flow** (users are pre-verified)
4. **Test all features** without manual signup/verification

---

**Created for rapid development and testing of CorpReady platform** 🚀
