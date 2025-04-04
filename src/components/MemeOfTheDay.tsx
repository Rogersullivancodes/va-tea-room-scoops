
import React from 'react';
import { Share2, Instagram, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MemeOfTheDay: React.FC = () => {
  return (
    <section className="py-12 bg-gradient-to-r from-maroon/10 to-navy/10">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-maroon mb-6">Meme of the Day</h2>
        
        <div className="max-w-2xl mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
          <div className="p-3 bg-navy text-white text-left font-bold flex justify-between items-center">
            <span>Political Flip Flop</span>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:text-gold">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:text-gold">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-white hover:text-gold">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {/* Meme Image */}
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1540910419892-4a36d2c3266c" 
              alt="Political Flip Flop Meme" 
              className="w-full h-96 object-cover"
            />
            {/* Meme Captions */}
            <div className="absolute top-5 left-0 w-full text-center">
              <p className="text-2xl font-extrabold text-white uppercase tracking-wide text-shadow">
                "I WOULD NEVER SUPPORT THAT BILL"
              </p>
            </div>
            <div className="absolute bottom-5 left-0 w-full text-center">
              <p className="text-2xl font-extrabold text-white uppercase tracking-wide text-shadow">
                *VOTES YES THE NEXT DAY*
              </p>
            </div>
          </div>
          
          {/* Meme Caption */}
          <div className="p-4">
            <p className="text-gray-800 font-medium">
              When you realize the same delegate who campaigned against special interests 
              just voted for their biggest donor's bill
            </p>
            <div className="mt-4 flex justify-center space-x-3">
              <Button variant="outline" className="bg-[#E1306C] hover:bg-[#E1306C]/90 text-white border-none">
                <Instagram className="mr-2 h-4 w-4" /> Share on Instagram
              </Button>
              <Button variant="outline" className="bg-[#1DA1F2] hover:bg-[#1DA1F2]/90 text-white border-none">
                <Twitter className="mr-2 h-4 w-4" /> Share on Twitter
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MemeOfTheDay;
