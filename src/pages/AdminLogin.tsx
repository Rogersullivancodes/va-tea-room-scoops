
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Eye, EyeOff, Lock, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThemeProvider from '@/components/ThemeProvider';
import { useAdmin } from '@/contexts/AdminContext';

const AdminLogin: React.FC = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn, isAuthenticated } = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await signIn(credentials.username, credentials.password);
    
    if (!error) {
      navigate('/admin/dashboard');
    }
    
    setLoading(false);
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
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAdminLogin} className="space-y-6">
                <div>
                  <Label htmlFor="username" className="text-gray-300">Administrator Email</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="username"
                      name="username"
                      value={credentials.username}
                      onChange={handleInputChange}
                      placeholder="cfp@crabsfriedpolitically.com"
                      className="pl-10 bg-gray-700 border-gray-600 text-white"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="password" className="text-gray-300">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={credentials.password}
                      onChange={handleInputChange}
                      placeholder="admin"
                      className="pl-10 pr-10 bg-gray-700 border-gray-600 text-white"
                      required
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      disabled={loading}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                
                <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white" disabled={loading}>
                  <Shield className="h-4 w-4 mr-2" />
                  {loading ? 'Authenticating...' : 'Access Admin Panel'}
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
