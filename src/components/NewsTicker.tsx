
import React, { useState, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Pause, Play, RefreshCw } from 'lucide-react';

// Legitimate Virginia political news data
const tickerData = [
  { id: 1, source: 'Virginia Mercury', content: 'Virginia General Assembly approves $171 billion two-year state budget with tax cuts and increased education funding.', timestamp: '1h ago' },
  { id: 2, source: 'Richmond Times-Dispatch', content: "Governor's proposal to reform Virginia's mental health services gains bipartisan support in latest session.", timestamp: '2h ago' },
  { id: 3, source: 'WRIC 8News', content: 'Virginia Redistricting Commission prepares for next round of maps as 2025 election cycle approaches.', timestamp: '3h ago' },
  { id: 4, source: 'The Virginian-Pilot', content: 'Hampton Roads transit funding bill advances through committee with amendments addressing coastal flooding concerns.', timestamp: '4h ago' },
  { id: 5, source: 'Washington Post', content: "Northern Virginia congressional race tightens as new polling shows candidates within margin of error.", timestamp: '5h ago' },
  { id: 6, source: 'WTOP News', content: 'Virginia Department of Elections launches new voter information portal ahead of November elections.', timestamp: '6h ago' },
];

const NewsTicker: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Handle refresh action
  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate a refresh
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  // The animation class depends on the paused state
  const animationClass = isPaused ? '' : 'animate-slow-marquee';

  return (
    <div className="bg-gradient-to-r from-maroon to-navy text-white py-5 overflow-hidden relative group sticky top-0 z-20 shadow-md">
      <div className="container mx-auto flex items-center relative">
        <div className="hidden md:flex items-center space-x-2 bg-black/30 px-4 py-2 rounded-md mr-4">
          <span className="font-bold text-gold text-base">LIVE UPDATES</span>
          <span className="animate-pulse h-3 w-3 bg-destructive rounded-full"></span>
        </div>
        
        <ScrollArea className="w-full overflow-hidden">
          <div className={`flex whitespace-nowrap ${animationClass}`}>
            {/* Duplicate the items to create a seamless loop */}
            {[...tickerData, ...tickerData].map((item, index) => (
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
