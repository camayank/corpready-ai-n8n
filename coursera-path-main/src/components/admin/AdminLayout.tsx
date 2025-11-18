import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Video,
  GraduationCap,
  Briefcase,
  UserCheck,
  DollarSign,
  Key,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const navigationItems = [
  { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/users', label: 'Users', icon: Users },
  { path: '/admin/domains', label: 'Domains & Topics', icon: BookOpen },
  { path: '/admin/courses', label: 'Courses', icon: Video },
  { path: '/admin/quizzes', label: 'Quizzes', icon: GraduationCap },
  { path: '/admin/certificates', label: 'Certificates', icon: GraduationCap },
  { path: '/admin/internships', label: 'Internships', icon: Briefcase },
  { path: '/admin/mentors', label: 'Mentors', icon: UserCheck },
  { path: '/admin/payments', label: 'Payments', icon: DollarSign },
  { path: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
  { path: '/admin/ai-engines', label: 'AI Engines', icon: Key },
  { path: '/admin/audit-logs', label: 'Audit Logs', icon: Settings },
];

export const AdminLayout = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={cn(
          'bg-white border-r border-gray-200 flex flex-col transition-all duration-300',
          isSidebarOpen ? 'w-64' : 'w-0 overflow-hidden'
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">SkillPath Admin</h1>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-gray-700 hover:bg-gray-100'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </ScrollArea>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="h-9 w-9">
              <AvatarFallback>{user?.name?.charAt(0) || 'A'}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user?.name}</p>
              <p className="text-xs text-gray-500 truncate">{user?.role}</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {navigationItems.find((item) => item.path === location.pathname)?.label || 'Admin'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="text-xs">
              {process.env.NODE_ENV === 'production' ? 'PRODUCTION' : 'DEVELOPMENT'}
            </Badge>
            <Link to="/app">
              <Button variant="outline" size="sm">
                Back to App
              </Button>
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
