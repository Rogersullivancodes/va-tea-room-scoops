
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
      // First get political news (priority 1) randomized
      const { data: politicalNews, error: politicalError } = await supabase
        .from('news_articles')
        .select('*')
        .eq('priority', 1)
        .order('created_at', { ascending: false })
        .limit(15);

      if (politicalError) throw politicalError;

      // Then get college news (priority 2) randomized
      const { data: collegeNews, error: collegeError } = await supabase
        .from('news_articles')
        .select('*')
        .eq('priority', 2)
        .order('created_at', { ascending: false })
        .limit(5);

      if (collegeError) throw collegeError;

      // Randomize political news within its group
      const shuffledPolitical = (politicalNews || []).sort(() => Math.random() - 0.5);
      // Randomize college news within its group
      const shuffledCollege = (collegeNews || []).sort(() => Math.random() - 0.5);

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
      const { data, error } = await supabase.functions.invoke('fetch-news');
      
      if (error) {
        console.error('Error calling fetch-news function:', error);
        throw error;
      }
      
      console.log('News fetch response:', data);
      
      // Refresh the articles after fetching new ones
      await fetchNews();
      
      return data;
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
