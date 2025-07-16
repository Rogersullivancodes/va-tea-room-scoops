
import React from 'react';
import { Link } from 'react-router-dom';

interface FeedItemProps {
  imageUrl: string;
  title: string;
  slug: string;
  timestamp?: string;
}

const FeedItem: React.FC<FeedItemProps> = ({ imageUrl, title, slug, timestamp }) => {
  return (
    <Link to={`/articles/${slug}`} className="block group">
      <article className="flex space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200">
        <div className="flex-shrink-0">
          <img 
            src={imageUrl} 
            alt={title}
            className="w-16 h-12 object-cover rounded transition-transform duration-200 group-hover:scale-105"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h4>
          {timestamp && (
            <p className="text-xs text-muted-foreground mt-1">
              {timestamp}
            </p>
          )}
        </div>
      </article>
    </Link>
  );
};

export default FeedItem;
