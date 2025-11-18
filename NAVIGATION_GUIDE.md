# SkillPath India - Navigation Guide

Complete guide to navigating all 21 working pages in the application.

## 🗺️ Application Structure

### User Pages (`/app/*`)
All user pages share a **unified sidebar navigation** with:
- Search bar at the top
- Day streak indicator
- Profile avatar
- Persistent nav links to all features

**5 Main Navigation Items:**
1. **Home** (`/app`) - Dashboard with learning progress
2. **Curate Path** (`/app/curate`) - AI-powered course generation
3. **Certificates** (`/app/certificates`) - View and download achievements
4. **Internships** (`/app/internships`) - Browse and apply for opportunities
5. **Mentorship** (`/app/mentorship`) - Book 1:1 sessions

**Bottom Navigation:**
- **Settings** (`/app/settings`) - Profile and account management
- **Admin Panel** (admins only) - Quick link to `/admin`
- **Sign Out** - Logout button

**Additional Pages (accessed via links):**
- `/app/course/:id` - Course Player (video content, notes, progress tracking)
- `/app/quiz/:id` - Quiz Taker (interactive assessments with instant feedback)

---

### Admin Panel (`/admin/*`)
All admin pages share a **unified sidebar navigation** with:
- Environment badge (Dev/Production)
- Collapsible sidebar toggle
- Admin profile with role display

**5 Admin Navigation Items:**
1. **Dashboard** (`/admin`) - Overview stats and recent activity
2. **Users** (`/admin/users`) - User management, roles, audit logs
3. **Internships** (`/admin/internships`) - Approval pipeline for internships
4. **Domains & Topics** (`/admin/domains`) - Learning category management
5. **Courses** (`/admin/courses`) - Course quality control and flagging

**Bottom Navigation:**
- **Back to App** - Return to user dashboard `/app`
- **Sign Out** - Logout button

---

### Public Pages
No navigation sidebar - standalone pages:
- `/` - Landing page (marketing site)
- `/signin` - Sign in form
- `/signup` - Sign up form
- `/verify-email` - Email verification
- `/forgot-password` - Password reset request
- `/reset-password` - Password reset form
- `/onboarding` - First-time user setup

---

## 🚀 Navigation Patterns

### For Regular Users:
1. **Sign in** → Redirected to `/app` (Dashboard)
2. **Use sidebar** to navigate between features
3. **Click cards/links** to access Course Player and Quizzes
4. **Admin users** see "Admin Panel" link in sidebar

### For Admins:
1. **Sign in** → Redirected to `/admin` (Admin Dashboard)
2. **Use sidebar** to navigate admin features
3. **Click "Back to App"** to return to user dashboard
4. **Full access** to both `/app/*` and `/admin/*` routes

---

## 📱 Page-by-Page Guide

### Dashboard (`/app`)
**What you'll see:**
- Welcome banner with "Curate New Course" button
- 3 stat cards: Day Streak, Total XP, Badges Earned
- "Continue Learning" card showing current progress
- 4 recommended course cards
- 3 quick action cards (Curate, Certificates, Internships)

**Key Actions:**
- Click "Curate New Course" → Goes to `/app/curate`
- Click "Continue" on learning card → Goes to `/app/course/:id`
- Click course cards → Start learning a new course
- Click quick actions → Navigate to specific features

---

### Course Curate (`/app/curate`)
**What you'll see:**
- AI-powered course path generation
- Topic selection interface
- Learning preference customization
- Generated learning path preview

**Key Actions:**
- Select topics and preferences
- Generate personalized course
- Save and start learning

---

### Course Player (`/app/course/:id`)
**What you'll see:**
- Video player with controls
- Course module sidebar
- Video progress tracking
- Notes and bookmarks
- Next/Previous navigation

**Key Actions:**
- Watch videos
- Take notes
- Track completion
- Navigate between modules

---

### Quiz Taker (`/app/quiz/:id`)
**What you'll see:**
- Multiple choice questions
- Timer (if timed)
- Progress indicator
- Instant feedback
- Score and results

**Key Actions:**
- Answer questions
- Submit quiz
- View correct answers
- Retake if needed

---

### Certificates (`/app/certificates`)
**What you'll see:**
- Grid of earned certificates
- Certificate preview cards
- Download buttons
- Completion dates

**Key Actions:**
- View certificates
- Download as PDF
- Share on LinkedIn

---

### Internships (`/app/internships`)
**What you'll see:**
- Internship listings cards
- Search and filter options
- Remote/Onsite toggles
- Saved internships tab
- Applications tab

**Key Actions:**
- Search internships
- Filter by location/type
- Save for later
- Apply to opportunities
- Track applications

---

### Mentorship (`/app/mentorship`)
**What you'll see:**
- Available mentors grid
- Mentor profiles with expertise
- Booking interface
- Premium plan information

