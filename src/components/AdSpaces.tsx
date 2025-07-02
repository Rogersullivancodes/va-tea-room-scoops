
import React, { useState, useEffect } from 'react';
import { ExternalLink, X } from 'lucide-react';

const AdSpaces: React.FC = () => {
  const [showFloatingAd, setShowFloatingAd] = useState(false);

  useEffect(() => {
    // Show floating ad after 10 seconds
    const timer = setTimeout(() => {
      setShowFloatingAd(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const ads = [
    {
      id: 'sidebar-1',
      title: 'Political Campaign Management',
      description: 'Professional campaign services for Virginia candidates',
      cta: 'Learn More',
      size: 'medium'
    },
    {
      id: 'banner-1',
      title: 'Virginia Law Firm - Political Legal Services',
      description: 'Expert legal representation for political matters',
      cta: 'Contact Us',
      size: 'large'
    },
    {
      id: 'sponsored-1',
      title: 'Sponsored: Political Consulting',
      description: 'Data-driven strategies for modern campaigns',
      cta: 'Get Quote',
      size: 'small'
    }
  ];

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

      {/* Banner Ad */}
      <div className="bg-gray-50 dark:bg-gray-800 py-8 px-4 text-center mb-8">
        <div className="container mx-auto">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">ADVERTISEMENT</p>
          <div className="bg-gradient-to-r from-red-700 to-blue-800 text-white p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-3">Virginia Law Firm - Political Legal Services</h3>
            <p className="text-lg mb-4">Expert legal representation for campaign finance, election law, and political compliance</p>
            <button className="bg-white text-red-700 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors">
              Contact Our Political Law Team
            </button>
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

      {/* Floating Video Ad */}
      {showFloatingAd && (
        <div className="fixed bottom-20 left-4 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-2xl z-40 border border-gray-200 dark:border-gray-700">
          <div className="relative">
            <button
              onClick={() => setShowFloatingAd(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 z-10"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="p-4">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">SPONSORED VIDEO</p>
              <div className="bg-gradient-to-br from-green-600 to-blue-600 h-40 rounded flex items-center justify-center text-white">
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                    <div className="w-0 h-0 border-l-4 border-l-white border-y-4 border-y-transparent ml-1"></div>
                  </div>
                  <p className="font-semibold">Virginia Tourism Board</p>
                  <p className="text-sm">Discover Political History</p>
                </div>
              </div>
              <button className="w-full mt-3 bg-green-600 hover:bg-green-700 text-white py-2 rounded font-semibold">
                Watch Full Video
              </button>
            </div>
          </div>
        </div>
      )}

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
