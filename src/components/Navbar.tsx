
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthButtons from './AuthButtons';
import ThemeToggle from './ThemeToggle';
import NotificationCenter from './NotificationCenter';
import SearchBar from './SearchBar';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white/95 dark:bg-black/95 shadow-xl border-b border-gray-200/50 dark:border-gray-800/50 sticky top-0 z-50 backdrop-blur-xl transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center space-x-2">
            <Link to="/" className="flex items-center group">
              <div className="relative">
                <img 
                  src="/lovable-uploads/99f513e2-a0c1-437b-ab9a-d71ec82d9ea8.png" 
                  alt="CrabsFriedPolitically"
                  className="h-9 sm:h-10 w-auto rounded-lg shadow-md group-hover:shadow-lg transition-shadow duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <span className="ml-3 text-2xl font-playfair font-extrabold bg-gradient-to-r from-navy via-primary to-red-600 dark:from-white dark:via-gold dark:to-red-400 bg-clip-text text-transparent tracking-wide hidden sm:block">
                CrabsFriedPolitically
              </span>
            </Link>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <SearchBar />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/articles">
              <Button variant="ghost" className="text-navy dark:text-gold font-semibold transition-all duration-200 hover:bg-primary/10 hover:scale-105 relative overflow-hidden group">
                <span className="relative z-10">Articles</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="ghost" className="text-navy dark:text-gold font-semibold transition-all duration-200 hover:bg-primary/10 hover:scale-105 relative overflow-hidden group">
                <span className="relative z-10">About</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="ghost" className="text-navy dark:text-gold font-semibold transition-all duration-200 hover:bg-primary/10 hover:scale-105 relative overflow-hidden group">
                <span className="relative z-10">Contact</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </Button>
            </Link>
            <Link to="/memberships">
              <Button variant="ghost" className="text-navy dark:text-gold font-semibold transition-all duration-200 hover:bg-primary/10 hover:scale-105 relative overflow-hidden group">
                <span className="relative z-10">Memberships</span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </Button>
            </Link>
            <div className="h-6 w-px bg-gray-300 dark:bg-gray-600 mx-2"></div>
            <ThemeToggle />
            <NotificationCenter />
            <AuthButtons />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <NotificationCenter />
            <Button variant="ghost" onClick={toggleMenu} className="focus:outline-none hover:bg-primary/10 transition-colors">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <SearchBar />
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden transition-all duration-300 animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/98 dark:bg-black/98 border-t border-gray-200/50 dark:border-gray-800/50 backdrop-blur-xl">
            <Link to="/articles" className="block">
              <Button variant="ghost" className="w-full justify-start text-navy dark:text-gold font-semibold hover:bg-primary/10 transition-all duration-200" onClick={() => setIsMenuOpen(false)}>
                Articles
              </Button>
            </Link>
            <Link to="/about" className="block">
              <Button variant="ghost" className="w-full justify-start text-navy dark:text-gold font-semibold hover:bg-primary/10 transition-all duration-200" onClick={() => setIsMenuOpen(false)}>
                About
              </Button>
            </Link>
            <Link to="/contact" className="block">
              <Button variant="ghost" className="w-full justify-start text-navy dark:text-gold font-semibold hover:bg-primary/10 transition-all duration-200" onClick={() => setIsMenuOpen(false)}>
                Contact
              </Button>
            </Link>
            <Link to="/memberships" className="block">
              <Button variant="ghost" className="w-full justify-start text-navy dark:text-gold font-semibold hover:bg-primary/10 transition-all duration-200" onClick={() => setIsMenuOpen(false)}>
                Memberships
              </Button>
            </Link>
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700 mt-4">
              <AuthButtons />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
