
import React from 'react';
import { Mail, Twitter, Instagram, Facebook } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useAdmin } from '@/contexts/AdminContext';

const Footer: React.FC = () => {
  const { isAuthenticated } = useAdmin();

  return (
    <footer className="bg-navy text-white pt-14 pb-8 text-base">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-playfair font-bold mb-4 text-gold">About CrabsFriedPolitically</h3>
            <p className="text-white/80 mb-4 text-sm">
              Serving Virginia's spiciest political gossip and news from the legislature, campaigns, and government—always with humor.
            </p>
            <div className="flex space-x-4">
              <a href="#twitter" className="text-white hover:text-gold transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#instagram" className="text-white hover:text-gold transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#facebook" className="text-white hover:text-gold transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="mailto:tips@crabsfriedpolitically.com" className="text-white hover:text-gold transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Political Categories */}
          <div>
            <h3 className="text-xl font-playfair font-bold mb-4 text-gold">Hot Political Content</h3>
            <ul className="space-y-1 text-sm">
              <li><a href="#social-tea" className="text-white/80 hover:text-gold transition-colors">Social Media Slips</a></li>
              <li><a href="#scandals" className="text-white/80 hover:text-gold transition-colors">Scandals & Gaffes</a></li>
              <li><a href="#money-politics" className="text-white/80 hover:text-gold transition-colors">Money in Politics</a></li>
              <li><a href="#election-watch" className="text-white/80 hover:text-gold transition-colors">Election Coverage</a></li>
              <li><a href="#capitol-gossip" className="text-white/80 hover:text-gold transition-colors">Capitol Gossip</a></li>
            </ul>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-playfair font-bold mb-4 text-gold">Quick Links</h3>
            <ul className="space-y-1 text-sm">
              <li><a href="/about" className="text-white/80 hover:text-gold transition-colors">About Us</a></li>
              <li><a href="#submit-tip" className="text-white/80 hover:text-gold transition-colors">Submit a Tip</a></li>
              <li><a href="#privacy" className="text-white/80 hover:text-gold transition-colors">Privacy Policy</a></li>
              <li><a href="#terms" className="text-white/80 hover:text-gold transition-colors">Terms of Use</a></li>
              <li><a href="/contact" className="text-white/80 hover:text-gold transition-colors">Contact Us</a></li>
              <li><a href="/secure/admin" className="text-white/80 hover:text-gold transition-colors">Admin Login</a></li>
              {isAuthenticated && (
                <li><a href="/admin/dashboard" className="text-white/80 hover:text-gold transition-colors">Admin Dashboard</a></li>
              )}
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-playfair font-bold mb-4 text-gold">Get the Latest Delivered</h3>
            <p className="text-white/80 mb-4 text-sm">
              Subscribe for the juiciest political stories right in your inbox.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-grow px-4 py-2 bg-white/10 border border-white/20 rounded-l-md focus:outline-none focus:ring-1 focus:ring-gold placeholder:text-white/40 text-white"
                required
              />
              <button
                type="submit"
                className="bg-gold hover:bg-gold/90 text-black font-bold px-4 py-2 rounded-r-md transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <Separator className="bg-white/20 my-6" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-xs mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} CrabsFriedPolitically. All gossip rights reserved.
          </p>
          <p className="text-white/60 text-xs">
            For entertainment purposes. No crabs were harmed in the making of this website.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
