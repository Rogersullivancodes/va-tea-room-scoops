// src/components/landing/VideoRail.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface Video {
  imageUrl: string;
  title: string;
  slug: string;
}

export const VideoRail: React.FC<{ videos: Video[] }> = ({ videos }) => {
  return (
    //...
<aside className="bg-gray-100 dark:bg-gray-900 p-4">
  <h2 className="text-2xl font-bold text-red-600 mb-4 border-b-2 border-red-600 pb-2 font-oswald uppercase">
    HOT VIDEOS
  </h2>
  <div className="space-y-4">
//... 
    {videos.map(video => (
          <Link key={video.slug} to={`/articles/${video.slug}`} className="block group">
            <div className="relative">
              <img src={video.imageUrl} alt={video.title} className="w-full h-auto" />
              <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-0 transition-all"></div>
            </div>
            <h3 className="mt-2 font-semibold text-gray-900 dark:text-white group-hover:underline">{video.title}</h3>
          </Link>
        ))}
      </div>
    </aside>
  );
};
