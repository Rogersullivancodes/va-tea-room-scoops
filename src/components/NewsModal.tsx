import React from 'react';
import { X, ExternalLink, Calendar, Tag } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader } from './ui/dialog';

interface NewsItem {
  id: string;
  title: string;
  description: string;
  sourceName: string;
  articleUrl?: string;
  thumbnailUrl: string;
  category: string;
  publishedAt: string;
}

interface NewsModalProps {
  news: NewsItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const NewsModal: React.FC<NewsModalProps> = ({ news, isOpen, onClose }) => {
  if (!news) return null;

  const handleReadFullArticle = () => {
    if (news.articleUrl) {
      window.open(news.articleUrl, '_blank', 'noopener,noreferrer');
    }
  };

  // Category-specific placeholder images
  const getCategoryPlaceholder = (category: string) => {
    const placeholders = {
      politics: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&h=500&fit=crop',
      university: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=500&fit=crop',
      breaking: 'https://images.unsplash.com/photo-1586776977044-3d6e1e0e7b52?w=800&h=500&fit=crop',
      default: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=500&fit=crop'
    };
    return placeholders[category as keyof typeof placeholders] || placeholders.default;
  };

  const displayThumbnail = news.thumbnailUrl || getCategoryPlaceholder(news.category);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto animate-scale-in">
        <DialogHeader className="space-y-4">
          {/* Large Thumbnail */}
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <img
              src={displayThumbnail}
              alt={news.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = getCategoryPlaceholder(news.category);
              }}
            />
            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                news.category === 'politics' 
                  ? 'bg-red-500 text-white' 
                  : 'bg-blue-500 text-white'
              }`}>
                {news.category.charAt(0).toUpperCase() + news.category.slice(1)}
              </span>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
            {news.title}
          </h2>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Tag className="w-4 h-4" />
              <span className="font-medium">{news.sourceName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date(news.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</span>
            </div>
          </div>
        </DialogHeader>

        {/* Extended Preview */}
        <div className="mt-6 space-y-4">
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground leading-relaxed">
              {news.description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              onClick={handleReadFullArticle}
              size="lg"
              className="flex-1 bg-primary hover:bg-primary/90 hover:scale-105 transition-all duration-300"
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              Read Full Article
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              size="lg"
              className="flex-1 hover:bg-muted"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewsModal;