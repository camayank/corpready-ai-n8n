# SkillPath India - Complete Features & Functionalities Inventory

Complete documentation of all features, functionalities, screens, and capabilities.

**Version:** 1.0.0
**Last Updated:** 2025-11-18
**Total Pages:** 21
**Total Features:** 80+

---

## 📊 Application Overview

**Platform Type:** Learning Management System (LMS) + Career Platform
**Tech Stack:** React 18 + Vite + Express.js + Prisma + PostgreSQL
**Authentication:** JWT with refresh tokens
**Authorization:** Role-based access control (5 roles)

---

## 👥 User Roles & Permissions

### 1. **USER (Student)**
- Access to learning platform
- Course curation and consumption
- Certificate management
- Internship applications
- Mentorship booking
- Profile management

### 2. **ADMIN**
- Full system access
- User management (CRUD, role changes)
- Content moderation
- Internship approval
- Domain/topic management
- Course quality control
- Audit log access
- Analytics dashboard

### 3. **CURATOR**
- Content creation and editing
- Course management
- Video upload and organization
- Quiz generation
- Topic curation

### 4. **OPS (Operations)**
- User support access
- Analytics viewing
- Report generation
- System monitoring
- Limited user management

### 5. **PARTNER**
- Internship posting
- Application tracking
- Partner analytics
- Company profile management

---

## 🖥️ Complete Screen Inventory (21 Pages)

### **PUBLIC PAGES (7)**

#### 1. Landing Page (`/`)
**Purpose:** Marketing and product showcase
**Features:**
- Hero section with value proposition
- Feature highlights
- Course categories showcase
- Testimonials section
- Pricing information (if applicable)
- Call-to-action buttons
- Footer with links

**Functionalities:**
- Responsive design
- Smooth scrolling
- Navigation to sign-up/sign-in
- SEO optimized

---

#### 2. Sign In (`/signin`)
**Purpose:** User authentication
**Features:**
- Email/password login form
- "Remember me" option
- Password visibility toggle
- Forgot password link
- Sign up redirect link

**Functionalities:**
- Form validation
- JWT token generation
- Refresh token handling
- Role-based redirect (ADMIN → `/admin`, others → `/app`)
- Error handling for invalid credentials
- Rate limiting protection

**Backend APIs:**
- `POST /api/auth/signin`
- Returns: Access token, refresh token, user data

---

#### 3. Sign Up (`/signup`)
**Purpose:** New user registration
**Features:**
- Multi-field registration form (name, email, password)
- Password strength indicator
- Terms & conditions checkbox
- Privacy policy consent
- Password confirmation field

**Functionalities:**
- Email validation
- Password strength requirements (8+ chars, uppercase, lowercase, number, special char)
- Duplicate email check
- Account creation
- Email verification trigger
- Auto-redirect to verification page

**Backend APIs:**
- `POST /api/auth/signup`
- Sends verification email
- Creates user with `isEmailVerified: false`

---

#### 4. Email Verification (`/verify-email`)
**Purpose:** Confirm user email address
**Features:**
- Verification code input
- Resend code button
- Timer countdown for resend
- Success/error messaging

**Functionalities:**
- 6-digit code validation
- Token expiration handling
- Account activation on success
- Redirect to onboarding
- Email resend functionality

**Backend APIs:**
- `POST /api/auth/verify-email`
- `POST /api/auth/resend-verification`

---

#### 5. Forgot Password (`/forgot-password`)
**Purpose:** Password reset request
**Features:**
- Email input form
- Success confirmation message
- Link to sign in

**Functionalities:**
- Email validation
- Reset token generation
- Password reset email sent
- Token expiration (1 hour)

**Backend APIs:**
- `POST /api/auth/forgot-password`

---

#### 6. Reset Password (`/reset-password`)
**Purpose:** Set new password
**Features:**
- Token validation display
- New password input
- Confirm password input
- Password strength indicator

**Functionalities:**
- Token validation
- Password matching check
- Password hashing
- Account update
- Auto-redirect to sign in

**Backend APIs:**
- `POST /api/auth/reset-password`

---

#### 7. Onboarding (`/onboarding`)
**Purpose:** First-time user setup
**Features:**
- Welcome screen
- Profile completion form
- Area of study selection
- Graduation year selector
- Gender selection
- Phone number input
- Progress indicator

