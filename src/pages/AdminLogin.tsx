
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Eye, EyeOff, Lock, User, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThemeProvider from '@/components/ThemeProvider';
import { useAdmin } from '@/contexts/AdminContext';

interface AdminLoginFormData {
  email: string;
  password: string;
}

const AdminLogin: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutTime, setLockoutTime] = useState<Date | null>(null);
  const { signIn, isAuthenticated } = useAdmin();
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<AdminLoginFormData>();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

  // Check if account is locked out
  const isLockedOut = lockoutTime && new Date() < lockoutTime;

  const handleAdminLogin = async (data: AdminLoginFormData) => {
    if (isLockedOut) {
      return;
    }

    setLoading(true);
    
    const { error } = await signIn(data.email, data.password);
    
    if (error) {
      const newFailedAttempts = failedAttempts + 1;
      setFailedAttempts(newFailedAttempts);
      
      // Lock out after 3 failed attempts for 15 minutes
      if (newFailedAttempts >= 3) {
        const lockout = new Date(Date.now() + 15 * 60 * 1000);
        setLockoutTime(lockout);
      }
    } else {
      setFailedAttempts(0);
      setLockoutTime(null);
      navigate('/admin/dashboard');
    }
    
    setLoading(false);
  };

  const getRemainingLockoutTime = () => {
    if (!lockoutTime) return 0;
    return Math.max(0, Math.ceil((lockoutTime.getTime() - Date.now()) / 1000 / 60));
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-gray-900">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-12 px-4">
          <Card className="w-full max-w-md border-red-800 bg-gray-800">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-red-600 rounded-full">
                  <Shield className="h-8 w-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-red-400">
                Administrator Access
              </CardTitle>
              <p className="text-gray-400">
                Authorized personnel only
              </p>
              {isLockedOut && (
                <div className="flex items-center justify-center space-x-2 text-red-400 mt-2">
                  <AlertTriangle className="h-4 w-4" />
                  <span className="text-sm">
                    Account locked for {getRemainingLockoutTime()} minutes
                  </span>
                </div>
              )}
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(handleAdminLogin)} className="space-y-6">
                <div>
                  <Label htmlFor="email" className="text-gray-300">Administrator Email</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter admin email"
                      className="pl-10 bg-gray-700 border-gray-600 text-white"
                      disabled={loading || isLockedOut}
                      {...register("email", { 
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address"
                        }
                      })}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-red-400 mt-1">{errors.email.message}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="password" className="text-gray-300">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      className="pl-10 pr-10 bg-gray-700 border-gray-600 text-white"
                      disabled={loading || isLockedOut}
                      {...register("password", { 
                        required: "Password is required",
                        minLength: {
                          value: 8,
                          message: "Password must be at least 8 characters"
                        }
                      })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      disabled={loading || isLockedOut}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-400 mt-1">{errors.password.message}</p>
                  )}
                </div>

                {failedAttempts > 0 && !isLockedOut && (
                  <div className="text-yellow-400 text-sm text-center">
                    Failed attempts: {failedAttempts}/3
                  </div>
                )}
                
                <Button 
                  type="submit" 
                  className="w-full bg-red-600 hover:bg-red-700 text-white" 
                  disabled={loading || isLockedOut}
                >
                  <Shield className="h-4 w-4 mr-2" />
                  {loading ? 'Authenticating...' : isLockedOut ? 'Account Locked' : 'Access Admin Panel'}
                </Button>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500">
                  Unauthorized access is prohibited and monitored
                </p>
              </div>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default AdminLogin;
