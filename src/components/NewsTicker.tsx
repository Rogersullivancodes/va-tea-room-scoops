
import React, { useState, useEffect } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Pause, Play, RefreshCw } from 'lucide-react';

// Mock data for the ticker (simulating tweets)
const tickerData = [
  { id: 1, source: '@vademocrats', content: 'We stand united against corruption.', timestamp: '2h ago' },
  { id: 2, source: '@VASenateGOP', content: 'New poll shows swing in 6 key districts…', timestamp: '3h ago' },
  { id: 3, source: '@RichmondTimes', content: 'Lobbyists spent $1.2M last quarter in VA legislature.', timestamp: '4h ago' },
  { id: 4, source: '@VACapitolInsider', content: 'Speaker cancels tomorrow\'s session amid controversy.', timestamp: '6h ago' },
  { id: 5, source: '@BlueVA', content: 'Breaking: New endorsement in the 7th district race.', timestamp: '7h ago' },
  { id: 6, source: '@PoliticsBrief', content: 'Governor approval rating drops 5 points after budget veto.', timestamp: '9h ago' },
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
  const animationClass = isPaused ? '' : 'animate-marquee';

  return (
    <div className="bg-gradient-to-r from-maroon to-navy text-white py-3 overflow-hidden relative group">
      <div className="container mx-auto flex items-center relative">
        <div className="hidden md:flex items-center space-x-2 bg-black/20 px-3 py-1 rounded-md mr-4">
          <span className="font-bold text-gold text-sm">LIVE UPDATES</span>
          <span className="animate-pulse h-2 w-2 bg-destructive rounded-full"></span>
        </div>
        
        <ScrollArea className="w-full overflow-hidden">
          <div className={`flex whitespace-nowrap ${animationClass}`}>
            {/* Duplicate the items to create a seamless loop */}
            {[...tickerData, ...tickerData].map((item, index) => (
              <div 
                key={`${item.id}-${index}`} 
                className="inline-flex items-center mx-8 md:mx-12 hover:bg-white/10 px-3 py-1 rounded transition-colors duration-300"
              >
                <span className="font-bold text-gold">{item.source}:</span>
                <span className="ml-2">{item.content}</span>
                <span className="ml-2 text-xs text-white/70">{item.timestamp}</span>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        {/* Controls - only visible on hover on desktop */}
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center space-x-2 bg-black/30 backdrop-blur-sm p-1 rounded">
          <button 
            onClick={() => setIsPaused(!isPaused)} 
            className="p-1 hover:bg-white/20 rounded transition-colors"
            aria-label={isPaused ? "Play ticker" : "Pause ticker"}
          >
            {isPaused ? <Play size={16} /> : <Pause size={16} />}
          </button>
          <button 
            onClick={handleRefresh} 
            className={`p-1 hover:bg-white/20 rounded transition-colors ${isRefreshing ? 'animate-spin' : ''}`}
            aria-label="Refresh ticker"
          >
            <RefreshCw size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;
