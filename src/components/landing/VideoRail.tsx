
import React from 'react';
import { Link } from 'react-router-dom';
import { Play } from 'lucide-react';

interface VideoItem {
  imageUrl: string;
  title: string;
  slug: string;
  duration?: string;
}

interface VideoRailProps {
  items: VideoItem[];
}

const VideoRail: React.FC<VideoRailProps> = ({ items }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-foreground">Video Highlights</h2>
      <div className="space-y-4">
        {items.map((item, index) => (
          <Link key={index} to={`/articles/${item.slug}`} className="block group">
            <article className="relative overflow-hidden rounded-lg">
              <div className="aspect-video relative">
                <img 
                  src={item.imageUrl} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 text-primary-foreground ml-1" fill="currentColor" />
                  </div>
                </div>
                {item.duration && (
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {item.duration}
                  </div>
                )}
              </div>
              <div className="p-3">
                <h4 className="text-sm font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h4>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default VideoRail;
