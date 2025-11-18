import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Context Providers
import { AuthProvider } from "@/contexts/AuthContext";

// Guards
import { AuthGuard } from "@/components/guards/AuthGuard";
// import { EmailVerifiedGuard } from "@/components/guards/EmailVerifiedGuard"; // Disabled - email verification not required
import { OnboardingGuard } from "@/components/guards/OnboardingGuard";
import { AdminGuard } from "@/components/guards/AdminGuard";

// Public Pages
import Landing from "./pages/Landing";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";

// Protected Pages (require auth)
import Onboarding from "./pages/Onboarding";
import Dashboard from "./pages/Dashboard";
import CourseCurate from "./pages/CourseCurate";
import CoursePlayer from "./pages/CoursePlayer";
import QuizTaker from "./pages/QuizTaker";
import Certificates from "./pages/Certificates";
import Internships from "./pages/Internships";
import Mentorship from "./pages/Mentorship";
import Settings from "./pages/Settings";

// Layout Components
import { UserLayout } from "./components/layout/UserLayout";
import { AdminLayout } from "./components/admin/AdminLayout";
import { ErrorBoundary } from "./components/error-boundary/ErrorBoundary";

// Admin Pages
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { UsersManagement } from "./pages/admin/UsersManagement";
import { UserDetail } from "./pages/admin/UserDetail";
import { InternshipsManagement } from "./pages/admin/InternshipsManagement";
import { DomainsManagement } from "./pages/admin/DomainsManagement";
import { CoursesManagement } from "./pages/admin/CoursesManagement";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <ErrorBoundary>
            <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Email Verification (requires auth) */}
            <Route
              path="/verify-email"
              element={
                <AuthGuard>
                  <VerifyEmail />
                </AuthGuard>
              }
            />

            {/* Onboarding (requires auth only - email verification disabled) */}
            <Route
              path="/onboarding"
              element={
                <AuthGuard>
                  <Onboarding />
                </AuthGuard>
              }
            />

            {/* Protected App Routes (requires auth + onboarding complete) */}
            <Route
              path="/app"
              element={
                <AuthGuard>
                  <OnboardingGuard>
                    <UserLayout />
                  </OnboardingGuard>
                </AuthGuard>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="curate" element={<CourseCurate />} />
              <Route path="course/:id" element={<CoursePlayer />} />
              <Route path="quiz/:id" element={<QuizTaker />} />
              <Route path="certificates" element={<Certificates />} />
              <Route path="internships" element={<Internships />} />
              <Route path="mentorship" element={<Mentorship />} />
              <Route path="settings" element={<Settings />} />
            </Route>

            {/* Admin Routes (requires admin role) */}
            <Route
              path="/admin"
              element={
                <AuthGuard>
                  <AdminGuard>
                    <AdminLayout />
                  </AdminGuard>
                </AuthGuard>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="users" element={<UsersManagement />} />
              <Route path="users/:id" element={<UserDetail />} />
              <Route path="internships" element={<InternshipsManagement />} />
              <Route path="domains" element={<DomainsManagement />} />
              <Route path="courses" element={<CoursesManagement />} />
            </Route>

            {/* Catch-all 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          </ErrorBoundary>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
