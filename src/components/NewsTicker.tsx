
import React, { useState, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Pause, Play, RefreshCw } from 'lucide-react';
import { useNews } from '@/hooks/useNews';
import { format } from 'date-fns';

const NewsTicker: React.FC = () => {
  const { articles, fetchMoreNews } = useNews();
  const [isPaused, setIsPaused] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Convert news articles to ticker format
  const tickerData = articles.slice(0, 8).map((article, index) => ({
    id: index + 1,
    source: article.source,
    content: article.title,
    timestamp: format(new Date(article.published_at), 'h\'h\' \'ago\'')
  }));

  // Handle refresh action
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await fetchMoreNews();
    } catch (error) {
      console.error('Error refreshing news:', error);
    }
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  // The animation class depends on the paused state
  const animationClass = isPaused ? '' : 'animate-slow-marquee';

  // Fallback data if no articles available
  const fallbackData = [
    { id: 1, source: 'Virginia Mercury', content: 'Loading latest Virginia political news...', timestamp: 'now' },
  ];

  const displayData = tickerData.length > 0 ? tickerData : fallbackData;

  return (
    <div className="bg-gradient-to-r from-maroon to-navy text-white py-5 overflow-hidden relative group sticky top-0 z-20 shadow-md">
      <div className="container mx-auto flex items-center relative">
        <div className="hidden md:flex items-center space-x-2 bg-black/30 px-4 py-2 rounded-md mr-4">
          <span className="font-bold text-gold text-base">LIVE NEWS</span>
          <span className="animate-pulse h-3 w-3 bg-destructive rounded-full"></span>
        </div>
        
        <ScrollArea className="w-full overflow-hidden">
          <div className={`flex whitespace-nowrap ${animationClass}`}>
            {/* Duplicate the items to create a seamless loop */}
            {[...displayData, ...displayData].map((item, index) => (
              <div 
                key={`${item.id}-${index}`} 
                className="inline-flex items-center mx-12 md:mx-20 hover:bg-white/20 px-5 py-3 rounded-lg transition-colors duration-300"
              >
                <span className="font-bold text-gold text-lg md:text-xl">{item.source}:</span>
                <span className="ml-3 text-base md:text-lg">{item.content}</span>
                <span className="ml-3 text-sm text-white/80">{item.timestamp}</span>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        {/* Controls - only visible on hover on desktop */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center space-x-3 bg-black/40 backdrop-blur-sm p-3 rounded-lg">
          <button 
            onClick={() => setIsPaused(!isPaused)} 
            className="p-2 hover:bg-white/20 rounded-md transition-colors"
            aria-label={isPaused ? "Play ticker" : "Pause ticker"}
          >
            {isPaused ? <Play size={20} /> : <Pause size={20} />}
          </button>
          <button 
            onClick={handleRefresh} 
            className={`p-2 hover:bg-white/20 rounded-md transition-colors ${isRefreshing ? 'animate-spin' : ''}`}
            aria-label="Refresh ticker"
          >
            <RefreshCw size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;
