import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useAdmin } from '@/contexts/AdminContext';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminTabs from '@/components/admin/AdminTabs';
import { supabase } from '@/integrations/supabase/client';

const fetchStats = async () => {
  const [articlesResult, usersResult, subscribersResult] = await Promise.all([
    supabase.from('articles').select('id, views', { count: 'exact' }),
    supabase.from('profiles').select('id', { count: 'exact' }),
    supabase.from('newsletter_subscribers').select('id', { count: 'exact' })
  ]);

  // Calculate total views
  const totalArticleViews = articlesResult.data?.reduce((sum, article) => sum + (article.views || 0), 0) || 0;
  const totalNewsViews = await supabase.from('news_articles').select('views').then(result => 
    result.data?.reduce((sum, article) => sum + (article.views || 0), 0) || 0
  );

  return {
    totalArticles: articlesResult.count || 0,
    totalUsers: usersResult.count || 0,
    totalPageViews: totalArticleViews + totalNewsViews,
    totalSubscribers: subscribersResult.count || 0,
  };
};

const AdminDashboard: React.FC = () => {
  const { isAuthenticated, admin } = useAdmin();
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  const handleSignOut = async () => {
    // Implementation depends on your admin context
    navigate('/secure/admin');
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/secure/admin');
    }
  }, [isAuthenticated, navigate]);

  const { data: stats, isLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: fetchStats,
    enabled: isAuthenticated,
  });

  if (!isAuthenticated) {
    return null;
  }

  return (
    <AdminLayout>
      <AdminHeader adminName={admin?.name || 'Admin'} onSignOut={handleSignOut} />
      <AdminTabs 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        stats={stats} 
        isLoading={isLoading} 
      />
    </AdminLayout>
  );
};

export default AdminDashboard;