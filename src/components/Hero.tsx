
import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 animate-glitch">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555089548-3944694aa8e3')] bg-cover bg-center opacity-70"></div>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-maroon/90 to-navy/90 mix-blend-multiply"></div>

      {/* Content */}
      <div className="relative container mx-auto h-full flex items-center px-4">
        <div className="max-w-3xl">
          <div className="bg-black/20 backdrop-blur-sm p-6 md:p-8 rounded-lg shadow-2xl border border-white/10">
            <div className="flex items-center mb-3">
              <span className="inline-block bg-gold text-black px-3 py-1 text-sm font-bold rounded mr-3">EXCLUSIVE</span>
              <span className="text-white/80 text-sm">April 4, 2025</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
              Virginia Delegate Ethics Committee Launches Investigation into Campaign Finances
            </h1>
            <p className="text-white/90 mb-6 text-lg">
              Documents reveal potential violations during fundraising events in Richmond's wealthiest neighborhoods
            </p>
            <div className="flex flex-wrap gap-3">
              <a 
                href="#full-story" 
                className="inline-flex items-center text-white bg-maroon hover:bg-maroon/90 px-5 py-3 rounded-full font-bold transition-colors group"
              >
                Full Investigation 
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="#related-coverage" 
                className="inline-flex items-center text-white bg-black/40 hover:bg-black/60 px-5 py-3 rounded-full font-bold transition-colors"
              >
                Related Coverage
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Ad Banner */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-white text-center py-1 text-sm">
        <span className="text-gold font-semibold mr-2">SPONSORED:</span>
        <span>Subscribe to our premium newsletter for exclusive political insights</span>
        <a href="#subscribe" className="ml-2 underline text-gold">Learn More</a>
      </div>
    </div>
  );
};

export default Hero;