**Functionalities:**
- Multi-step wizard
- Form validation
- Profile data collection
- `isOnboardingComplete` flag update
- Redirect to dashboard on completion

**Backend APIs:**
- `PUT /api/users/profile`

---

### **USER APP PAGES (8 + Shared Layout)**

**Shared Navigation (UserLayout):**
- Persistent sidebar with 5 main nav items
- Search bar at top
- Day streak indicator
- User profile avatar
- Settings link
- Admin panel link (for admins only)
- Sign out button

---

#### 8. Dashboard (`/app`)
**Purpose:** Main learning hub and overview
**Features:**
- Welcome banner with user name
- 3 stats cards:
  - Day Streak (with fire icon)
  - Total XP (experience points)
  - Badges Earned
- "Continue Learning" card showing:
  - Current course progress
  - Module information (e.g., "Module 2 of 8")
  - Time remaining
  - Progress bar (% complete)
  - "Continue" button
- Recommended courses grid (4 courses):
  - Course thumbnail with gradient
  - Category badge
  - Course title
  - Video count
  - Duration
  - "Start Learning" button
- Quick actions section (3 cards):
  - Curate Course
  - My Certificates
  - Find Internships

**Functionalities:**
- Personalized course recommendations
- Progress tracking
- Quick navigation to all features
- Gamification elements (streak, XP, badges)
- Responsive grid layouts

**Backend APIs:**
- `GET /api/users/me` - User profile and stats
- `GET /api/courses/recommended` - Course recommendations
- `GET /api/progress/current` - Current learning progress

---

#### 9. Course Curate (`/app/curate`)
**Purpose:** AI-powered personalized course creation
**Features:**
- Topic selection interface
- Learning goal input
- Difficulty level selector
- Duration preference
- Learning style options
- AI course generation
- Generated course preview:
  - Module breakdown
  - Video list per module
  - Estimated completion time
- Save and start learning button

**Functionalities:**
- AI-powered course curation using GPT/Claude
- YouTube video search and selection
- Automatic module organization
- Course customization
- Save curated course to user library
- Quiz generation per module

**Backend APIs:**
- `POST /api/courses/curate`
- `POST /api/ai/generate-course`
- `GET /api/courses/videos/search`

**AI Integration:**
- Course structure generation
- Video content recommendation
- Learning path optimization
- Quiz question generation

---

#### 10. Course Player (`/app/course/:id`)
**Purpose:** Video playback and learning interface
**Features:**
- Embedded YouTube video player
- Course sidebar with:
  - Module list
  - Video list per module
  - Completion checkmarks
  - Duration per video
- Video controls (play, pause, volume, fullscreen)
- Progress tracking bar
- Notes section:
  - Add timestamped notes
  - Edit/delete notes
  - Notes list with timestamps
- Video bookmarks
- Next/Previous navigation
- Course completion badge

**Functionalities:**
- Video progress tracking (watch time)
- Auto-save progress
- Note taking with timestamps
- Module completion tracking
- Certificate generation on completion
- Resume from last position
- Speed control (0.5x - 2x)

**Backend APIs:**
- `GET /api/courses/:id`
- `GET /api/courses/:id/progress`
- `PUT /api/progress/video/:videoId`
- `POST /api/notes`
- `PUT /api/notes/:id`
- `DELETE /api/notes/:id`

**Data Tracked:**
- Video watch time
- Completion percentage
- Last watched position
- Notes with timestamps
- Module completion status

---

#### 11. Quiz Taker (`/app/quiz/:id`)
**Purpose:** Assessment and knowledge verification
**Features:**
- Question display (one at a time)
- Multiple choice options (A, B, C, D)
- Question navigation
- Progress indicator (e.g., "3/10")
- Timer (if timed quiz)
- Submit button
- Results screen:
  - Score percentage
  - Correct/incorrect breakdown
  - Question review with correct answers
  - Retake option
- Certificate award (on passing)

**Functionalities:**
- Answer selection and submission
- Auto-save answers
- Timer countdown
- Score calculation
- Pass/fail determination (70% threshold)
- Certificate generation on pass
- Quiz retake (unlimited attempts)
- Answer explanation display

**Backend APIs:**
- `GET /api/quizzes/:id`
- `POST /api/quiz-attempts`
- `GET /api/quiz-attempts/:attemptId/results`

**Quiz Data:**
- Questions with options
- Correct answers
- Explanations
- Time limit
- Passing score
- Attempt history

---

#### 12. Certificates (`/app/certificates`)
**Purpose:** View and download earned certificates
**Features:**
- Certificate grid/list view
- Certificate preview cards showing:
  - Course name
  - Completion date
  - Certificate ID
  - Thumbnail preview
- Download as PDF button
- Share on LinkedIn button
- Search/filter certificates
- Certificate verification code

**Functionalities:**
- Certificate generation (auto on course completion)
- PDF download with:
  - User name
  - Course title
  - Completion date
  - Certificate ID
  - QR code for verification
- LinkedIn sharing
- Certificate verification system
- Print-friendly format

**Backend APIs:**
- `GET /api/certificates`
- `GET /api/certificates/:id/download`
- `GET /api/certificates/:id/verify`

**PDF Generation:**
- Uses PDFKit
- Professional certificate template
- Digital signature
- Verification QR code

---

#### 13. Internships (`/app/internships`)
**Purpose:** Browse and apply for internship opportunities
**Features:**
- 3 tabs:
  1. **Browse** - All available internships
  2. **Saved** - Bookmarked internships
  3. **Applications** - Applied internships with status
- Search bar
- Filters:
  - Location
  - Remote/Onsite/Hybrid
  - Duration
  - Stipend range
- Internship cards showing:
  - Company name
  - Position title
  - Location
  - Stipend
  - Duration
  - Remote badge
  - Application deadline
- Save button (bookmark icon)
- Apply button
- View details link

**Functionalities:**
- Eligibility check (based on profile completion)
- Search and filter
- Save/unsave internships
- Application submission
- Application tracking:
  - Pending
  - Under Review
  - Accepted
  - Rejected
- Application status updates
- Deadline alerts

**Backend APIs:**
- `GET /api/internships/eligibility`
- `GET /api/internships?filters`
- `POST /api/internships/:id/save`
- `DELETE /api/internships/:id/save`
- `POST /api/internships/:id/apply`
- `GET /api/internships/saved`
- `GET /api/internships/applications`

**Eligibility Requirements:**
- Email verified
- Onboarding complete
- Profile completion > 80%

---

#### 14. Mentorship (`/app/mentorship`)
**Purpose:** 1:1 mentorship and premium features
**Features:**
- 2 tabs:
  1. **Mentors** - Available mentors
  2. **Premium** - Premium plan inquiry
- Mentor cards showing:
  - Profile photo
  - Name
  - Expertise areas
  - Experience
  - Rating
  - Hourly rate
  - Availability
- Book session button
- Booking form:
  - Date/time selection
  - Session duration
  - Topic/agenda
  - Payment details
- Premium inquiry form:
  - Name, email, phone
  - Interested topics
  - Message
  - Submit button

**Functionalities:**
- Mentor discovery
- Session booking system
- Calendar integration
- Payment processing (placeholder)
- Premium plan lead generation
- Booking confirmation emails
- Session reminders

**Backend APIs:**
- `GET /api/mentors`
- `POST /api/mentorship/bookings`
- `POST /api/mentorship/premium-inquiry`
- `GET /api/mentorship/my-bookings`

---

#### 15. Settings (`/app/settings`)
**Purpose:** Profile and account management
**Features:**
- 2 tabs:
  1. **Profile** - Personal information
  2. **Security** - Password management
- Profile tab fields:
  - Name
  - Phone number
  - Gender (dropdown)
  - Area of study
  - Graduation year (dropdown)
  - Update button
- Security tab fields:
  - Current password
  - New password
  - Confirm new password
  - Change password button
- Account information display:
  - Email (read-only)
  - Role badge
  - Account created date

**Functionalities:**
- Profile update
- Password change
- Form validation
- Success/error notifications
- Data persistence
- Sign out functionality

**Backend APIs:**
- `GET /api/users/me`
- `PUT /api/users/profile`
- `PUT /api/auth/change-password`

---

### **ADMIN PANEL PAGES (5 + Shared Layout)**

**Shared Navigation (AdminLayout):**
- Persistent sidebar with 5 admin nav items
- Environment badge (Dev/Production)
- Collapsible sidebar toggle
- Admin profile with role
- "Back to App" link
- Sign out button

---

#### 16. Admin Dashboard (`/admin`)
**Purpose:** System overview and monitoring
**Features:**
- 4 stats cards:
  - Total Users (with growth indicator)
  - Total Courses (with icon)
  - Pending Internships (alert count)
  - Revenue (monthly)
