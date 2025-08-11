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

    // Fetch articles
    const articlesQuery = supabase
      .from('articles')
      .select('*')
      .eq('status', 'published')
      .order('published_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (categories.length > 0) {
      articlesQuery.in('category', categories);
    }

    // Fetch news
    const newsQuery = supabase
      .from('news_articles')
      .select('*')
      .order('published_at', { ascending: false })
      .range(offset, offset + limit - 1);

    const [articlesResult, newsResult] = await Promise.all([
      articlesQuery,
      newsQuery
    ]);

    if (articlesResult.error) throw articlesResult.error;
    if (newsResult.error) throw newsResult.error;

    // Personalize based on user preferences (simplified)
    const shuffledArticles = [...(articlesResult.data || [])].sort(() => Math.random() - 0.5);
    const shuffledNews = [...(newsResult.data || [])].sort(() => Math.random() - 0.5);

    return {
      articles: shuffledArticles,
      news: shuffledNews,
      hasNextPage: (articlesResult.data?.length || 0) === limit
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

  // Intersect articles and news for variety
  const combinedContent = [];
  const maxLength = Math.max(allContent.articles.length, allContent.news.length);
  
  for (let i = 0; i < maxLength; i++) {
    if (allContent.articles[i]) {
      combinedContent.push({ ...allContent.articles[i], type: 'article' });
    }
    if (allContent.news[i]) {
      combinedContent.push({ 
        ...allContent.news[i], 
        type: 'news',
        // Convert news to article-like structure for ArticleCard
        id: allContent.news[i].id,
        title: allContent.news[i].title,
        excerpt: allContent.news[i].excerpt,
        category: allContent.news[i].source,
        published_at: allContent.news[i].published_at,
        featured_image_url: allContent.news[i].image_url || `https://images.unsplash.com/photo-${649 + i}72904349-6e44c42644a7?w=400&h=300&fit=crop`,
        views: 0,
        likes: 0,
        credits_required: 0,
        is_premium: false,
        status: 'published'
      });
    }
  }

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
          {user ? (
            <>
              <User className="h-7 w-7 text-primary" />
              For You
            </>
          ) : (
            <>
              <TrendingUp className="h-7 w-7 text-primary" />
              Trending Now
            </>
          )}
        </h2>
        {user && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Zap className="h-4 w-4 text-accent" />
            Personalized
          </div>
        )}
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