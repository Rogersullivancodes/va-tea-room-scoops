
import React from 'react';
import { Link } from 'react-router-dom';

interface StoryCardProps {
  imageUrl: string;
  title: string;
  slug: string;
  excerpt?: string;
}

const StoryCard: React.FC<StoryCardProps> = ({ imageUrl, title, slug, excerpt }) => {
  return (
    <Link to={`/articles/${slug}`} className="block group">
      <article className="bg-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02]">
        <div className="aspect-video relative">
          <img 
            src={imageUrl} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h3 className="font-bold text-lg text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          {excerpt && (
            <p className="text-muted-foreground text-sm line-clamp-2">
              {excerpt}
            </p>
          )}
        </div>
      </article>
    </Link>
  );
};

export default StoryCard;
