
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Bookmark, BookmarkCheck, Eye, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useBookmarks } from '@/hooks/useBookmarks';
import { useAuth } from '@/contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import type { Tables } from '@/integrations/supabase/types';

type Article = Tables<'articles'>;

const createSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

interface ArticleCardProps {
  article: Article;
  onClick?: () => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, onClick }) => {
  const { user } = useAuth();
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks();
  const navigate = useNavigate();
  const bookmarked = isBookmarked(article.id);
  const articleSlug = createSlug(article.title);

  const handleBookmarkToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) return;

    if (bookmarked) {
      await removeBookmark(article.id);
    } else {
      await addBookmark(article.id);
    }
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(`/articles/${articleSlug}`);
    }
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group hover:shadow-xl" onClick={handleCardClick}>
      <CardHeader className="pb-3 p-4 sm:p-6">
        {article.featured_image_url && (
          <div className="w-full h-40 sm:h-48 overflow-hidden rounded-lg mb-3">
            <img
              src={article.featured_image_url}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              {article.category && (
                <Badge variant="secondary" className="text-xs">{article.category}</Badge>
              )}
              {article.is_premium && (
                <Badge variant="outline" className="text-gold border-gold text-xs">
                  Premium
                </Badge>
              )}
            </div>
            <h3 className="font-bold text-lg sm:text-xl leading-tight group-hover:text-red-600 transition-colors line-clamp-2">
              {article.title}
            </h3>
          </div>
          {user && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBookmarkToggle}
              className="ml-2 flex-shrink-0"
            >
              {bookmarked ? (
                <BookmarkCheck className="h-4 w-4 text-red-600" />
              ) : (
                <Bookmark className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0">
        {article.excerpt && (
          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 text-sm sm:text-base">
            {article.excerpt}
          </p>
        )}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm text-gray-500">
          <div className="flex items-center gap-3 sm:space-x-4">
            <div className="flex items-center space-x-1">
              <Eye className="h-3 w-3" />
              <span>{article.views || 0}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart className="h-3 w-3" />
              <span>{article.likes || 0}</span>
            </div>
            {article.credits_required > 0 && (
              <Badge variant="outline" className="text-xs">
                {article.credits_required} credits
              </Badge>
            )}
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-3 w-3" />
            <span className="truncate">
              {article.published_at 
                ? formatDistanceToNow(new Date(article.published_at), { addSuffix: true })
                : 'Draft'
              }
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArticleCard;
