import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BookOpen, Bookmark, Clock, X, Play } from 'lucide-react';
import { useBookmarks } from '@/hooks/useBookmarks';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

const ReadingListWidget: React.FC = () => {
  const { user } = useAuth();
  const { bookmarks, removeBookmark, loading } = useBookmarks();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const createSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleReadArticle = (articleId: string, title: string) => {
    const slug = createSlug(title);
    navigate(`/articles/${slug}`);
  };

  const handleRemoveBookmark = async (articleId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    await removeBookmark(articleId);
  };

  if (!user) {
    return (
      <Card className="hover-scale">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Bookmark className="h-5 w-5 text-primary" />
            Reading List
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm mb-4">
            Login to save articles to your reading list and resume where you left off.
          </p>
          <Button 
            onClick={() => navigate('/login')} 
            className="w-full button-glow"
          >
            Login to Get Started
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card className="hover-scale">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Bookmark className="h-5 w-5 text-primary animate-pulse" />
            Reading List
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-3 animate-pulse">
                <div className="w-12 h-12 bg-muted rounded" />
                <div className="flex-1">
                  <div className="h-3 bg-muted rounded mb-2" />
                  <div className="h-2 bg-muted rounded w-3/4" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const displayBookmarks = isExpanded ? bookmarks : bookmarks.slice(0, 3);

  return (
    <Card className="hover-scale transition-all duration-300">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-lg">
          <div className="flex items-center gap-2">
            <Bookmark className="h-5 w-5 text-primary" />
            Reading List
            {bookmarks.length > 0 && (
              <Badge variant="secondary" className="text-xs">
                {bookmarks.length}
              </Badge>
            )}
          </div>
          {bookmarks.length > 3 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs hover:bg-primary/10"
            >
              {isExpanded ? 'Show Less' : 'Show All'}
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {bookmarks.length === 0 ? (
          <div className="text-center py-6">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
            <p className="text-muted-foreground text-sm mb-4">
              Your reading list is empty. Start bookmarking articles to read later!
            </p>
          </div>
        ) : (
          <ScrollArea className={isExpanded ? "h-96" : "h-auto"}>
            <div className="space-y-3">
              {displayBookmarks.map((bookmark, index) => {
                const article = (bookmark as any).articles;
                if (!article) return null;

                return (
                  <div
                    key={bookmark.id}
                    className="group flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200 cursor-pointer"
                    onClick={() => handleReadArticle(article.id, article.title)}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {article.featured_image_url ? (
                      <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden">
                        <img
                          src={article.featured_image_url}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                          <Play className="h-4 w-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </div>
                    ) : (
                      <div className="w-16 h-16 flex-shrink-0 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                        <BookOpen className="h-6 w-6 text-primary" />
                      </div>
                    )}
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors duration-200">
                        {article.title}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        {article.category && (
                          <Badge variant="outline" className="text-xs">
                            {article.category}
                          </Badge>
                        )}
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {article.published_at && formatDistanceToNow(new Date(article.published_at), { addSuffix: true })}
                        </div>
                      </div>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => handleRemoveBookmark(article.id, e)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};

export default ReadingListWidget;