- Recent user activity table:
  - User name
  - Action (signup, course start, completion)
  - Timestamp
  - View details link
- System alerts section:
  - Pending approvals
  - Flagged content
  - System issues
  - Priority badges
- Quick actions:
  - Approve internships
  - Review flagged courses
  - Manage users

**Functionalities:**
- Real-time stats
- Activity monitoring
- Alert management
- Quick navigation to admin tasks
- System health indicators

**Backend APIs:**
- `GET /api/admin/stats`
- `GET /api/admin/activity`
- `GET /api/admin/alerts`

---

#### 17. Users Management (`/admin/users`)
**Purpose:** Complete user administration
**Features:**
- User stats cards:
  - Total Users
  - Active Users
  - New Users (this month)
  - Admin count
- Search bar (search by name, email)
- Filter dropdown (by role, status)
- Users table with columns:
  - Avatar
  - Name
  - Email
  - Role badge
  - Status badge (Active/Inactive)
  - Last login
  - Actions dropdown
- Actions per user:
  - **View Details** - Full user profile modal
  - **Edit Role** - Change user role (USER, ADMIN, CURATOR, OPS, PARTNER)
  - **Activate/Deactivate** - Toggle account status
  - **Impersonate** - Login as user (requires justification)
  - **Export Data** - GDPR data export
  - **Delete Account** - Permanent deletion (confirmation required)

**Functionalities:**
- User CRUD operations
- Role management with audit logging
- Account activation/deactivation
- User impersonation with justification tracking
- GDPR compliance (data export)
- Search and filter
- Pagination
- Bulk actions (future)
- Activity log per user

**Backend APIs:**
- `GET /api/admin/users?search&role&status&page`
- `GET /api/admin/users/:id`
- `PUT /api/admin/users/:id/role`
- `PUT /api/admin/users/:id/status`
- `POST /api/admin/users/:id/impersonate`
- `GET /api/admin/users/:id/export`
- `DELETE /api/admin/users/:id`

**Audit Logging:**
- All admin actions logged
- Tracks: adminId, action, targetId, timestamp, IP address
- Immutable audit trail

---

#### 18. Internships Management (`/admin/internships`)
**Purpose:** Internship approval pipeline
**Features:**
- Stats cards:
  - Total Internships
  - Pending Approval
  - Approved This Month
- Search bar
- Status filter (All, Pending, Approved, Rejected)
- Internships table:
  - Company name
  - Position title
  - Location
  - Stipend
  - Status badge
  - Submitted date
  - Actions
- Actions per internship:
  - **Approve** - Approve and make live
  - **Reject** - Reject with reason
  - **View Details** - Full internship modal
  - **Edit** - Modify details
  - **Delete** - Remove permanently

**Functionalities:**
- Internship approval workflow
- Bulk approval/rejection
- Email notifications to partners on status change
- Audit logging for approvals
- Search and filter
- Status tracking

**Backend APIs:**
- `GET /api/admin/internships?search&status`
- `POST /api/admin/internships/:id/approve`
- `POST /api/admin/internships/:id/reject`
- `PUT /api/admin/internships/:id`
- `DELETE /api/admin/internships/:id`
- `POST /api/admin/internships` - Create new

**Approval Process:**
1. Partner submits internship
2. Admin reviews details
3. Admin approves/rejects
4. Email notification sent
5. Audit log created
6. Live on platform if approved

---

#### 19. Domains & Topics Management (`/admin/domains`)
**Purpose:** Learning category organization
**Features:**
- "Create Domain" button
- Domain cards grid showing:
  - Domain icon (emoji)
  - Domain name
  - Description
  - Topic count
  - Course count
  - Edit/Delete buttons
- Create domain dialog:
  - Name input
  - Description textarea
  - Icon selector (emoji picker)
  - Save button
- Topic management per domain:
  - Add topic button
  - Topic list with edit/delete
  - Topic name and description

**Functionalities:**
- Domain CRUD operations
- Topic CRUD operations
- Domain-topic relationship management
- Course count per domain
- Icon/emoji selection
- Drag-and-drop reordering (future)
- Bulk operations (future)

