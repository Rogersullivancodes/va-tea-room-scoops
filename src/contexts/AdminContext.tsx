
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
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check for existing session
    const token = localStorage.getItem('admin_session_token');
    const adminData = localStorage.getItem('admin_user');
    
    if (token && adminData) {
      setSessionToken(token);
      setAdmin(JSON.parse(adminData));
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('admin-auth', {
        body: { email, password }
      });

      if (error) throw error;

      if (data.success) {
        setAdmin(data.admin);
        setSessionToken(data.sessionToken);
        localStorage.setItem('admin_session_token', data.sessionToken);
        localStorage.setItem('admin_user', JSON.stringify(data.admin));
        
        toast({
          title: "Welcome back!",
          description: "Successfully signed in to admin panel.",
        });
        
        return { error: null };
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      toast({
        title: "Sign in failed",
        description: error.message,
        variant: "destructive",
      });
      return { error };
    }
  };

  const signOut = async () => {
    setAdmin(null);
    setSessionToken(null);
    localStorage.removeItem('admin_session_token');
    localStorage.removeItem('admin_user');
    
    toast({
      title: "Signed out",
      description: "Successfully signed out of admin panel.",
    });
  };

  const value = {
    admin,
    sessionToken,
    loading,
    signIn,
    signOut,
    isAuthenticated: !!admin && !!sessionToken,
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};
