
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '@/contexts/AdminContext';
import { supabase } from '@/integrations/supabase/client';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminTabs from '@/components/admin/AdminTabs';

const fetchStats = async () => {
  // Fetch article count
  const [{count: articlesCount}, {count: usersCount}, {count: newsArticleCount, data: newsViewsData}, {count: articleCount, data: articleViewsData}, {count: newsletterSubCount}]
    = await Promise.all([
      supabase.from('articles').select('id', { count: 'exact', head: true }),
      supabase.from('profiles').select('id', { count: 'exact', head: true }),
      supabase.from('news_articles').select('id,views', { count: 'exact' }),
      supabase.from('articles').select('id,views', { count: 'exact' }),
      supabase.from('newsletter_subscribers').select('id', { count: 'exact', head: true })
    ]);

  // Count views for pageviews (articles + news_articles)
  let totalViews = 0;
  if (newsViewsData) {
    for (const row of newsViewsData) totalViews += row.views || 0;
  }
  if (articleViewsData) {
    for (const row of articleViewsData) totalViews += row.views || 0;
  }
  
  return {
    articles: articlesCount || 0,
    users: usersCount || 0,
    pageViews: totalViews,
    newsletter: newsletterSubCount || 0,
  };
};

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

  const { data: stats, isLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: fetchStats,
  });

  if (!isAuthenticated) {
    return null;
  }

  return (
    <AdminLayout>
      <AdminHeader 
        adminName={admin?.name || 'Admin'} 
        onSignOut={handleSignOut} 
      />
      
      <main className="max-w-7xl mx-auto p-6">
        <AdminTabs 
          activeTab={activeTab}
          onTabChange={setActiveTab}
          stats={stats}
          isLoading={isLoading}
        />
      </main>
    </AdminLayout>
  );
};

export default AdminDashboard;
