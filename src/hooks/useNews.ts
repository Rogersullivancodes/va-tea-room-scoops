
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

type NewsArticle = Tables<'news_articles'>;

export const useNews = () => {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = async () => {
    try {
      // Get all news articles in parallel for faster loading
      const [politicalResponse, collegeResponse] = await Promise.all([
        supabase
          .from('news_articles')
          .select('*')
          .eq('priority', 1)
          .order('created_at', { ascending: false })
          .limit(20),
        supabase
          .from('news_articles')
          .select('*')
          .eq('priority', 2)
          .order('created_at', { ascending: false })
          .limit(8)
      ]);

      if (politicalResponse.error) throw politicalResponse.error;
      if (collegeResponse.error) throw collegeResponse.error;

      // Thoroughly shuffle political news using Fisher-Yates algorithm
      const shuffledPolitical = [...(politicalResponse.data || [])];
      for (let i = shuffledPolitical.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledPolitical[i], shuffledPolitical[j]] = [shuffledPolitical[j], shuffledPolitical[i]];
      }

      // Thoroughly shuffle college news
      const shuffledCollege = [...(collegeResponse.data || [])];
      for (let i = shuffledCollege.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledCollege[i], shuffledCollege[j]] = [shuffledCollege[j], shuffledCollege[i]];
      }

      // Combine with political news first, college news last
      const combinedArticles = [...shuffledPolitical, ...shuffledCollege];
      
      setArticles(combinedArticles);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch news');
    } finally {
      setLoading(false);
    }
  };

  const fetchMoreNews = async () => {
    try {
      console.log('Triggering news fetch...');
      
      // Run both fetch-news and refresh articles in parallel for speed
      const [fetchResponse] = await Promise.all([
        supabase.functions.invoke('fetch-news'),
        new Promise(resolve => setTimeout(resolve, 100)) // Small delay to ensure DB is updated
      ]);
      
      if (fetchResponse.error) {
        console.error('Error calling fetch-news function:', fetchResponse.error);
        throw fetchResponse.error;
      }
      
      console.log('News fetch response:', fetchResponse.data);
      
      // Refresh the articles after fetching new ones
      await fetchNews();
      
      return fetchResponse.data;
    } catch (err) {
      console.error('Error fetching more news:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch more news');
    }
  };

  useEffect(() => {
    fetchNews();

    // Auto-refresh news every 10 minutes
    const refreshInterval = setInterval(() => {
      console.log('Auto-refreshing news...');
      fetchMoreNews();
    }, 10 * 60 * 1000); // 10 minutes

    // Create a unique channel name using timestamp and random number
    const channelId = `news-updates-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Set up real-time subscription for new articles
    const channel = supabase
      .channel(channelId)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'news_articles'
        },
        (payload) => {
          console.log('New article received:', payload);
          setArticles(prev => [payload.new as NewsArticle, ...prev].slice(0, 20));
        }
      )
      .subscribe();

    return () => {
      clearInterval(refreshInterval);
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    articles,
    loading,
    error,
    fetchMoreNews,
    refetch: fetchNews
  };
};
