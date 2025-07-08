// src/pages/SplashPage.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SplashPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home');
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <h1 className="text-5xl md:text-8xl font-extrabold text-white animate-text-pop-in">
        CrabsFriedPolitically
      </h1>
    </div>
  );
};

export default SplashPage; // This line is critical.
