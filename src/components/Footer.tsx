
import React from 'react';
import { Mail, Twitter, Instagram, Facebook } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const Footer: React.FC = () => {
  return (
    <footer className="bg-navy text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">About CrabsFriedPolitically</h3>
            <p className="text-white/80 mb-4">
              Serving the spiciest political gossip and news from the Virginia legislature, 
              campaigns, and local government - with a twist of humor.
            </p>
            <div className="flex space-x-4">
              <a href="#twitter" className="text-white hover:text-gold">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#instagram" className="text-white hover:text-gold">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#facebook" className="text-white hover:text-gold">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="mailto:tips@crabsfriedpolitically.com" className="text-white hover:text-gold">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Political Categories */}
          <div>
            <h3 className="text-xl font-bold mb-4">Hot Political Content</h3>
            <ul className="space-y-2">
              <li><a href="#social-tea" className="text-white/80 hover:text-gold">Social Media Slips</a></li>
              <li><a href="#scandals" className="text-white/80 hover:text-gold">Scandals & Gaffes</a></li>
              <li><a href="#money-politics" className="text-white/80 hover:text-gold">Money in Politics</a></li>
              <li><a href="#election-watch" className="text-white/80 hover:text-gold">Election Coverage</a></li>
              <li><a href="#capitol-gossip" className="text-white/80 hover:text-gold">Capitol Gossip</a></li>
            </ul>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-white/80 hover:text-gold">About Us</a></li>
              <li><a href="#submit-tip" className="text-white/80 hover:text-gold">Submit a Tip</a></li>
              <li><a href="#privacy" className="text-white/80 hover:text-gold">Privacy Policy</a></li>
              <li><a href="#terms" className="text-white/80 hover:text-gold">Terms of Use</a></li>
              <li><a href="/contact" className="text-white/80 hover:text-gold">Contact Us</a></li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-xl font-bold mb-4">Get the Latest Delivered</h3>
            <p className="text-white/80 mb-4">
              Subscribe to our newsletter for the juiciest political stories delivered straight to your inbox.
            </p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="flex-grow px-4 py-2 bg-white/10 border border-white/20 rounded-l-md focus:outline-none focus:ring-1 focus:ring-gold"
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
          <p className="text-white/60 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} CrabsFriedPolitically. All gossip rights reserved.
          </p>
          <p className="text-white/60 text-sm">
            For entertainment purposes. No crabs were harmed in the making of this website.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
