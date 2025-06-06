
import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-80"
          style={{
            backgroundImage: `url('/lovable-uploads/99f513e2-a0c1-437b-ab9a-d71ec82d9ea8.png')`
          }}
        ></div>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-red-900/80 mix-blend-multiply"></div>

      {/* Content */}
      <div className="relative container mx-auto h-full flex items-center px-4">
        <div className="max-w-3xl">
          <div className="bg-black/30 backdrop-blur-sm p-6 md:p-8 rounded-lg shadow-2xl border border-white/10">
            <div className="flex items-center mb-3">
              <span className="inline-block bg-red-600 text-white px-3 py-1 text-sm font-bold rounded mr-3">BREAKING</span>
              <span className="text-white/80 text-sm">June 4, 2025</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight font-serif tracking-wide">
              <span className="block mb-2">Virginia Legislature Debates</span>
              <span className="block mb-2 text-red-400">Historic Seafood Industry</span>
              <span className="block">Reform Bill</span>
            </h1>
            <p className="text-white/90 mb-6 text-lg leading-relaxed">
              Chesapeake Bay regulations spark heated political discussion as crab industry leaders meet with state officials
            </p>
            <div className="flex flex-wrap gap-3">
              <a 
                href="#full-story" 
                className="inline-flex items-center text-white bg-red-600 hover:bg-red-700 px-5 py-3 rounded-full font-bold transition-colors group"
              >
                Full Story
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
        <span className="text-red-400 font-semibold mr-2">SPONSORED:</span>
        <span>Subscribe to our premium newsletter for exclusive political insights</span>
        <a href="#subscribe" className="ml-2 underline text-red-400">Learn More</a>
      </div>
    </div>
  );
};

export default Hero;
