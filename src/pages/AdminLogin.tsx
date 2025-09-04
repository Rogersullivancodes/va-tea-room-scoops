import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAdmin } from '@/contexts/AdminContext';
import { useToast } from '@/hooks/use-toast';
import ThemeProvider from '@/components/ThemeProvider';

interface AdminLoginFormData {
  email: string;
  password: string;
}

const AdminLogin: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { signIn, isAuthenticated } = useAdmin();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors } } = useForm<AdminLoginFormData>();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data: AdminLoginFormData) => {
    setLoading(true);
    try {
      await signIn(data.email, data.password);
      toast({
        title: "Welcome back!",
        description: "You have successfully signed in to the admin panel.",
      });
      navigate('/admin/dashboard');
    } catch (error: any) {
      toast({
        title: "Authentication Failed",
        description: error.message || "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-red-600 rounded-full">
                <Shield className="h-8 w-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center">
              Admin Login
            </CardTitle>
            <CardDescription className="text-center">
              Access the CrabsFriedPolitically admin panel
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Admin Email</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@crabsfriedpolitically.com"
                    className="pl-10"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Please enter a valid email'
                      }
                    })}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter admin password"
                    className="pl-10"
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters'
                      }
                    })}
                  />
                </div>
                {errors.password && (
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button 
                type="submit" 
                className="w-full bg-red-600 hover:bg-red-700"
                disabled={loading}
              >
                {loading ? 'Authenticating...' : 'Sign In to Admin Panel'}
              </Button>
            </form>

            <div className="text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                This is a secure admin area. Unauthorized access is prohibited.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </ThemeProvider>
  );
};

export default AdminLogin;