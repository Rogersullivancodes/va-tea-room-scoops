// src/components/landing/HeroStory.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface Story {
  imageUrl: string;
  title: string;
  slug: string;
}

export const HeroStory: React.FC<{ story: Story }> = ({ story }) => {
  return (
    <article className="border-b-4 border-red-600 pb-4">
      <Link to={`/articles/${story.slug}`}>
        <img src={story.imageUrl} alt={story.title} className="w-full h-auto object-cover mb-4" />
       <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white hover:text-red-600 transition-colors uppercase font-oswald tracking-tight">
         {story.title}
        </h1>
      </Link>
    </article>
  );
};
