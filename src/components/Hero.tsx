
import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative w-full h-[66vh] md:h-[72vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-red-900 via-slate-800 to-navy dark:from-black dark:via-neutral-900 dark:to-black">
      {/* Background with overlay */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-500"
          style={{
            backgroundImage: `url('/lovable-uploads/99f513e2-a0c1-437b-ab9a-d71ec82d9ea8.png')`,
            opacity: 0.60,
-           filter: 'blur(2px) grayscale(40%)'
+           filter: 'blur(2px) grayscale(40%)'
          }}
        />
-       <div className="absolute inset-0 bg-gradient-to-tr from-navy/95 to-red-900/80" />
+       <div className="absolute inset-0 bg-gradient-to-tr from-navy/95 to-red-900/80 dark:from-black/85 dark:to-black/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl w-full mx-auto px-4 flex items-center">
        <div className="backdrop-blur-md bg-white/10 dark:bg-black/30 border border-white/10 rounded-2xl shadow-xl p-7 md:p-10 animate-fade-in">
          <div className="flex items-center mb-4 space-x-3">
            <span className="inline-block bg-primary text-primary-foreground px-3 py-1 text-xs md:text-sm font-bold rounded uppercase tracking-wider">Breaking</span>
            <span className="text-white/70 text-xs md:text-sm">June 4, 2025</span>
          </div>
          <h1 className="font-playfair text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 md:mb-6 leading-tight drop-shadow headline">
            <span>Virginia Legislature Debates</span>
            <span className="block text-primary font-playfair font-bold text-2xl md:text-4xl tracking-tight mb-1">Historic Seafood Industry</span>
            <span className="block">Reform Bill</span>
          </h1>
          <p className="text-white/90 mb-8 md:mb-10 text-lg md:text-xl font-montserrat leading-relaxed">
            Chesapeake Bay regulations spark heated political discussion as crab industry leaders meet with state officials.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="#full-story"
              className="inline-flex items-center justify-center text-white bg-primary hover:bg-primary/90 px-6 py-3 rounded-lg font-semibold shadow-lg ring-1 ring-primary/30 transition-all duration-150 text-base md:text-lg group hover-scale"
            >
              Full Story
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-150" />
            </a>
            <a
              href="#related-coverage"
              className="inline-flex items-center justify-center text-primary bg-white/10 dark:bg-black/40 hover:bg-white/20 border border-primary/30 px-6 py-3 rounded-lg font-semibold transition-colors duration-150 text-base md:text-lg"
            >
              Related Coverage
            </a>
          </div>
        </div>
      </div>

      {/* Ad Banner */}
      <div className="absolute bottom-0 left-0 right-0 z-20 bg-navy/90 dark:bg-black/90 text-white text-center py-2 text-sm shadow-lg select-none">
        <span className="text-gold font-semibold mr-2">Sponsored:</span>
        <span>Subscribe to our premium newsletter for exclusive political insights</span>
        <a href="#subscribe" className="ml-2 underline text-gold hover:text-gold/90">Learn More</a>
      </div>
    </section>
  );
};

export default Hero;

