// src/components/DynamicTopBanner.tsx
import React, { useState, useEffect } from 'react';
import { useNews } from '@/hooks/useNews';

const DynamicTopBanner: React.FC = () => {
  const [currentHeadlineIndex, setCurrentHeadlineIndex] = useState(0);
  const { articles, loading } = useNews();

  useEffect(() => {
    if (articles.length > 0) {
      const timer = setInterval(() => {
        setCurrentHeadlineIndex((prev) => (prev + 1) % articles.length);
      }, 5000); // Change headline every 5 seconds

      return () => clearInterval(timer);
    }
  }, [articles.length]);

  if (loading || articles.length === 0) {
    return (
      <div className="bg-primary text-primary-foreground text-center p-3">
        <p className="font-semibold">
          🔥 Loading latest political news...
        </p>
      </div>
    );
  }

  const currentHeadline = articles[currentHeadlineIndex];

  return (
    <div className="bg-primary text-primary-foreground text-center p-3 transition-all duration-1000">
      <p className="font-semibold">
        <span className="font-bold text-red-300 mr-2">🔥 BREAKING:</span>
        {currentHeadline.title}
      </p>
    </div>
  );
};

export default DynamicTopBanner;