**Backend APIs:**
- `GET /api/admin/domains`
- `POST /api/admin/domains`
- `PUT /api/admin/domains/:id`
- `DELETE /api/admin/domains/:id`
- `POST /api/admin/domains/:domainId/topics`
- `PUT /api/admin/topics/:id`
- `DELETE /api/admin/topics/:id`

**Data Structure:**
- Domain → Many Topics
- Domain → Many Courses
- Topic → Many Courses

---

#### 20. Courses Management (`/admin/courses`)
**Purpose:** Course quality control and moderation
**Features:**
- Stats cards:
  - Total Courses
  - Active Courses
  - Flagged Courses
- Search bar
- Courses table:
  - Course title
  - Domain/topic
  - Video count (aggregated from modules)
  - Enrollments count
  - Status badge (Active/Flagged/Deleted)
  - Created date
  - Actions
- Actions per course:
  - **View Details** - Course content modal
  - **Flag** - Mark for review (with reason)
  - **Delete** - Soft delete (can be restored)
  - **Regenerate** - Re-curate with AI

**Functionalities:**
- Course quality monitoring
- Content flagging system
- Soft delete (preserves data)
- Course regeneration (AI)
- Video count aggregation
- Enrollment tracking
- Search and filter

**Backend APIs:**
- `GET /api/admin/courses?search&status`
- `GET /api/admin/courses/:id`
- `POST /api/admin/courses/:id/flag`
- `DELETE /api/admin/courses/:id`
- `POST /api/admin/courses/:id/regenerate`

**Flagging Reasons:**
- Inappropriate content
- Poor quality
- Outdated information
- Copyright issues
- User reports

---

#### 21. 404 Not Found (`*`)
**Purpose:** Handle invalid routes
**Features:**
- 404 error message
- Friendly illustration
- "Go Home" button
- Search suggestions

**Functionalities:**
- Catch-all route
- Navigation back to valid pages
- Error tracking (optional)

---

## 🔐 Authentication & Security Features

### Authentication System
- **JWT Access Tokens** (15 min expiry)
- **Refresh Tokens** (7 day expiry)
- **HttpOnly cookies** for security
- **Token rotation** on refresh
- **Session management**
- **Multi-device support**

### Security Features
- **Password hashing** with bcrypt (10 rounds)
- **Rate limiting** on login attempts
- **Email verification** required
- **Password reset** with time-limited tokens
- **CORS** protection
- **Helmet.js** security headers
- **Input validation** with Zod
- **XSS protection**
- **SQL injection prevention** (Prisma ORM)

### Role-Based Access Control (RBAC)
- **AuthGuard** - Requires authentication
- **EmailVerifiedGuard** - Requires verified email
- **OnboardingGuard** - Requires completed onboarding
- **AdminGuard** - Requires ADMIN role
- **Server-side enforcement** on all APIs
- **Client-side route protection**

---

## 🎯 Core Functionalities

### 1. User Management
- User registration and authentication
- Email verification
- Password reset
- Profile management
- Role assignment
- Account activation/deactivation
- User impersonation (admin)
- GDPR data export

### 2. Learning Management
- AI-powered course curation
- YouTube video integration
- Module-based learning
- Progress tracking
- Video playback with controls
- Note-taking system
- Bookmarking
- Resume learning
- Course completion

### 3. Assessment System
- Quiz generation
- Multiple choice questions
- Timed assessments
- Instant scoring
- Answer explanations
- Unlimited retakes
- Pass/fail determination
- Performance tracking

### 4. Certificate System
- Auto-generation on course completion
- PDF certificate creation
- Certificate verification
- Download functionality
- LinkedIn sharing
- Certificate ID and QR codes
- Print-friendly format

### 5. Internship Platform
- Internship listing
- Search and filtering
- Save/bookmark internships
- Application system
- Application tracking
- Approval workflow (admin)
- Email notifications
- Eligibility checking

### 6. Mentorship System
- Mentor profiles
- Session booking
- Calendar integration
- Premium plan inquiries
- Payment processing (placeholder)
- Booking confirmations

### 7. Admin Management
- User administration
- Content moderation
- Internship approval
- Domain/topic management
- Course quality control
- System monitoring
- Analytics dashboard
- Audit logging

### 8. Analytics & Tracking
- User activity tracking
- Learning progress analytics
- Course completion rates
- Engagement metrics
- Admin action logs
- System usage stats

---

## 🔌 Backend API Endpoints

