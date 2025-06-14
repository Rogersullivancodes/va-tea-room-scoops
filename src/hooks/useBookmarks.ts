
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import type { Tables } from '@/integrations/supabase/types';

type Bookmark = Tables<'bookmarks'>;

export const useBookmarks = () => {
  const { user } = useAuth();
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookmarks = async () => {
    if (!user) {
      setBookmarks([]);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('bookmarks')
        .select(`
          *,
          articles:article_id (
            id,
            title,
            excerpt,
            published_at,
            category
          )
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBookmarks(data || []);
    } catch (err) {
      console.error('Error fetching bookmarks:', err);
    } finally {
      setLoading(false);
    }
  };

  const addBookmark = async (articleId: string) => {
    if (!user) return { error: 'User not authenticated' };

    try {
      const { error } = await supabase
        .from('bookmarks')
        .insert([{ user_id: user.id, article_id: articleId }]);

      if (error) throw error;
      await fetchBookmarks();
      return { error: null };
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'Failed to add bookmark' };
    }
  };

  const removeBookmark = async (articleId: string) => {
    if (!user) return { error: 'User not authenticated' };

    try {
      const { error } = await supabase
        .from('bookmarks')
        .delete()
        .eq('user_id', user.id)
        .eq('article_id', articleId);

      if (error) throw error;
      await fetchBookmarks();
      return { error: null };
    } catch (err) {
      return { error: err instanceof Error ? err.message : 'Failed to remove bookmark' };
    }
  };

  const isBookmarked = (articleId: string) => {
    return bookmarks.some(bookmark => bookmark.article_id === articleId);
  };

  useEffect(() => {
    fetchBookmarks();
  }, [user]);

  return {
    bookmarks,
    loading,
    addBookmark,
    removeBookmark,
    isBookmarked,
    refetch: fetchBookmarks
  };
};
