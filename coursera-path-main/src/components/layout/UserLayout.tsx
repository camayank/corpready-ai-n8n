import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  BookOpen,
  Home,
  Briefcase,
  Users,
  GraduationCap,
  Settings,
  Search,
  Flame,
  LogOut,
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const navigationItems = [
  { path: '/app', label: 'Home', icon: Home },
  { path: '/app/curate', label: 'Curate Path', icon: BookOpen },
  { path: '/app/certificates', label: 'Certificates', icon: GraduationCap },
  { path: '/app/internships', label: 'Internships', icon: Briefcase },
  { path: '/app/mentorship', label: 'Mentorship', icon: Users },
];

export const UserLayout = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-sidebar flex flex-col">
        <div className="p-4 border-b">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-hero flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold">SkillPath India</span>
          </Link>
        </div>

        <nav className="flex-1 p-4">
          <div className="space-y-1">
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
          </div>
        </nav>

        <div className="p-4 border-t space-y-1">
          <Link to="/app/settings">
            <Button
              variant={location.pathname === '/app/settings' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              size="sm"
            >
              <Settings className="mr-2 w-4 h-4" />
              Settings
            </Button>
          </Link>
          {user?.role === 'ADMIN' && (
            <Link to="/admin">
              <Button variant="ghost" className="w-full justify-start" size="sm">
                <Settings className="mr-2 w-4 h-4" />
                Admin Panel
              </Button>
            </Link>
          )}
          <Button
            variant="ghost"
            className="w-full justify-start"
            size="sm"
            onClick={logout}
          >
            <LogOut className="mr-2 w-4 h-4" />
            Sign Out
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="p-4 flex items-center justify-between">
            <div className="flex-1 max-w-xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search courses, topics..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center gap-3 ml-4">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-orange-50 border border-orange-200 rounded-full">
                <Flame className="w-4 h-4 text-orange-600" />
                <span className="text-sm font-semibold text-orange-700">12</span>
                <span className="text-xs text-orange-600">Day Streak</span>
              </div>
              <Avatar className="h-8 w-8 cursor-pointer">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {user?.name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