### Authentication
```
POST   /api/auth/signup
POST   /api/auth/signin
POST   /api/auth/signout
POST   /api/auth/refresh
POST   /api/auth/verify-email
POST   /api/auth/resend-verification
POST   /api/auth/forgot-password
POST   /api/auth/reset-password
PUT    /api/auth/change-password
```

### Users
```
GET    /api/users/me
PUT    /api/users/profile
GET    /api/users/:id
```

### Courses
```
GET    /api/courses
GET    /api/courses/:id
POST   /api/courses/curate
GET    /api/courses/recommended
GET    /api/courses/:id/progress
PUT    /api/courses/:id/progress
```

### Videos
```
GET    /api/videos/:id
PUT    /api/progress/video/:videoId
GET    /api/videos/search
```

### Notes
```
GET    /api/notes?videoId=:id
POST   /api/notes
PUT    /api/notes/:id
DELETE /api/notes/:id
```

### Quizzes
```
GET    /api/quizzes/:id
POST   /api/quiz-attempts
GET    /api/quiz-attempts/:id/results
GET    /api/quizzes/course/:courseId
```

### Certificates
```
GET    /api/certificates
GET    /api/certificates/:id
GET    /api/certificates/:id/download
GET    /api/certificates/:id/verify
POST   /api/certificates
```

### Internships
```
GET    /api/internships
GET    /api/internships/:id
GET    /api/internships/eligibility
POST   /api/internships/:id/apply
GET    /api/internships/applications
POST   /api/internships/:id/save
DELETE /api/internships/:id/save
GET    /api/internships/saved
```

### Mentorship
```
GET    /api/mentors
POST   /api/mentorship/bookings
GET    /api/mentorship/my-bookings
POST   /api/mentorship/premium-inquiry
```

### Admin - Users
```
GET    /api/admin/users
GET    /api/admin/users/:id
PUT    /api/admin/users/:id/role
PUT    /api/admin/users/:id/status
POST   /api/admin/users/:id/impersonate
GET    /api/admin/users/:id/export
DELETE /api/admin/users/:id
```

### Admin - Internships
```
GET    /api/admin/internships
POST   /api/admin/internships
PUT    /api/admin/internships/:id
DELETE /api/admin/internships/:id
POST   /api/admin/internships/:id/approve
POST   /api/admin/internships/:id/reject
```

### Admin - Domains
```
GET    /api/admin/domains
POST   /api/admin/domains
PUT    /api/admin/domains/:id
DELETE /api/admin/domains/:id
POST   /api/admin/domains/:domainId/topics
PUT    /api/admin/topics/:id
DELETE /api/admin/topics/:id
```

### Admin - Courses
```
GET    /api/admin/courses
GET    /api/admin/courses/:id
POST   /api/admin/courses/:id/flag
DELETE /api/admin/courses/:id
POST   /api/admin/courses/:id/regenerate
```

### Admin - Analytics
```
GET    /api/admin/stats
GET    /api/admin/activity
GET    /api/admin/alerts
```

### Admin - Audit
```
GET    /api/admin/audit-logs
GET    /api/admin/audit-logs/:userId
```

---

## 🗄️ Database Schema

### Core Models (Prisma)

**User**
- id, email, password, name, phone, gender
- areaOfStudy, graduationYear
- role (USER, ADMIN, CURATOR, OPS, PARTNER)
- isActive, isEmailVerified, isOnboardingComplete
- emailVerificationToken, passwordResetToken
- refreshToken, lastLoginAt
- createdAt, updatedAt

**Course**
- id, title, description, domain, topic
- difficultyLevel, estimatedDuration
- isPublished, isFlagged, status
- regenCount, createdBy
- modules (relation)

**Module**
- id, courseId, title, order
- videos (relation)

**Video**
- id, moduleId, title, youtubeUrl, duration
- order, transcript

**VideoProgress**
- id, userId, videoId, watchTime
- completed, lastPosition

**VideoNote**
- id, userId, videoId, content
- timestamp, createdAt

**Quiz**
- id, courseId, moduleId, title
- passingScore, timeLimit
- questions (JSON)

**QuizAttempt**
- id, userId, quizId, answers
- score, passed, startedAt, completedAt

**Certificate**
- id, userId, courseId, certificateId
- issueDate, verificationCode

**Domain**
- id, name, description, icon
- topics (relation)

**Topic**
- id, domainId, name, description
- courses (relation)

