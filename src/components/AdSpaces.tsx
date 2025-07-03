import React, { useState, useEffect } from 'react';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

const AdSpaces: React.FC = () => {
  // Data for the new dynamic banner
  const bannerAds = [
    {
      id: 'banner-dynamic-1',
      title: 'Virginia Tourism: Explore Historic Routes',
      description: 'From the Wilderness Road to the Crooked Road, discover the paths that shaped a nation.',
      cta: 'Plan Your Trip',
      bgColor: 'bg-gradient-to-r from-green-600 to-blue-600',
      textColor: 'text-white'
    },
    {
      id: 'banner-dynamic-2',
      title: 'Advanced Political Analytics Platform',
      description: 'Track voter sentiment and predict election outcomes with our AI-powered platform.',
      cta: 'Start Free Trial',
      bgColor: 'bg-gradient-to-r from-purple-600 to-indigo-700',
      textColor: 'text-white'
    },
    {
      id: 'banner-dynamic-3',
      title: 'Political Legal Services in Virginia',
      description: 'Expert legal representation for campaign finance, election law, and political compliance.',
      cta: 'Contact Our Team',
      bgColor: 'bg-gradient-to-r from-red-700 to-blue-800',
      textColor: 'text-white'
    }
  ];

  const [currentBanner, setCurrentBanner] = useState(0);

  // Effect to handle the auto-rotation of the banner
  useEffect(() => {
    const bannerTimer = setInterval(() => {
      setCurrentBanner((prevBanner) => (prevBanner + 1) % bannerAds.length);
    }, 5000); // Change banner every 5 seconds

    return () => clearInterval(bannerTimer);
  }, [bannerAds.length]);
  
  const nextBanner = () => {
      setCurrentBanner((prevBanner) => (prevBanner + 1) % bannerAds.length);
  }
  
  const prevBanner = () => {
      setCurrentBanner((prevBanner) => (prevBanner - 1 + bannerAds.length) % bannerAds.length);
  }

  return (
    <>
      {/* Sidebar Ad */}
      <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-6">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">SPONSORED</p>
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded">
          <h4 className="font-bold mb-2">Political Campaign Management</h4>
          <p className="text-sm mb-4">Professional campaign services for Virginia candidates. Win with data-driven strategies.</p>
          <button className="bg-white text-blue-600 px-4 py-2 rounded text-sm font-semibold hover:bg-gray-100 transition-colors">
            Learn More <ExternalLink className="inline h-3 w-3 ml-1" />
          </button>
        </div>
      </div>

      {/* --- REPLACEMENT: Dynamic Banner Ad --- */}
      <div className="container mx-auto mb-8 relative">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 text-center">ADVERTISEMENT</p>
        <div className="relative overflow-hidden rounded-lg">
          {/* Banners container */}
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentBanner * 100}%)` }}
          >
            {bannerAds.map((ad) => (
              <div key={ad.id} className={`w-full flex-shrink-0 p-8 text-center ${ad.bgColor} ${ad.textColor}`}>
                <h3 className="text-2xl font-bold mb-3">{ad.title}</h3>
                <p className="text-lg mb-4">{ad.description}</p>
                <button className="bg-white/90 hover:bg-white text-gray-800 px-6 py-3 rounded-lg font-bold transition-colors">
                  {ad.cta}
                </button>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <button onClick={prevBanner} className="absolute top-1/2 left-3 -translate-y-1/2 bg-black/30 hover:bg-black/50 p-2 rounded-full text-white z-10">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button onClick={nextBanner} className="absolute top-1/2 right-3 -translate-y-1/2 bg-black/30 hover:bg-black/50 p-2 rounded-full text-white z-10">
            <ChevronRight className="h-6 w-6" />
          </button>
          
          {/* Navigation Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
            {bannerAds.map((_, index) => (
              <button 
                key={index}
                onClick={() => setCurrentBanner(index)}
                className={`h-2 w-2 rounded-full ${currentBanner === index ? 'bg-white' : 'bg-white/50'} hover:bg-white transition-colors`} 
              />
            ))}
          </div>
        </div>
      </div>

      {/* Sponsored Content Block */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 mb-6">
        <div className="flex items-start">
          <div className="flex-1">
            <p className="text-xs text-yellow-600 dark:text-yellow-400 font-semibold mb-1">SPONSORED CONTENT</p>
            <h5 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              Political Consulting Firm
            </h5>
            <p className="text-gray-600 dark:text-gray-300 mb-3">
              Data-driven strategies, polling analysis, and campaign optimization for Virginia political candidates.
            </p>
            <button className="text-yellow-600 dark:text-yellow-400 font-semibold hover:underline">
              Get Your Free Consultation →
            </button>
          </div>
        </div>
      </div>
      
      {/* Native Ad in Content */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
        <div className="flex items-center mb-3">
          <span className="text-xs bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-200 px-2 py-1 rounded font-semibold">
            PROMOTED
          </span>
        </div>
        <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
          Advanced Political Analytics Platform
        </h4>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Track voter sentiment, analyze campaign performance, and predict election outcomes with our AI-powered platform trusted by 500+ campaigns.
        </p>
        <div className="flex space-x-3">
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded font-semibold">
            Start Free Trial
          </button>
          <button className="border border-purple-600 text-purple-600 dark:text-purple-400 px-4 py-2 rounded font-semibold hover:bg-purple-50 dark:hover:bg-purple-900/30">
            Watch Demo
          </button>
        </div>
      </div>
    </>
  );
};

export default AdSpaces;
