
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
  last_login: string;
}

interface AdminContextType {
  admin: AdminUser | null;
  sessionToken: string | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  isAuthenticated: boolean;
  sessionExpiresAt: Date | null;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [sessionExpiresAt, setSessionExpiresAt] = useState<Date | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Session validation and cleanup
  const validateSession = () => {
    if (sessionExpiresAt && new Date() >= sessionExpiresAt) {
      console.log('Session expired, signing out');
      signOut();
      return false;
    }
    return true;
  };

  useEffect(() => {
    // Check for existing session
    const token = localStorage.getItem('admin_session_token');
    const adminData = localStorage.getItem('admin_user');
    const expiresAt = localStorage.getItem('admin_session_expires');
    
    if (token && adminData && expiresAt) {
      try {
        const expiry = new Date(expiresAt);
        setSessionExpiresAt(expiry);
        
        if (new Date() < expiry) {
          setSessionToken(token);
          setAdmin(JSON.parse(adminData));
        } else {
          // Session expired, clean up
          localStorage.removeItem('admin_session_token');
          localStorage.removeItem('admin_user');
          localStorage.removeItem('admin_session_expires');
        }
      } catch (error) {
        console.error('Error parsing admin session data:', error);
        localStorage.removeItem('admin_session_token');
        localStorage.removeItem('admin_user');
        localStorage.removeItem('admin_session_expires');
      }
    }
    setLoading(false);

    // Set up session validation interval (check every 5 minutes)
    const interval = setInterval(validateSession, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      // Input sanitization
      const sanitizedEmail = email.trim().toLowerCase();
      const sanitizedPassword = password.trim();

      if (!sanitizedEmail || !sanitizedPassword) {
        const error = new Error('Email and password are required');
        toast({
          title: "Sign in failed",
          description: error.message,
          variant: "destructive",
        });
        return { error };
      }

      const { data, error } = await supabase.functions.invoke('admin-auth', {
        body: { email: sanitizedEmail, password: sanitizedPassword }
      });

      if (error) {
        console.error('Admin auth error:', error);
        toast({
          title: "Sign in failed",
          description: "Failed to authenticate. Please try again.",
          variant: "destructive",
        });
        return { error };
      }

      if (data?.success) {
        const expiresAt = new Date(data.expiresAt);
        
        setAdmin(data.admin);
        setSessionToken(data.sessionToken);
        setSessionExpiresAt(expiresAt);
        
        // Store session data securely
        localStorage.setItem('admin_session_token', data.sessionToken);
        localStorage.setItem('admin_user', JSON.stringify(data.admin));
        localStorage.setItem('admin_session_expires', expiresAt.toISOString());
        
        toast({
          title: "Welcome back!",
          description: "Successfully signed in to admin panel.",
        });
        
        return { error: null };
      } else {
        const errorMessage = data?.error || 'Invalid credentials';
        toast({
          title: "Sign in failed",
          description: errorMessage,
          variant: "destructive",
        });
        return { error: new Error(errorMessage) };
      }
    } catch (error) {
      console.error('Admin sign in error:', error);
      toast({
        title: "Sign in failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
      return { error };
    }
  };

  const signOut = async () => {
    try {
      // Invalidate session on server if we have a token
      if (sessionToken) {
        try {
          await supabase
            .from('admin_sessions')
            .delete()
            .eq('session_token', sessionToken);
        } catch (error) {
          console.error('Error invalidating session:', error);
        }
      }

      // Clear local state and storage
      setAdmin(null);
      setSessionToken(null);
      setSessionExpiresAt(null);
      localStorage.removeItem('admin_session_token');
      localStorage.removeItem('admin_user');
      localStorage.removeItem('admin_session_expires');
      
      toast({
        title: "Signed out",
        description: "Successfully signed out of admin panel.",
      });
    } catch (error) {
      console.error('Admin sign out error:', error);
      toast({
        title: "Sign out failed",
        description: "An error occurred while signing out.",
        variant: "destructive",
      });
    }
  };

  const value = {
    admin,
    sessionToken,
    loading,
    signIn,
    signOut,
    isAuthenticated: !!admin && !!sessionToken && validateSession(),
    sessionExpiresAt,
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};