**Internship**
- id, title, company, location
- stipend, duration, isRemote
- description, requirements
- isApproved, approvedBy, approvedAt
- deadline

**InternshipApplication**
- id, userId, internshipId, status
- appliedAt, updatedAt

**SavedInternship**
- id, userId, internshipId, savedAt

**Mentor**
- id, name, expertise, bio
- hourlyRate, availability

**MentorshipBooking**
- id, userId, mentorId, date
- duration, topic, status

**AdminActionLog**
- id, adminId, action, targetType
- targetId, metadata, ipAddress
- createdAt

---

## 🎨 UI/UX Features

### Design System
- **Primary Color:** Blue (#3b82f6)
- **Secondary Color:** Emerald (#10b981)
- **Accent Color:** Amber (#f59e0b)
- **Gradients:** Hero gradient, card gradients
- **Shadows:** Soft, medium, large (3-tier system)
- **Border Radius:** Consistent rounded corners
- **Typography:** System font stack, hierarchical sizing

### Components Library (shadcn/ui)
- Button (6 variants)
- Card
- Input
- Textarea
- Select / Dropdown
- Dialog / Modal
- Tabs
- Badge
- Avatar
- Toast notifications
- Alert / Alert Dialog
- Scroll Area
- Tooltip

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Collapsible sidebars
- Responsive grids
- Touch-friendly interactions

### Accessibility
- ARIA labels
- Keyboard navigation
- Focus indicators
- Screen reader support
- Semantic HTML

### Loading States
- Skeleton loaders
- Spinners
- Progress bars
- Optimistic UI updates

### Error Handling
- Toast notifications
- Inline error messages
- Error boundaries
- 404 page
- Network error handling

---

## 🚀 Advanced Features

### AI Integration
- **Course Curation:** GPT/Claude for course structure
- **Quiz Generation:** AI-generated questions
- **Content Recommendations:** Personalized learning paths
- **Video Search:** Intelligent YouTube content selection

### Gamification
- **Day Streak:** Consecutive learning days
- **XP System:** Experience points for activities
- **Badges:** Achievement unlocks
- **Progress Bars:** Visual completion tracking
- **Leaderboards:** (future feature)

### Analytics
- User activity tracking
- Course completion rates
- Time spent learning
- Popular courses
- Engagement metrics
- Admin dashboard insights

### Email System
- Welcome emails
- Email verification
- Password reset
- Certificate notifications
- Application status updates
- Booking confirmations
- Admin alerts

### File Management
- PDF generation (certificates)
- Video thumbnail handling
- Avatar uploads (future)
- Course materials (future)

### Search & Filtering
- Full-text search
- Multi-criteria filters
- Sort options
- Pagination
- Debounced search inputs

---

## 📱 Progressive Web App (PWA) Ready
- Service worker setup (future)
- Offline functionality (future)
- Install prompt (future)
- Push notifications (future)

---

## 🔧 Technical Capabilities

### Performance
- React Query caching
- Optimistic updates
- Code splitting
- Lazy loading
- Image optimization

### State Management
- React Query (server state)
- Context API (auth state)
- Local state (React hooks)

### Form Management
- Controlled components
- Real-time validation
- Error handling
- Success feedback

### Testing Ready
- Unit test structure
- Integration test hooks
- E2E test scenarios
- API mocking capability

---

## 📊 Feature Metrics

**Total Screens:** 21
**Total API Endpoints:** 60+
**User Roles:** 5
**Database Models:** 20+
**UI Components:** 25+
**Core Features:** 80+

---

## 🎯 User Journeys

### Student Journey
1. Sign up → Email verify → Onboarding
2. Browse dashboard → Curate course
3. Watch videos → Take notes → Complete modules
4. Take quizzes → Pass assessments
5. Earn certificate → Download/share
6. Browse internships → Apply
7. Book mentorship sessions

### Admin Journey
1. Sign in as admin
2. Review dashboard alerts
3. Approve pending internships
4. Manage user accounts
5. Flag problematic courses
6. Organize domains/topics
7. Monitor system activity

### Curator Journey
1. Sign in as curator
2. Create new courses
3. Upload/organize content
4. Generate quizzes
5. Publish courses
6. Monitor engagement

---

**Last Updated:** 2025-11-18
**Status:** Production-ready with 21 fully functional pages
**Next Milestones:** Analytics dashboard, Content moderation panel, Partner portal
