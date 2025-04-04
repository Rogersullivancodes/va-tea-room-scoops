
import React from 'react';

// Mock data for the ticker
const tickerData = [
  { id: 1, source: '@vademocrats', content: 'We stand united against corruption.' },
  { id: 2, source: '@VASenateGOP', content: 'New poll shows swing in 6 key districts…' },
  { id: 3, source: '@RichmondTimes', content: 'Lobbyists spent $1.2M last quarter in VA legislature.' },
  { id: 4, source: '@VACapitolInsider', content: 'Speaker cancels tomorrow\'s session amid controversy.' },
  { id: 5, source: '@BlueVA', content: 'Breaking: New endorsement in the 7th district race.' },
  { id: 6, source: '@PoliticsBrief', content: 'Governor approval rating drops 5 points after budget veto.' },
];

const NewsTicker: React.FC = () => {
  return (
    <div className="bg-navy text-white py-2 overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee">
        {/* Duplicate the items to create a seamless loop */}
        {[...tickerData, ...tickerData].map((item, index) => (
          <div key={`${item.id}-${index}`} className="inline-flex items-center mx-8">
            <span className="font-bold text-gold">{item.source}:</span>
            <span className="ml-2">{item.content}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsTicker;
