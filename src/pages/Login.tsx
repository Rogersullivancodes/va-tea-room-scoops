import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, Lock, Mail, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThemeProvider from '@/components/ThemeProvider';
import { useAuth } from '@/contexts/AuthContext';
import { sanitizeEmail, validateEmail, validatePassword } from '@/utils/security';

interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn, user } = useAuth();
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    
    // Sanitize and validate inputs
    const sanitizedEmail = sanitizeEmail(data.email);
    const passwordValidation = validatePassword(data.password);
    
    if (!validateEmail(sanitizedEmail)) {
      setLoading(false);
      return;
    }
    
    if (!passwordValidation.valid) {
      setLoading(false);
      return;
    }

    const { error } = await signIn(sanitizedEmail, data.password);
    
    if (!error) {
      navigate('/');
    }
    
    setLoading(false);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-black dark:to-gray-800">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-12 px-4 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-red-600/5 pointer-events-none"></div>
          <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-red-600/10 to-transparent rounded-full blur-3xl"></div>
          
          <Card className="w-full max-w-md relative z-10 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-white/20 dark:border-gray-800/20">
            <CardHeader className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-2">
                <Sparkles className="h-6 w-6 text-primary" />
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-red-700 via-primary to-red-600 dark:from-red-400 dark:via-gold dark:to-red-400 bg-clip-text text-transparent">
                  Welcome Back
                </CardTitle>
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <p className="text-gray-600 dark:text-gray-300 font-medium">
                Sign in to access premium political content
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      className="pl-10 h-12 bg-white/50 dark:bg-black/50 border-gray-200 dark:border-gray-700 focus:border-primary dark:focus:border-gold transition-all duration-200"
                      disabled={loading}
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
                    <p className="text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-semibold">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10 pr-10 h-12 bg-white/50 dark:bg-black/50 border-gray-200 dark:border-gray-700 focus:border-primary dark:focus:border-gold transition-all duration-200"
                      disabled={loading}
                      {...register("password", { 
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters"
                        }
                      })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                      disabled={loading}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-600 dark:text-red-400">{errors.password.message}</p>
                  )}
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full h-12 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200" 
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Signing In...</span>
                    </div>
                  ) : (
                    'Sign In'
                  )}
                </Button>
              </form>
              
              <div className="mt-8 text-center">
                <p className="text-gray-600 dark:text-gray-300">
                  Don't have an account?{' '}
                  <Link to="/signup" className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-semibold hover:underline transition-all duration-200">
                    Sign up for free
                  </Link>
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

export default Login;
