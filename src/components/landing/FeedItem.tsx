// src/components/landing/FeedItem.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface Item {
  imageUrl: string;
  title: string;
  slug: string;
}

export const FeedItem: React.FC<{ item: Item }> = ({ item }) => {
  return (
    <article className="flex items-center space-x-3 pb-4 border-b border-gray-200 dark:border-gray-800">
      <Link to={`/articles/${item.slug}`} className="flex-shrink-0">
        <img src={item.imageUrl} alt="" className="w-24 h-auto object-cover" />
      </Link>
      <div>
        <Link to={`/articles/${item.slug}`}>
          <h3 className="font-semibold text-gray-900 dark:text-white hover:underline">{item.title}</h3>
        </Link>
      </div>
    </article>
  );
};