**Key Actions:**
- Browse mentors
- Book 1:1 sessions
- Submit premium inquiry
- View upcoming bookings

---

### Settings (`/app/settings`)
**What you'll see:**
- Profile tab: Name, phone, gender, study area
- Security tab: Change password
- Account info display

**Key Actions:**
- Update profile information
- Change password
- Sign out

---

### Admin Dashboard (`/admin`)
**What you'll see:**
- 4 stat cards: Users, Courses, Internships, Revenue
- Recent user activity table
- System alerts section
- Quick action buttons

**Key Actions:**
- View system overview
- Navigate to management pages
- Review recent activity
- Address alerts

---

### Users Management (`/admin/users`)
**What you'll see:**
- User statistics cards
- Search and filter bar
- User table with actions
- Role badges
- Status indicators

**Key Actions:**
- Search users
- Change user roles
- Activate/deactivate accounts
- View user details
- Export user data (GDPR)
- Impersonate users (with justification)

---

### Internships Management (`/admin/internships`)
**What you'll see:**
- Stats: Total, Pending, Approved
- Search and status filters
- Internships table
- Approve/Reject buttons

**Key Actions:**
- Review internship submissions
- Approve internships
- Reject with reason
- View details

---

### Domains & Topics (`/admin/domains`)
**What you'll see:**
- Domain cards grid with icons
- Create domain button
- Topic and course counts
- Edit/Delete actions

**Key Actions:**
- Create new domains
- Add topics to domains
- Edit domain details
- Delete domains
- View associated courses

---

### Courses Management (`/admin/courses`)
**What you'll see:**
- Course statistics
- Search functionality
- Courses table with status
- Video and enrollment counts
- Flag/Delete actions

**Key Actions:**
- Search courses
- Flag problematic content
- Delete courses
- View course details
- Monitor video counts

---

## 🔍 Quick Navigation Tips

### Keyboard Shortcuts
- `/` - Focus search bar (user pages)
- `Esc` - Close modals/dialogs

### Breadcrumbs
- Use browser back button for navigation history
- Sidebar highlights current page

### Mobile Navigation
- Hamburger menu icon toggles sidebar
- Responsive design works on all screen sizes

### Context-Aware Links
- Admin users see admin panel link in user nav
- Regular users only see user features
- Role-based feature visibility

---

## 🎯 Common User Flows

### **New User Onboarding**
1. `/signup` - Create account
2. `/verify-email` - Verify email
3. `/onboarding` - Complete profile setup
4. `/app` - Start learning

### **Course Learning Flow**
1. `/app` - Browse recommended courses
2. `/app/curate` - Generate personalized path OR click course card
3. `/app/course/:id` - Watch videos and take notes
4. `/app/quiz/:id` - Complete assessments
5. `/app/certificates` - Earn certificate
6. Repeat!

### **Internship Application Flow**
1. `/app/internships` - Browse opportunities
2. Click "Save" to bookmark interesting ones
3. Review in "Saved" tab
4. Click "Apply" to submit application
5. Track status in "Applications" tab

### **Admin Management Flow**
1. `/admin` - Review system overview and alerts
2. `/admin/users` - Manage user accounts and roles
3. `/admin/internships` - Approve pending internships
4. `/admin/courses` - Flag problematic content
5. `/admin/domains` - Organize learning categories

---

## 📊 Navigation Stats

**Total Pages:** 21
- User Pages: 8
- Admin Pages: 5
- Public Pages: 7
- Error Pages: 1

**Navigation Components:**
- UserLayout: Shared sidebar for `/app/*`
- AdminLayout: Shared sidebar for `/admin/*`
- No layout: Public pages

**All Navigation Links Work:** ✅
- No broken links
- No 404 errors from navigation
- All features accessible

---

## 🛠️ Troubleshooting Navigation

### "Page Not Found" Errors
- **Check URL** - Ensure correct path (case-sensitive)
- **Check authentication** - Some pages require login
- **Check role** - Admin pages require ADMIN role

### Sidebar Not Showing
- **Check route** - Only `/app/*` and `/admin/*` have sidebars
- **Try toggling** - Click hamburger menu icon
- **Refresh page** - Clear any state issues

### Can't Access Admin Panel
- **Verify role** - Must be signed in as admin@skillpath.com
- **Check navigation** - Look for "Admin Panel" link in user sidebar
- **Direct URL** - Navigate directly to `/admin`

### Links Not Working
- **Check permissions** - Some features require specific roles
- **Try refresh** - Clear browser cache
- **Check console** - Look for JavaScript errors

---

**Last Updated:** 2025-11-18
**Version:** 1.0.0
**Status:** All 21 pages fully functional with clean navigation
