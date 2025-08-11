import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Bookmark, BookmarkCheck, Eye, Clock, Share2, Play } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useBookmarks } from '@/hooks/useBookmarks';
import { useAuth } from '@/contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import type { Tables } from '@/integrations/supabase/types';

type Article = Tables<'articles'>;

interface InteractiveArticleCardProps {
  article: Article;
  onClick?: () => void;
  featured?: boolean;
}

const InteractiveArticleCard: React.FC<InteractiveArticleCardProps> = ({ 
  article, 
  onClick, 
  featured = false 
}) => {
  const { user } = useAuth();
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const bookmarked = isBookmarked(article.id);
  const cardRef = useRef<HTMLDivElement>(null);

  const createSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const articleSlug = createSlug(article.title);

  const handleBookmarkToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      toast.error('Please login to bookmark articles');
      return;
    }

    if (bookmarked) {
      await removeBookmark(article.id);
      toast.success('Removed from reading list');
    } else {
      await addBookmark(article.id);
      toast.success('Added to reading list');
    }
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt || '',
          url: window.location.origin + `/articles/${articleSlug}`
        });
      } catch (err) {
        // User cancelled sharing
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.origin + `/articles/${articleSlug}`);
      toast.success('Link copied to clipboard!');
    }
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(`/articles/${articleSlug}`);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    setIsHovered(false);
  };

  return (
    <Card 
      ref={cardRef}
      className={`
        cursor-pointer group relative overflow-hidden
        transition-all duration-500 ease-out
        hover:shadow-2xl hover:shadow-primary/20
        ${featured ? 'lg:col-span-2 lg:row-span-2' : ''}
        transform-gpu
      `}
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <CardHeader className={`pb-3 relative z-10 ${featured ? 'p-6' : 'p-4'}`}>
        {article.featured_image_url && (
          <div className={`w-full overflow-hidden rounded-lg mb-4 relative ${featured ? 'h-64' : 'h-48'}`}>
            <img
              src={article.featured_image_url}
              alt={article.title}
              className={`w-full h-full object-cover transition-all duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'} group-hover:scale-110`}
              onLoad={() => setImageLoaded(true)}
            />
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Play Icon for Featured Articles */}
            {featured && (
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 group-hover:scale-110 transition-transform duration-300">
                  <Play className="h-8 w-8 text-white" />
                </div>
              </div>
            )}

            {/* Action Buttons Overlay */}
            <div className={`absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0`}>
              {user && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleBookmarkToggle}
                  className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border-0"
                >
                  {bookmarked ? (
                    <BookmarkCheck className="h-4 w-4 text-red-500" />
                  ) : (
                    <Bookmark className="h-4 w-4 text-white" />
                  )}
                </Button>
              )}
              <Button
                variant="secondary"
                size="sm"
                onClick={handleShare}
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border-0"
              >
                <Share2 className="h-4 w-4 text-white" />
              </Button>
            </div>
          </div>
        )}
        
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              {article.category && (
                <Badge 
                  variant="secondary" 
                  className="text-xs hover:scale-105 transition-transform duration-200"
                >
                  {article.category}
                </Badge>
              )}
              {article.is_premium && (
                <Badge 
                  variant="outline" 
                  className="text-accent border-accent text-xs hover:scale-105 transition-transform duration-200"
                >
                  Premium
                </Badge>
              )}
            </div>
            <h3 className={`font-bold leading-tight group-hover:text-primary transition-colors duration-300 ${featured ? 'text-xl lg:text-2xl' : 'text-lg'}`}>
              {article.title}
            </h3>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className={`relative z-10 ${featured ? 'p-6' : 'p-4'} pt-0`}>
        {article.excerpt && (
          <p className={`text-muted-foreground mb-4 transition-colors duration-300 group-hover:text-foreground/80 ${featured ? 'text-base line-clamp-4' : 'text-sm line-clamp-3'}`}>
            {article.excerpt}
          </p>
        )}
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-1 hover:text-primary transition-colors duration-200">
              <Eye className="h-3 w-3" />
              <span>{article.views || 0}</span>
            </div>
            <div className="flex items-center space-x-1 hover:text-red-500 transition-colors duration-200">
              <Heart className="h-3 w-3" />
              <span>{article.likes || 0}</span>
            </div>
            {article.credits_required > 0 && (
              <Badge variant="outline" className="text-xs hover:scale-105 transition-transform duration-200">
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

      {/* Animated Border */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl" />
    </Card>
  );
};

export default InteractiveArticleCard;