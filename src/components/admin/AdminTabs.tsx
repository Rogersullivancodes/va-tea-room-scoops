
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3,
  Newspaper,
  Globe,
  Database,
  PenTool,
  Mail,
  Users,
  Settings
} from 'lucide-react';
import NewsManagement from '@/components/admin/NewsManagement';
import ArticleManagement from '@/components/admin/ArticleManagement';
import NewsletterManagement from '@/components/admin/NewsletterManagement';
import SiteSettings from '@/components/admin/SiteSettings';
import UserManagement from '@/components/admin/UserManagement';
import Analytics from '@/components/admin/Analytics';
import StatsOverview from './StatsOverview';

interface AdminTabsProps {
  activeTab: string;
  onTabChange: (value: string) => void;
  stats?: any;
  isLoading: boolean;
}

const AdminTabs: React.FC<AdminTabsProps> = ({ activeTab, onTabChange, stats, isLoading }) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="grid w-full grid-cols-7 bg-gray-800">
        <TabsTrigger value="overview" className="data-[state=active]:bg-red-600">
          <BarChart3 className="h-4 w-4 mr-2" />
          Overview
        </TabsTrigger>
        <TabsTrigger value="articles" className="data-[state=active]:bg-red-600">
          <PenTool className="h-4 w-4 mr-2" />
          Articles
        </TabsTrigger>
        <TabsTrigger value="news" className="data-[state=active]:bg-red-600">
          <Newspaper className="h-4 w-4 mr-2" />
          News
        </TabsTrigger>
        <TabsTrigger value="newsletter" className="data-[state=active]:bg-red-600">
          <Mail className="h-4 w-4 mr-2" />
          Newsletter
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
        <StatsOverview stats={stats} isLoading={isLoading} />
      </TabsContent>

      <TabsContent value="articles" className="mt-6">
        <ArticleManagement />
      </TabsContent>

      <TabsContent value="news" className="mt-6">
        <NewsManagement />
      </TabsContent>

      <TabsContent value="newsletter" className="mt-6">
        <NewsletterManagement />
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
  );
};

export default AdminTabs;
