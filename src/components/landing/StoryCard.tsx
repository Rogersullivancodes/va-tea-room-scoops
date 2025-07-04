// src/components/landing/StoryCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface Story {
  imageUrl: string;
  title: string;
  slug: string;
}

export const StoryCard: React.FC<{ story: Story }> = ({ story }) => {
  return (
    <article>
      <Link to={`/articles/${story.slug}`} className="group">
        <img src={story.imageUrl} alt={story.title} className="w-full h-auto object-cover mb-2" />
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 group-hover:underline">
          {story.title}
        </h2>
      </Link>
    </article>
  );
};
