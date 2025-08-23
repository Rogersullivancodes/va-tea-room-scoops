import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Bookmark, BookmarkCheck, Eye, Clock, Share2, Play } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useBookmarks } from '@/hooks/useBookmarks';
import { useAuth } from '@/contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
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
  const {
    user
  } = useAuth();
  const {
    isBookmarked,
    addBookmark,
    removeBookmark
  } = useBookmarks();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const bookmarked = isBookmarked(article.id);
  const cardRef = useRef<HTMLDivElement>(null);
  const {
    elementRef,
    hasIntersected
  } = useIntersectionObserver({
    threshold: 0.1
  });

  // Placeholder images for news articles without thumbnails
  const placeholderImages = ['https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop', 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop', 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop', 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop', 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop'];
  const getImageUrl = () => {
    if (article.featured_image_url || (article as any).image_url) {
      return article.featured_image_url || (article as any).image_url;
    }
    // Use article ID hash to consistently pick same placeholder
    const hash = article.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return placeholderImages[hash % placeholderImages.length];
  };
  const createSlug = (title: string): string => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
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
  return <Card ref={node => {
    cardRef.current = node;
    if (elementRef) elementRef.current = node;
  }} className={`
        cursor-pointer group relative overflow-hidden
        transition-all duration-500 ease-out
        hover:shadow-2xl hover:shadow-primary/20
        ${featured ? 'lg:col-span-2 lg:row-span-2' : ''}
        transform-gpu fade-in-on-scroll ${hasIntersected ? 'visible' : ''}
      `} onClick={handleCardClick} onMouseEnter={() => setIsHovered(true)} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      
      
      <CardContent className={`relative z-10 ${featured ? 'p-6' : 'p-4'} pt-0`}>
        {article.excerpt && <p className={`text-muted-foreground mb-4 transition-colors duration-300 group-hover:text-foreground/80 ${featured ? 'text-base line-clamp-4' : 'text-sm line-clamp-3'}`}>
            {article.excerpt}
          </p>}
        
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
            {article.credits_required > 0 && <Badge variant="outline" className="text-xs hover:scale-105 transition-transform duration-200">
                {article.credits_required} credits
              </Badge>}
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-3 w-3" />
            <span className="truncate">
              {article.published_at ? formatDistanceToNow(new Date(article.published_at), {
              addSuffix: true
            }) : 'Draft'}
            </span>
          </div>
        </div>
      </CardContent>

      {/* Animated Border */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary via-secondary to-accent opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl" />
    </Card>;
};
export default InteractiveArticleCard;