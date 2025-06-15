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
      const { data, error } = await supabase
        .from('news_articles')
        .select('*')
        .order('published_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      setArticles(data || []);
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

    // Create a unique channel name to avoid conflicts
    const channelName = `news-updates-${Date.now()}`;
    
    // Set up real-time subscription for new articles
    const channel = supabase
      .channel(channelName)
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
      // FIX: Only remove the channel, do NOT call channel.unsubscribe()
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
