import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Eye, EyeOff, Lock, User } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThemeProvider from '@/components/ThemeProvider';

const AdminLogin: React.FC = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    adminCode: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showAdminCode, setShowAdminCode] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Admin login attempt:', credentials);
    // Handle admin authentication
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
                  <Label htmlFor="username" className="text-gray-300">Administrator Username</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="username"
                      name="username"
                      value={credentials.username}
                      onChange={handleInputChange}
                      placeholder="admin username"
                      className="pl-10 bg-gray-700 border-gray-600 text-white"
                      required
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
                      placeholder="••••••••"
                      className="pl-10 pr-10 bg-gray-700 border-gray-600 text-white"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="adminCode" className="text-gray-300">Security Code</Label>
                  <div className="relative">
                    <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="adminCode"
                      name="adminCode"
                      type={showAdminCode ? "text" : "password"}
                      value={credentials.adminCode}
                      onChange={handleInputChange}
                      placeholder="6-digit security code"
                      className="pl-10 pr-10 bg-gray-700 border-gray-600 text-white"
                      maxLength={6}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowAdminCode(!showAdminCode)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    >
                      {showAdminCode ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                
                <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white">
                  <Shield className="h-4 w-4 mr-2" />
                  Access Admin Panel
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
