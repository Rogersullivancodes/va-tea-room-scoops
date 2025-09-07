
import React from 'react';

const NewsTicker: React.FC = () => {
  const newsItems = [
    "BREAKING: Governor's approval rating drops to new low amid scandal",
    "Senator spotted at exclusive fundraiser despite campaign finance promises",
    "Leaked emails reveal behind-the-scenes political maneuvering",
    "Poll shows unexpected surge for underdog candidate",
    "Capitol Hill aide's social media gaffe goes viral"
  ];

  return (
    <div className="bg-primary text-primary-foreground py-6 overflow-hidden border-b border-primary/20">
      <div className="relative">
        <div className="flex animate-marquee whitespace-nowrap">
          {newsItems.map((item, index) => (
            <span key={index} className="mx-12 text-lg font-bold">
              🔥 {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;
