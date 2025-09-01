import React from 'react';
import { ExternalLink, Calendar, Tag } from 'lucide-react';
import { Button } from './ui/button';

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

interface NewsCardProps {
  news: NewsItem;
  onClick: () => void;
  className?: string;
  style?: React.CSSProperties;
}

const NewsCard: React.FC<NewsCardProps> = ({ news, onClick, className = '', style }) => {
  const handleSourceClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (news.articleUrl) {
      window.open(news.articleUrl, '_blank', 'noopener,noreferrer');
    }
  };

  // Category-specific placeholder images
  const getCategoryPlaceholder = (category: string) => {
    const placeholders = {
      politics: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=400&h=300&fit=crop',
      university: 'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop',
      breaking: 'https://images.unsplash.com/photo-1586776977044-3d6e1e0e7b52?w=400&h=300&fit=crop',
      default: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=300&fit=crop'
    };
    return placeholders[category as keyof typeof placeholders] || placeholders.default;
  };

  const displayThumbnail = news.thumbnailUrl || getCategoryPlaceholder(news.category);

  return (
    <div 
      className={`group cursor-pointer bg-card border border-border rounded-lg overflow-hidden hover-scale transition-all duration-300 hover:shadow-xl ${className}`}
      onClick={onClick}
      style={style}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={displayThumbnail}
          alt={news.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.currentTarget.src = getCategoryPlaceholder(news.category);
          }}
        />
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
            news.category === 'politics' 
              ? 'bg-red-500 text-white' 
              : 'bg-blue-500 text-white'
          }`}>
            {news.category.charAt(0).toUpperCase() + news.category.slice(1)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {news.title}
        </h3>

        {/* Source and Date */}
        <div className="flex items-center justify-between mb-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Tag className="w-3 h-3" />
            <span>{news.sourceName}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{new Date(news.publishedAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Source Button */}
        <div className="flex justify-between items-center">
          <Button
            onClick={handleSourceClick}
            size="sm"
            variant="outline"
            className="hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <ExternalLink className="w-3 h-3 mr-1" />
            Source
          </Button>
          <span className="text-xs text-muted-foreground">
            Click to read more
          </span>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;