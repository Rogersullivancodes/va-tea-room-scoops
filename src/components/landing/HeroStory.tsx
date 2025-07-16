
import React from 'react';
import { Link } from 'react-router-dom';

interface HeroStoryProps {
  imageUrl: string;
  title: string;
  slug: string;
  excerpt?: string;
}

const HeroStory: React.FC<HeroStoryProps> = ({ imageUrl, title, slug, excerpt }) => {
  return (
    <Link to={`/articles/${slug}`} className="block group">
      <article className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02]">
        <div className="aspect-video relative">
          <img 
            src={imageUrl} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
              {title}
            </h1>
            {excerpt && (
              <p className="text-white/90 text-sm line-clamp-2">
                {excerpt}
              </p>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
};

export default HeroStory;
