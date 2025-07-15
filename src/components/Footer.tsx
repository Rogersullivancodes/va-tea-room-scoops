
import React from 'react';
import { Mail, Twitter, Instagram, Facebook, Heart, Sparkles } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useAdmin } from '@/contexts/AdminContext';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const { isAuthenticated } = useAdmin();

  return (
    <footer className="bg-gradient-to-br from-navy via-slate-900 to-black dark:from-black dark:via-gray-900 dark:to-black text-white pt-16 pb-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-red-600/5 pointer-events-none"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-6 w-6 text-gold" />
              <h3 className="text-xl font-playfair font-bold text-gold">About CrabsFriedPolitically</h3>
            </div>
            <p className="text-white/80 mb-6 text-sm leading-relaxed">
              Serving Virginia's spiciest political gossip and news from the legislature, campaigns, and government—always with humor and integrity.
            </p>
            <div className="flex space-x-4">
              <a href="#twitter" className="text-white/70 hover:text-gold transition-all duration-300 hover:scale-110 p-2 rounded-full hover:bg-white/10">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#instagram" className="text-white/70 hover:text-gold transition-all duration-300 hover:scale-110 p-2 rounded-full hover:bg-white/10">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#facebook" className="text-white/70 hover:text-gold transition-all duration-300 hover:scale-110 p-2 rounded-full hover:bg-white/10">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="mailto:tips@crabsfriedpolitically.com" className="text-white/70 hover:text-gold transition-all duration-300 hover:scale-110 p-2 rounded-full hover:bg-white/10">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Political Categories */}
          <div className="space-y-6">
            <h3 className="text-xl font-playfair font-bold text-gold">Hot Political Content</h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#social-tea" className="text-white/80 hover:text-gold transition-colors duration-200 hover:translate-x-1 inline-block">Social Media Slips</a></li>
              <li><a href="#scandals" className="text-white/80 hover:text-gold transition-colors duration-200 hover:translate-x-1 inline-block">Scandals & Gaffes</a></li>
              <li><a href="#money-politics" className="text-white/80 hover:text-gold transition-colors duration-200 hover:translate-x-1 inline-block">Money in Politics</a></li>
              <li><a href="#election-watch" className="text-white/80 hover:text-gold transition-colors duration-200 hover:translate-x-1 inline-block">Election Coverage</a></li>
              <li><a href="#capitol-gossip" className="text-white/80 hover:text-gold transition-colors duration-200 hover:translate-x-1 inline-block">Capitol Gossip</a></li>
            </ul>
          </div>
          
          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-xl font-playfair font-bold text-gold">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="text-white/80 hover:text-gold transition-colors duration-200 hover:translate-x-1 inline-block">About Us</Link></li>
              <li><a href="#submit-tip" className="text-white/80 hover:text-gold transition-colors duration-200 hover:translate-x-1 inline-block">Submit a Tip</a></li>
              <li><a href="#privacy" className="text-white/80 hover:text-gold transition-colors duration-200 hover:translate-x-1 inline-block">Privacy Policy</a></li>
              <li><a href="#terms" className="text-white/80 hover:text-gold transition-colors duration-200 hover:translate-x-1 inline-block">Terms of Use</a></li>
              <li><Link to="/contact" className="text-white/80 hover:text-gold transition-colors duration-200 hover:translate-x-1 inline-block">Contact Us</Link></li>
              <li><Link to="/secure/admin" className="text-white/80 hover:text-gold transition-colors duration-200 hover:translate-x-1 inline-block">Admin Login</Link></li>
              {isAuthenticated && (
                <li><Link to="/admin/dashboard" className="text-white/80 hover:text-gold transition-colors duration-200 hover:translate-x-1 inline-block">Admin Dashboard</Link></li>
              )}
            </ul>
          </div>
          
          {/* Newsletter */}
          <div className="space-y-6">
            <h3 className="text-xl font-playfair font-bold text-gold">Get the Latest Delivered</h3>
            <p className="text-white/80 mb-6 text-sm leading-relaxed">
              Subscribe for the juiciest political stories right in your inbox.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent placeholder:text-white/40 text-white backdrop-blur-sm transition-all duration-200"
                required
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-gold to-yellow-500 hover:from-yellow-500 hover:to-gold text-black font-bold px-4 py-3 rounded-lg transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <Separator className="bg-white/20 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <p className="text-white/60 text-xs">
              &copy; {new Date().getFullYear()} CrabsFriedPolitically. All gossip rights reserved.
            </p>
            <Heart className="h-3 w-3 text-red-400" />
          </div>
          <p className="text-white/60 text-xs">
            For entertainment purposes. No crabs were harmed in the making of this website.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
