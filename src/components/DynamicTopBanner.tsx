// src/components/DynamicTopBanner.tsx
import React, { useState, useEffect } from 'react';

const DynamicTopBanner: React.FC = () => {
  const [showAd, setShowAd] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAd(true);
    }, 15000); // 15000 milliseconds = 15 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`bg-yellow-400 text-black text-center p-3 transition-opacity duration-1000 ${
        showAd ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {showAd && (
        <p className="font-semibold">
          <span className="font-bold text-red-700 mr-2">[SPONSORED]</span>
          Tired of the political noise? So are we. That's why we fry it.
        </p>
      )}
    </div>
  );
};

export default DynamicTopBanner;
