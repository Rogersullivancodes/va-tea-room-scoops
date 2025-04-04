
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center">
              <span className="text-2xl font-bold text-maroon">VA<span className="text-navy">Tea</span><span className="text-gold">Room</span></span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <a href="#tea-drops" className="text-gray-700 hover:text-maroon font-medium">Tea Drops</a>
            <a href="#scandals" className="text-gray-700 hover:text-maroon font-medium">Scandals</a>
            <a href="#election-watch" className="text-gray-700 hover:text-maroon font-medium">Election Watch</a>
            <a href="#submit-tea" className="text-gray-700 hover:text-maroon font-medium">Submit Tea</a>
            <a href="#about" className="text-gray-700 hover:text-maroon font-medium">About</a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle Menu">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-2 px-4 shadow-lg animate-fade-in">
          <div className="flex flex-col space-y-4">
            <a href="#tea-drops" className="text-gray-700 hover:text-maroon font-medium py-2" onClick={toggleMenu}>Tea Drops</a>
            <a href="#scandals" className="text-gray-700 hover:text-maroon font-medium py-2" onClick={toggleMenu}>Scandals</a>
            <a href="#election-watch" className="text-gray-700 hover:text-maroon font-medium py-2" onClick={toggleMenu}>Election Watch</a>
            <a href="#submit-tea" className="text-gray-700 hover:text-maroon font-medium py-2" onClick={toggleMenu}>Submit Tea</a>
            <a href="#about" className="text-gray-700 hover:text-maroon font-medium py-2" onClick={toggleMenu}>About</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
