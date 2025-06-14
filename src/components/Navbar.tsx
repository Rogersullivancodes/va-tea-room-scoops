
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
    <nav className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/99f513e2-a0c1-437b-ab9a-d71ec82d9ea8.png" 
                alt="CrabsFriedPolitically"
                className="h-8 w-auto"
              />
              <span className="ml-2 text-xl font-bold text-navy dark:text-white hidden sm:block">
                CrabsFriedPolitically
              </span>
            </Link>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:block flex-1 max-w-md mx-8">
            <SearchBar />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/articles">
              <Button variant="ghost">Articles</Button>
            </Link>
            <Link to="/about">
              <Button variant="ghost">About</Button>
            </Link>
            <Link to="/contact">
              <Button variant="ghost">Contact</Button>
            </Link>
            <Link to="/memberships">
              <Button variant="ghost">Memberships</Button>
            </Link>
            <ThemeToggle />
            <NotificationCenter />
            <AuthButtons />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <NotificationCenter />
            <Button variant="ghost" onClick={toggleMenu}>
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
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            <Link to="/articles" className="block">
              <Button variant="ghost" className="w-full justify-start" onClick={() => setIsMenuOpen(false)}>
                Articles
              </Button>
            </Link>
            <Link to="/about" className="block">
              <Button variant="ghost" className="w-full justify-start" onClick={() => setIsMenuOpen(false)}>
                About
              </Button>
            </Link>
            <Link to="/contact" className="block">
              <Button variant="ghost" className="w-full justify-start" onClick={() => setIsMenuOpen(false)}>
                Contact
              </Button>
            </Link>
            <Link to="/memberships" className="block">
              <Button variant="ghost" className="w-full justify-start" onClick={() => setIsMenuOpen(false)}>
                Memberships
              </Button>
            </Link>
            <div className="pt-4">
              <AuthButtons />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
