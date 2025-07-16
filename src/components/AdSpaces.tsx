
import React, { useState, useEffect } from 'react';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

const AdSpaces: React.FC = () => {
  // Data for the dynamic banner with enhanced effects
  const bannerAds = [
    {
      id: 'banner-dynamic-1',
      title: 'Virginia Tourism: Explore Historic Routes',
      description: 'From the Wilderness Road to the Crooked Road, discover the paths that shaped a nation.',
      cta: 'Plan Your Trip',
      bgColor: 'bg-gradient-to-r from-green-600 via-emerald-500 to-blue-600',
      textColor: 'text-white',
      accent: 'emerald'
    },
    {
      id: 'banner-dynamic-2',
      title: 'Advanced Political Analytics Platform',
      description: 'Track voter sentiment and predict election outcomes with our AI-powered platform.',
      cta: 'Start Free Trial',
      bgColor: 'bg-gradient-to-r from-purple-600 via-indigo-500 to-indigo-700',
      textColor: 'text-white',
      accent: 'purple'
    },
    {
      id: 'banner-dynamic-3',
      title: 'Political Legal Services in Virginia',
      description: 'Expert legal representation for campaign finance, election law, and political compliance.',
      cta: 'Contact Our Team',
      bgColor: 'bg-gradient-to-r from-red-700 via-rose-600 to-blue-800',
      textColor: 'text-white',
      accent: 'red'
    }
  ];

  const [currentBanner, setCurrentBanner] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [progress, setProgress] = useState(0);

  // Auto-rotation with progress indicator
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + 2; // 2% every 100ms = 5 seconds total
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, [currentBanner]);

  useEffect(() => {
    const bannerTimer = setInterval(() => {
      setProgress(0);
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentBanner((prevBanner) => (prevBanner + 1) % bannerAds.length);
        setIsAnimating(false);
      }, 300);
    }, 5000);

    return () => clearInterval(bannerTimer);
  }, [bannerAds.length]);
  
  const nextBanner = () => {
    setProgress(0);
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentBanner((prevBanner) => (prevBanner + 1) % bannerAds.length);
      setIsAnimating(false);
    }, 300);
  }
  
  const prevBanner = () => {
    setProgress(0);
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentBanner((prevBanner) => (prevBanner - 1 + bannerAds.length) % bannerAds.length);
      setIsAnimating(false);
    }, 300);
  }

  const currentAd = bannerAds[currentBanner];

  return (
    <>
      {/* Sidebar Ad */}
      <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-6">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">SPONSORED</p>
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 animate-pulse"></div>
          <div className="relative z-10">
            <h4 className="font-bold mb-2">Political Campaign Management</h4>
            <p className="text-sm mb-4">Professional campaign services for Virginia candidates. Win with data-driven strategies.</p>
            <button className="bg-white text-blue-600 px-4 py-2 rounded text-sm font-semibold hover:bg-gray-100 transition-all duration-300 hover:scale-105">
              Learn More <ExternalLink className="inline h-3 w-3 ml-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Dynamic Banner Ad */}
      <div className="container mx-auto mb-8 relative">
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 text-center">ADVERTISEMENT</p>
        <div className="relative overflow-hidden rounded-lg shadow-2xl">
          {/* Progress Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-black/20 z-20">
            <div 
              className="h-full bg-white/80 transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Enhanced Banner Container */}
          <div className="relative">
            <div
              className={`transition-all duration-500 ease-in-out ${isAnimating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}
            >
              <div className={`w-full p-8 text-center ${currentAd.bgColor} ${currentAd.textColor} relative overflow-hidden`}>
                {/* Animated Background Elements */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-4 left-4 w-16 h-16 bg-white/30 rounded-full animate-float"></div>
                  <div className="absolute bottom-4 right-4 w-12 h-12 bg-white/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
                  <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-white/25 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
                </div>
                
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-3 animate-fade-in">{currentAd.title}</h3>
                  <p className="text-lg mb-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>{currentAd.description}</p>
                  <button className="bg-white/90 hover:bg-white text-gray-800 px-6 py-3 rounded-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-lg animate-fade-in" style={{ animationDelay: '0.4s' }}>
                    {currentAd.cta}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button 
            onClick={prevBanner} 
            className="absolute top-1/2 left-3 -translate-y-1/2 bg-black/30 hover:bg-black/50 p-2 rounded-full text-white z-10 transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button 
            onClick={nextBanner} 
            className="absolute top-1/2 right-3 -translate-y-1/2 bg-black/30 hover:bg-black/50 p-2 rounded-full text-white z-10 transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          
          {/* Enhanced Navigation Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
            {bannerAds.map((_, index) => (
              <button 
                key={index}
                onClick={() => {
                  setProgress(0);
                  setCurrentBanner(index);
                }}
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  currentBanner === index 
                    ? 'bg-white scale-125' 
                    : 'bg-white/50 hover:bg-white/75'
                }`} 
              />
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Sponsored Content Block */}
      <div className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border-l-4 border-yellow-400 p-4 mb-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-200/10 to-amber-200/10 animate-pulse"></div>
        <div className="flex items-start relative z-10">
          <div className="flex-1">
            <p className="text-xs text-yellow-600 dark:text-yellow-400 font-semibold mb-1">SPONSORED CONTENT</p>
            <h5 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              Political Consulting Firm
            </h5>
            <p className="text-gray-600 dark:text-gray-300 mb-3">
              Data-driven strategies, polling analysis, and campaign optimization for Virginia political candidates.
            </p>
            <button className="text-yellow-600 dark:text-yellow-400 font-semibold hover:underline transition-all duration-300 hover:scale-105">
              Get Your Free Consultation →
            </button>
          </div>
        </div>
      </div>
      
      {/* Enhanced Native Ad */}
      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-6 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-purple-900/20 dark:via-blue-900/20 dark:to-indigo-900/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-200/10 to-blue-200/10 animate-pulse"></div>
        <div className="relative z-10">
          <div className="flex items-center mb-3">
            <span className="text-xs bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-200 px-2 py-1 rounded font-semibold animate-pulse">
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
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded font-semibold transition-all duration-300 hover:scale-105">
              Start Free Trial
            </button>
            <button className="border border-purple-600 text-purple-600 dark:text-purple-400 px-4 py-2 rounded font-semibold hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-all duration-300 hover:scale-105">
              Watch Demo
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdSpaces;
