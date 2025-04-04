
import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative w-full h-[50vh] md:h-[60vh] overflow-hidden">
      {/* Background Video/Image with Glitch Effect */}
      <div className="absolute inset-0 bg-navy/50 animate-glitch">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1551854716-fd8a5e5ce949')] bg-cover bg-center opacity-50"></div>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-maroon/80 to-navy/80 mix-blend-multiply"></div>

      {/* Content */}
      <div className="relative container mx-auto h-full flex items-center px-4">
        <div className="max-w-3xl">
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
            <span className="inline-block bg-gold text-black px-3 py-1 text-sm font-bold rounded mb-2">EXCLUSIVE</span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4">
              Delegate Caught Fundraising at a Funeral?
            </h1>
            <a 
              href="#full-story" 
              className="inline-flex items-center text-white bg-maroon hover:bg-maroon/90 px-5 py-2 rounded-full font-bold transition-colors group"
            >
              Full Story 
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
