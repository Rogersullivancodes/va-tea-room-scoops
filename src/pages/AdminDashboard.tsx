
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  LogOut, 
  Settings, 
  FileText, 
  Users, 
  BarChart3,
  Newspaper,
  Globe,
  Database
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '@/contexts/AdminContext';
import ThemeProvider from '@/components/ThemeProvider';
import NewsManagement from '@/components/admin/NewsManagement';
import SiteSettings from '@/components/admin/SiteSettings';
import UserManagement from '@/components/admin/UserManagement';
import Analytics from '@/components/admin/Analytics';

const AdminDashboard: React.FC = () => {
  const { admin, signOut, isAuthenticated } = useAdmin();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/secure/admin');
    }
  }, [isAuthenticated, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/secure/admin');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-900 text-white">
        {/* Header */}
        <header className="bg-gray-800 border-b border-red-800 p-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center space-x-4">
              <Shield className="h-8 w-8 text-red-400" />
              <div>
                <h1 className="text-xl font-bold text-red-400">Admin Dashboard</h1>
                <p className="text-gray-400 text-sm">CrabsFriedPolitically Management</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">Welcome, {admin?.name}</span>
              <Button 
                variant="outline" 
                onClick={handleSignOut}
                className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5 bg-gray-800">
              <TabsTrigger value="overview" className="data-[state=active]:bg-red-600">
                <BarChart3 className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="news" className="data-[state=active]:bg-red-600">
                <Newspaper className="h-4 w-4 mr-2" />
                News
              </TabsTrigger>
              <TabsTrigger value="users" className="data-[state=active]:bg-red-600">
                <Users className="h-4 w-4 mr-2" />
                Users
              </TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-red-600">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-red-600">
                <Database className="h-4 w-4 mr-2" />
                Analytics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-300">Total Articles</CardTitle>
                    <FileText className="h-4 w-4 text-red-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">1,234</div>
                    <p className="text-xs text-green-400">+20.1% from last month</p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-300">Active Users</CardTitle>
                    <Users className="h-4 w-4 text-red-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">2,350</div>
                    <p className="text-xs text-green-400">+180.1% from last month</p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-300">Page Views</CardTitle>
                    <Globe className="h-4 w-4 text-red-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">12,234</div>
                    <p className="text-xs text-green-400">+19% from last month</p>
                  </CardContent>
                </Card>

                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-gray-300">Comments</CardTitle>
                    <BarChart3 className="h-4 w-4 text-red-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-white">573</div>
                    <p className="text-xs text-green-400">+201 since last hour</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="news" className="mt-6">
              <NewsManagement />
            </TabsContent>

            <TabsContent value="users" className="mt-6">
              <UserManagement />
            </TabsContent>

            <TabsContent value="settings" className="mt-6">
              <SiteSettings />
            </TabsContent>

            <TabsContent value="analytics" className="mt-6">
              <Analytics />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default AdminDashboard;
