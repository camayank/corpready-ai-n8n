import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Home,
  Briefcase,
  Users,
  GraduationCap,
  Settings,
  Search,
  Flame,
  LogOut,
  Target,
  Menu,
  X,
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

const navigationItems = [
  { path: '/app', label: 'Dashboard', icon: Home, shortcut: 'h' },
  { path: '/app/curate', label: 'Learn & Upskill', icon: Target, shortcut: 'l' },
  { path: '/app/certificates', label: 'Achievements', icon: GraduationCap, shortcut: 'a' },
  { path: '/app/internships', label: 'Opportunities', icon: Briefcase, shortcut: 'o' },
  { path: '/app/mentorship', label: 'Career Guidance', icon: Users, shortcut: 'g' },
];

export const UserLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcuts
  useKeyboardShortcuts([
    {
      key: '/',
      callback: () => searchInputRef.current?.focus(),
      description: 'Focus search',
    },
    {
      key: 'Escape',
      callback: () => {
        setIsMobileMenuOpen(false);
        searchInputRef.current?.blur();
      },
      description: 'Close menu/unfocus',
    },
    ...navigationItems.map((item) => ({
      key: item.shortcut,
      callback: () => navigate(item.path),
      description: `Go to ${item.label}`,
    })),
  ]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex">
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'w-64 border-r bg-sidebar flex flex-col transition-transform duration-300 ease-in-out z-50',
          'lg:relative lg:translate-x-0',
          'fixed inset-y-0 left-0',
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="p-4 border-b flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-hero flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold leading-tight">CorpReady</span>
              <span className="text-[10px] text-muted-foreground -mt-0.5">Build Your Career</span>
            </div>
          </Link>
          {/* Mobile close button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
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
          <div className="p-4 flex items-center justify-between gap-4">
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>

            <div className="flex-1 max-w-xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" aria-hidden="true" />
                <Input
                  ref={searchInputRef}
                  type="search"
                  placeholder="Search skills, opportunities... (Press '/' to focus)"
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search skills and opportunities"
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
