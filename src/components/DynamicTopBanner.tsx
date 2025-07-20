// src/components/DynamicTopBanner.tsx
import React, { useState, useEffect } from 'react';
import { useNews } from '@/hooks/useNews';
import { useArticles } from '@/hooks/useArticles';
import { Play, Pause, Volume2 } from 'lucide-react';
import { Button } from './ui/button';

const DynamicTopBanner: React.FC = () => {
  const [currentHeadlineIndex, setCurrentHeadlineIndex] = useState(0);
  const [isVideoMode, setIsVideoMode] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const { articles: newsArticles, loading: newsLoading } = useNews();
  const { articles: submittedArticles, loading: articlesLoading } = useArticles();

  // Combine news and submitted articles for display
  const allArticles = [
    ...newsArticles.slice(0, 3), // Top 3 news articles
    ...submittedArticles.slice(0, 2) // Top 2 submitted articles
  ];
  
  const loading = newsLoading && articlesLoading;

  useEffect(() => {
    if (allArticles.length > 0) {
      const timer = setInterval(() => {
        setCurrentHeadlineIndex((prev) => (prev + 1) % allArticles.length);
      }, 8000); // Change headline every 8 seconds (longer for video mode)

      return () => clearInterval(timer);
    }
  }, [allArticles.length]);

  if (loading || allArticles.length === 0) {
    return (
      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white text-center py-8">
        <div className="container mx-auto px-4">
          <p className="text-xl font-bold animate-pulse">
            🔥 Loading Breaking Political News...
          </p>
        </div>
      </div>
    );
  }

  const currentHeadline = allArticles[currentHeadlineIndex];
  const isSubmittedArticle = submittedArticles.some(article => article.id === currentHeadline.id);

  const toggleVideoMode = () => {
    setIsVideoMode(!isVideoMode);
    setIsPlaying(false);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 bg-black/10">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-4">
        {isVideoMode ? (
          // Virginia Politics Video Mode
          <div className="py-8 text-center">
            <div className="bg-black/20 backdrop-blur-sm rounded-lg p-6 max-w-5xl mx-auto">
              <div className="bg-black rounded-lg aspect-video mb-4 relative overflow-hidden">
                <iframe 
                  width="100%" 
                  height="100%" 
                  src={`https://www.youtube.com/embed/UZiGMrAY4JE?autoplay=${isPlaying ? 1 : 0}&controls=1&rel=0&modestbranding=1`}
                  title="Virginia's 2025 election viewed as barometer for Trump administration"
                  frameBorder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowFullScreen
                  className="rounded-lg"
                ></iframe>
              </div>
              <h2 className="text-xl font-bold mb-2">Virginia's 2025 Election: A Political Barometer</h2>
              <p className="text-white/80 mb-4 text-sm">
                Watch live coverage of Virginia's gubernatorial race - viewed nationally as a key indicator for the Trump administration
              </p>
              <div className="flex items-center justify-center gap-4">
                <Button 
                  onClick={togglePlay}
                  variant={isPlaying ? "secondary" : "outline"}
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                  {isPlaying ? 'Pause' : 'Play'}
                </Button>
                <Button 
                  onClick={toggleVideoMode}
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  Back to News
                </Button>
              </div>
            </div>
          </div>
        ) : (
          // News Headlines Mode
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-lg md:text-xl font-bold">
                  <span className={`${isSubmittedArticle ? 'bg-blue-400' : 'bg-yellow-400'} text-black px-3 py-1 rounded mr-3 animate-pulse`}>
                    {isSubmittedArticle ? '📝 COMMUNITY' : '🔥 BREAKING'}
                  </span>
                  {currentHeadline.title}
                </p>
                <p className="text-sm text-white/80 mt-1">
                  {isSubmittedArticle 
                    ? `Community Article • ${new Date(currentHeadline.published_at || currentHeadline.created_at).toLocaleDateString()}`
                    : `Source: ${(currentHeadline as any).source || 'News'} • ${new Date(currentHeadline.published_at).toLocaleDateString()}`
                  }
                </p>
              </div>
              <div className="ml-4 flex gap-2">
                <Button 
                  onClick={toggleVideoMode}
                  size="sm"
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  <Volume2 className="w-4 h-4 mr-1" />
                  Video
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DynamicTopBanner;