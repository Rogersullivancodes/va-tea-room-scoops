// src/pages/SplashPage.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SplashPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-black overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-30 animate-bounce"></div>
        <div className="absolute bottom-32 left-20 w-40 h-40 bg-gradient-to-r from-orange-500 to-red-500 rounded-full opacity-15 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-gradient-to-r from-green-500 to-teal-500 rounded-full opacity-25 animate-bounce"></div>
        
        {/* Geometric Shapes */}
        <div className="absolute top-32 left-1/4 w-16 h-16 border-2 border-yellow-400 opacity-30 animate-spin transform rotate-45"></div>
        <div className="absolute bottom-40 right-1/3 w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 opacity-40 transform rotate-12 animate-pulse"></div>
        
        {/* Floating Lines */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-30"></div>
        <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-20"></div>
      </div>
      
      {/* Main Text */}
      <div className="relative z-10 text-center px-4">
        <h1 className="font-extrabold text-white animate-fade-in">
          <div className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl mb-2 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent animate-pulse">
            CRABS
          </div>
          <div className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl mb-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent animate-pulse">
            FRIED
          </div>
          <div className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl bg-gradient-to-r from-green-400 via-teal-500 to-blue-500 bg-clip-text text-transparent animate-pulse">
            POLITICALLY
          </div>
        </h1>
        
        {/* Subtitle */}
        <p className="text-sm sm:text-lg md:text-xl text-white/70 mt-4 animate-fade-in">
          Where Politics Gets Served Hot
        </p>
      </div>
      
      {/* Loading Animation */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-3 h-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
      </div>
    </div>
  );
};

export default SplashPage; // This line is critical.
