import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Context Providers
import { AuthProvider } from "@/contexts/AuthContext";

// Guards
import { AuthGuard } from "@/components/guards/AuthGuard";
import { EmailVerifiedGuard } from "@/components/guards/EmailVerifiedGuard";
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

// Admin Pages
import { AdminLayout } from "./components/admin/AdminLayout";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { UsersManagement } from "./pages/admin/UsersManagement";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
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

            {/* Onboarding (requires auth + email verified) */}
            <Route
              path="/onboarding"
              element={
                <AuthGuard>
                  <EmailVerifiedGuard>
                    <Onboarding />
                  </EmailVerifiedGuard>
                </AuthGuard>
              }
            />

            {/* Protected App Routes (requires auth + email verified + onboarding complete) */}
            <Route
              path="/app"
              element={
                <AuthGuard>
                  <EmailVerifiedGuard>
                    <OnboardingGuard>
                      <Dashboard />
                    </OnboardingGuard>
                  </EmailVerifiedGuard>
                </AuthGuard>
              }
            />
            <Route
              path="/app/curate"
              element={
                <AuthGuard>
                  <EmailVerifiedGuard>
                    <OnboardingGuard>
                      <CourseCurate />
                    </OnboardingGuard>
                  </EmailVerifiedGuard>
                </AuthGuard>
              }
            />
            <Route
              path="/app/course/:id"
              element={
                <AuthGuard>
                  <EmailVerifiedGuard>
                    <OnboardingGuard>
                      <CoursePlayer />
                    </OnboardingGuard>
                  </EmailVerifiedGuard>
                </AuthGuard>
              }
            />
            <Route
              path="/app/quiz/:id"
              element={
                <AuthGuard>
                  <EmailVerifiedGuard>
                    <OnboardingGuard>
                      <QuizTaker />
                    </OnboardingGuard>
                  </EmailVerifiedGuard>
                </AuthGuard>
              }
            />
            <Route
              path="/app/certificates"
              element={
                <AuthGuard>
                  <EmailVerifiedGuard>
                    <OnboardingGuard>
                      <Certificates />
                    </OnboardingGuard>
                  </EmailVerifiedGuard>
                </AuthGuard>
              }
            />
            <Route
              path="/app/internships"
              element={
                <AuthGuard>
                  <EmailVerifiedGuard>
                    <OnboardingGuard>
                      <Internships />
                    </OnboardingGuard>
                  </EmailVerifiedGuard>
                </AuthGuard>
              }
            />
            <Route
              path="/app/mentorship"
              element={
                <AuthGuard>
                  <EmailVerifiedGuard>
                    <OnboardingGuard>
                      <Mentorship />
                    </OnboardingGuard>
                  </EmailVerifiedGuard>
                </AuthGuard>
              }
            />
            <Route
              path="/app/settings"
              element={
                <AuthGuard>
                  <EmailVerifiedGuard>
                    <OnboardingGuard>
                      <Settings />
                    </OnboardingGuard>
                  </EmailVerifiedGuard>
                </AuthGuard>
              }
            />

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
            </Route>

            {/* Catch-all 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
