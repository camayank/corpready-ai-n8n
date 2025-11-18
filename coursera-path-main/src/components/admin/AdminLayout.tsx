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
  Shield,
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
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={cn(
          'bg-sidebar border-r flex flex-col transition-all duration-300',
          isSidebarOpen ? 'w-64' : 'w-0 overflow-hidden'
        )}
      >
        {/* Logo */}
        <div className="p-4 border-b">
          <Link to="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-hero flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold">SkillPath Admin</span>
          </Link>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1">
          <nav className="p-4 space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? 'secondary' : 'ghost'}
                    className="w-full justify-start"
                    size="sm"
                  >
                    <Icon className="mr-2 w-4 h-4" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </nav>
        </ScrollArea>

        {/* User Profile */}
        <div className="p-4 border-t space-y-1">
          <div className="flex items-center gap-3 px-3 py-2 mb-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                {user?.name?.charAt(0) || 'A'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.name}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.role}</p>
            </div>
          </div>
          <Link to="/app">
            <Button variant="ghost" className="w-full justify-start" size="sm">
              <LogOut className="mr-2 w-4 h-4" />
              Back to App
            </Button>
          </Link>
          <Button
            variant="ghost"
            className="w-full justify-start"
            size="sm"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 w-4 h-4" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Topbar */}
        <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="rounded-full"
              >
                {isSidebarOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
              <div>
                <h2 className="text-lg font-semibold">
                  {navigationItems.find((item) => item.path === location.pathname)?.label || 'Admin'}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Badge
                variant="outline"
                className={cn(
                  'text-xs',
                  process.env.NODE_ENV === 'production'
                    ? 'bg-red-50 text-red-700 border-red-200'
                    : 'bg-blue-50 text-blue-700 border-blue-200'
                )}
              >
                {process.env.NODE_ENV === 'production' ? 'PRODUCTION' : 'DEVELOPMENT'}
              </Badge>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6 bg-background">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
