
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThemeProvider from '@/components/ThemeProvider';
import { useAuth } from '@/contexts/AuthContext';

interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Signup: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signUp, user } = useAuth();
  const navigate = useNavigate();

  const { register, handleSubmit, watch, formState: { errors } } = useForm<SignupFormData>();
  const password = watch("password");

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const onSubmit = async (data: SignupFormData) => {
    if (data.password !== data.confirmPassword) {
      return;
    }
    
    setLoading(true);
    
    const { error } = await signUp(
      data.email,
      data.password,
      data.firstName,
      data.lastName
    );
    
    if (!error) {
      navigate('/signup-complete');
    }
    
    setLoading(false);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <main className="flex-1 flex items-center justify-center py-12 px-4">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-red-700 dark:text-red-400">
                Join CrabsFriedPolitically
              </CardTitle>
              <p className="text-gray-600 dark:text-gray-300">
                Get 10 FREE credits just for signing up!
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="John"
                        className="pl-10"
                        disabled={loading}
                        {...register("firstName", { 
                          required: "First name is required",
                          minLength: {
                            value: 2,
                            message: "First name must be at least 2 characters"
                          }
                        })}
                      />
                    </div>
                    {errors.firstName && (
                      <p className="text-sm text-red-600 dark:text-red-400 mt-1">{errors.firstName.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Doe"
                      disabled={loading}
                      {...register("lastName", { 
                        required: "Last name is required",
                        minLength: {
                          value: 2,
                          message: "Last name must be at least 2 characters"
                        }
                      })}
                    />
                    {errors.lastName && (
                      <p className="text-sm text-red-600 dark:text-red-400 mt-1">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      className="pl-10"
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
                    <p className="text-sm text-red-600 dark:text-red-400 mt-1">{errors.email.message}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10 pr-10"
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
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      disabled={loading}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-600 dark:text-red-400 mt-1">{errors.password.message}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="••••••••"
                      className="pl-10 pr-10"
                      disabled={loading}
                      {...register("confirmPassword", { 
                        required: "Please confirm your password",
                        validate: value => value === password || "Passwords do not match"
                      })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      disabled={loading}
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-sm text-red-600 dark:text-red-400 mt-1">{errors.confirmPassword.message}</p>
                  )}
                </div>
                
                <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={loading}>
                  {loading ? 'Creating Account...' : 'Create Account & Get 10 FREE Credits'}
                </Button>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-gray-600 dark:text-gray-300">
                  Already have an account?{' '}
                  <Link to="/login" className="text-red-600 hover:text-red-700 font-semibold">
                    Sign in here
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

export default Signup;
