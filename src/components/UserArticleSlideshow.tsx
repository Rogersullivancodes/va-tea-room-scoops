import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight, Clock, User, Eye, Pause, Play } from 'lucide-react';
import { useArticles } from '@/hooks/useArticles';
import { cn } from '@/lib/utils';

interface UserArticleSlideshowProps {
  className?: string;
  autoAdvance?: boolean;
  slideDuration?: number; // in milliseconds
}

const UserArticleSlideshow: React.FC<UserArticleSlideshowProps> = ({
  className = "",
  autoAdvance = true,
  slideDuration = 120000 // 2 minutes default
}) => {
  const { articles, loading } = useArticles();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(slideDuration);

  // Filter published articles
  const publishedArticles = articles.filter(article => article.status === 'published');

  // Auto-advance slideshow
  useEffect(() => {
    if (!autoAdvance || isPaused || publishedArticles.length <= 1) return;

    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1000) {
          setCurrentIndex(current => (current + 1) % publishedArticles.length);
          return slideDuration;
        }
        return prev - 1000;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [autoAdvance, isPaused, publishedArticles.length, slideDuration]);

  const goToNext = () => {
    setCurrentIndex((current) => (current + 1) % publishedArticles.length);
    setTimeRemaining(slideDuration);
  };

  const goToPrevious = () => {
    setCurrentIndex((current) => 
      current === 0 ? publishedArticles.length - 1 : current - 1
    );
    setTimeRemaining(slideDuration);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setTimeRemaining(slideDuration);
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const formatTimeRemaining = (ms: number) => {
    const seconds = Math.ceil(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className={cn("bg-background/50 backdrop-blur-sm rounded-lg p-6", className)}>
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-muted rounded w-3/4"></div>
          <div className="h-4 bg-muted rounded w-full"></div>
          <div className="h-4 bg-muted rounded w-5/6"></div>
          <div className="h-32 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  if (publishedArticles.length === 0) {
    return (
      <div className={cn("bg-background/50 backdrop-blur-sm rounded-lg p-6 text-center", className)}>
        <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-semibold mb-2">No Community Articles</h3>
        <p className="text-muted-foreground">User-submitted articles will appear here as a rotating slideshow.</p>
      </div>
    );
  }

  const currentArticle = publishedArticles[currentIndex];
  const progressPercent = ((slideDuration - timeRemaining) / slideDuration) * 100;

  return (
    <Card className={cn("bg-background/80 backdrop-blur-sm border-border/50", className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              <User className="w-3 h-3 mr-1" />
              Community Article
            </Badge>
            <span className="text-sm text-muted-foreground">
              {currentIndex + 1} of {publishedArticles.length}
            </span>
          </div>
          
          {autoAdvance && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">
                {formatTimeRemaining(timeRemaining)}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={togglePause}
                className="h-6 w-6 p-0"
              >
                {isPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
              </Button>
            </div>
          )}
        </div>
        
        {/* Progress bar */}
        {autoAdvance && !isPaused && (
          <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-1000 ease-linear"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-3">
          <CardTitle className="text-lg leading-tight line-clamp-2">
            {currentArticle.title}
          </CardTitle>
          
          <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
            {currentArticle.excerpt || currentArticle.content?.substring(0, 200) + '...'}
          </p>
          
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {new Date(currentArticle.published_at).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {currentArticle.views || 0} views
            </div>
            <Badge variant="outline" className="text-xs">
              {currentArticle.category}
            </Badge>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={goToPrevious}
              disabled={publishedArticles.length <= 1}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={goToNext}
              disabled={publishedArticles.length <= 1}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Slide indicators */}
          <div className="flex items-center gap-1">
            {publishedArticles.slice(0, 5).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-colors",
                  index === currentIndex ? "bg-primary" : "bg-muted-foreground/30"
                )}
              />
            ))}
            {publishedArticles.length > 5 && (
              <span className="text-xs text-muted-foreground ml-1">
                +{publishedArticles.length - 5}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserArticleSlideshow;