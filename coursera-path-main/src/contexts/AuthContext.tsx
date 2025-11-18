// Authentication Context Provider

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authService, type AuthResponse } from '@/services/auth.service';
import type { User, LoginCredentials, SignupData } from '@/types';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Initialize auth state from stored tokens
  const initializeAuth = useCallback(async () => {
    const accessToken = authService.getAccessToken();
    const refreshToken = authService.getRefreshToken();

    if (!accessToken || !refreshToken) {
      // Auto-login in development mode
      if (import.meta.env.DEV) {
        try {
          console.log('🔧 Development Mode: Auto-logging in...');
          const response = await authService.devLogin();
          authService.saveTokens(response.accessToken, response.refreshToken);
          setUser(response.user);
          console.log(`✅ Auto-logged in as ${response.user.email} (${response.user.role})`);
        } catch (error) {
          console.error('Dev login failed:', error);
        }
      }
      setIsLoading(false);
      return;
    }

    try {
      // Try to get current user with existing token
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
    } catch (error: any) {
      // If token expired, try to refresh
      if (error?.status === 401 && refreshToken) {
        try {
          const response = await authService.refreshToken(refreshToken);
          authService.saveTokens(response.accessToken, response.refreshToken);
          setUser(response.user);
        } catch (refreshError) {
          // Refresh failed, clear tokens
          authService.clearTokens();
          // Try dev login in development
          if (import.meta.env.DEV) {
            try {
              console.log('🔧 Development Mode: Re-authenticating...');
              const response = await authService.devLogin();
              authService.saveTokens(response.accessToken, response.refreshToken);
              setUser(response.user);
            } catch (devError) {
              console.error('Dev login failed:', devError);
            }
          }
        }
      } else {
        authService.clearTokens();
        // Try dev login in development
        if (import.meta.env.DEV) {
          try {
            console.log('🔧 Development Mode: Auto-logging in...');
            const response = await authService.devLogin();
            authService.saveTokens(response.accessToken, response.refreshToken);
            setUser(response.user);
          } catch (devError) {
            console.error('Dev login failed:', devError);
          }
        }
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const login = async (credentials: LoginCredentials) => {
    try {
      const response: AuthResponse = await authService.login(credentials);
      authService.saveTokens(response.accessToken, response.refreshToken);
      setUser(response.user);

      toast({
        title: 'Welcome back!',
        description: `Logged in as ${response.user.email}`,
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Login failed',
        description: error?.message || 'Invalid email or password',
      });
      throw error;
    }
  };

  const signup = async (data: SignupData) => {
    try {
      const response: AuthResponse = await authService.signup(data);
      authService.saveTokens(response.accessToken, response.refreshToken);
      setUser(response.user);

      toast({
        title: 'Account created!',
        description: 'Please check your email to verify your account.',
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Signup failed',
        description: error?.message || 'Unable to create account',
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      authService.clearTokens();
      setUser(null);
      toast({
        title: 'Logged out',
        description: 'You have been logged out successfully.',
      });
    }
  };

  const refreshUser = async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error('Error refreshing user:', error);
    }
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    signup,
    logout,
    refreshUser,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
