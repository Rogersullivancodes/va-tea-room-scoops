import React, { useState, useEffect, useCallback } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import ArticleCard from './ArticleCard';
import { Button } from './ui/button';
import { Loader2, TrendingUp, User, Zap } from 'lucide-react';
import type { Tables } from '@/integrations/supabase/types';

type Article = Tables<'articles'>;
type NewsArticle = Tables<'news_articles'>;

interface PersonalizedFeedProps {
  categories?: string[];
  className?: string;
}

const PersonalizedFeed: React.FC<PersonalizedFeedProps> = ({ categories = [], className = '' }) => {
  const { user } = useAuth();
  const [personalizedData, setPersonalizedData] = useState<{
    articles: Article[];
    news: NewsArticle[];
  }>({ articles: [], news: [] });

  const fetchPersonalizedContent = useCallback(async ({ pageParam = 0 }) => {
    const limit = 12;
    const offset = pageParam * limit;

    // Only fetch news articles for homepage feed
    const newsQuery = supabase
      .from('news_articles')
      .select('*')
      .order('published_at', { ascending: false })
      .range(offset, offset + limit - 1);

    const newsResult = await newsQuery;

    if (newsResult.error) throw newsResult.error;

    // Shuffle news for variety
    const shuffledNews = [...(newsResult.data || [])].sort(() => Math.random() - 0.5);

    return {
      articles: [], // No articles, only news
      news: shuffledNews,
      hasNextPage: (newsResult.data?.length || 0) === limit
    };
  }, [categories]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error
  } = useInfiniteQuery({
    queryKey: ['personalized-feed', categories],
    queryFn: fetchPersonalizedContent,
    getNextPageParam: (lastPage, pages) => lastPage.hasNextPage ? pages.length : undefined,
    initialPageParam: 0,
  });

  // Flatten all pages into a single array
  const allContent = data?.pages.reduce((acc, page) => ({
    articles: [...acc.articles, ...page.articles],
    news: [...acc.news, ...page.news]
  }), { articles: [], news: [] }) || { articles: [], news: [] };

  // Convert news to article format with guaranteed thumbnails
  const placeholderImages = [
    'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop'
  ];

  const combinedContent = allContent.news.map((newsItem, index) => ({
    ...newsItem,
    type: 'news',
    // Convert news to article-like structure for ArticleCard  
    id: newsItem.id,
    title: newsItem.title,
    excerpt: newsItem.excerpt || newsItem.content?.substring(0, 150) + '...',
    category: newsItem.source,
    published_at: newsItem.published_at,
    featured_image_url: newsItem.image_url || placeholderImages[index % placeholderImages.length],
    views: newsItem.views || 0,
    likes: 0,
    credits_required: 0,
    is_premium: false,
    status: 'published',
    author_id: null
  }));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2 text-muted-foreground">Loading personalized content...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive">Error loading content. Please try again.</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-2">
          <TrendingUp className="h-7 w-7 text-primary" />
          Latest News
        </h2>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Zap className="h-4 w-4 text-accent" />
          Breaking Updates
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {combinedContent.map((item, index) => (
          <div
            key={`${item.type}-${item.id}`}
            className="animate-fade-in hover-scale"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <ArticleCard article={item as Article} />
          </div>
        ))}
      </div>

      {hasNextPage && (
        <div className="text-center mt-8">
          <Button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            variant="outline"
            size="lg"
            className="button-glow hover:scale-105 transition-all duration-300"
          >
            {isFetchingNextPage ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Loading More...
              </>
            ) : (
              'Load More Content'
            )}
          </Button>
        </div>
      )}
    </div>
  );
};

export default PersonalizedFeed;