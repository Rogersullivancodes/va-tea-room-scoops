
import React, { useState } from 'react';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/ThemeProvider';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white dark:bg-slate-900 shadow-md sticky top-0 z-50 transition-colors">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center">
              <span className="text-2xl font-bold text-red-700 dark:text-red-400">
                Crabs<span className="text-slate-800 dark:text-slate-200">Fried</span>
                <span className="text-red-600 dark:text-red-500">Politically</span>
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#tea-drops" className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 font-medium transition-colors">Political Bites</a>
            <a href="#scandals" className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 font-medium transition-colors">Scandals</a>
            <a href="#election-watch" className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 font-medium transition-colors">Election Watch</a>
            <a href="#submit-tea" className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 font-medium transition-colors">Submit Story</a>
            <a href="#about" className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 font-medium transition-colors">About</a>
            
            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400"
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-gray-700 dark:text-gray-300"
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle Menu">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 py-2 px-4 shadow-lg animate-fade-in border-t dark:border-slate-700">
          <div className="flex flex-col space-y-4">
            <a href="#tea-drops" className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 font-medium py-2 transition-colors" onClick={toggleMenu}>Political Bites</a>
            <a href="#scandals" className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 font-medium py-2 transition-colors" onClick={toggleMenu}>Scandals</a>
            <a href="#election-watch" className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 font-medium py-2 transition-colors" onClick={toggleMenu}>Election Watch</a>
            <a href="#submit-tea" className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 font-medium py-2 transition-colors" onClick={toggleMenu}>Submit Story</a>
            <a href="#about" className="text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 font-medium py-2 transition-colors" onClick={toggleMenu}>About</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
