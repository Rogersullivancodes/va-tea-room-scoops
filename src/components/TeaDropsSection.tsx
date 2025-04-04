
import React from 'react';
import { ArrowRight, Eye, MessageSquare, Share2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

type TeaDrop = {
  id: number;
  title: string;
  excerpt: string;
  imageUrl: string;
  date: string;
  category: string;
  views: number;
  comments: number;
};

const teaDrops: TeaDrop[] = [
  {
    id: 1,
    title: "Virginia House Speaker's Text Messages Reveal Previously Undisclosed Meetings with Lobbyists",
    excerpt: "Leaked communications show three private meetings with energy sector representatives were held days before critical vote on regulatory bill...",
    imageUrl: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c",
    date: "April 3, 2025",
    category: "Investigations",
    views: 4582,
    comments: 215
  },
  {
    id: 2,
    title: "Newly Elected Fairfax Delegate's Undisclosed Real Estate Holdings Create Potential Conflict",
    excerpt: "Public records reveal the freshman delegate owns properties that would directly benefit from infrastructure legislation she recently co-sponsored...",
    imageUrl: "https://images.unsplash.com/photo-1542889601-399c4f3a8402",
    date: "April 2, 2025",
    category: "Conflicts of Interest",
    views: 3271,
    comments: 178
  },
  {
    id: 3,
    title: "Budget Committee Chair's Former Staffers Now Employed by Companies Receiving State Contracts",
    excerpt: "Five former senior aides have moved to positions with corporations that secured over $47 million in state funding during the last fiscal year...",
    imageUrl: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3",
    date: "April 1, 2025",
    category: "Revolving Door",
    views: 2985,
    comments: 163
  }
];

const TeaDropsSection: React.FC = () => {
  return (
    <section id="tea-drops" className="py-14 bg-lightgray relative">
      {/* Ad sidebar - desktop only */}
      <div className="hidden lg:block absolute right-4 top-20 w-48 h-[600px] bg-white shadow-md rounded-lg overflow-hidden">
        <div className="bg-navy text-white p-2 text-center text-xs">ADVERTISEMENT</div>
        <div className="p-3 text-center">
          <p className="text-sm">Premium ad space available</p>
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-maroon mb-2">Virginia Political Insights</h2>
            <p className="text-gray-600">The stories they don't want you to see</p>
          </div>
          <a href="#more-tea" className="text-navy font-medium flex items-center hover:text-maroon">
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teaDrops.map((tea) => (
            <Card key={tea.id} className="card-shadow group">
              <div className="h-56 overflow-hidden rounded-t-lg relative">
                <img 
                  src={tea.imageUrl} 
                  alt={tea.title} 
                  className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold text-white bg-maroon px-2 py-1 rounded">
                    {tea.category}
                  </span>
                  <span className="text-xs text-gray-500">{tea.date}</span>
                </div>
                <CardTitle className="text-xl font-bold text-navy group-hover:text-maroon transition-colors">
                  <a href={`#story-${tea.id}`}>{tea.title}</a>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{tea.excerpt}</p>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <div className="flex space-x-4 text-gray-500">
                  <span className="flex items-center text-sm">
                    <Eye className="h-4 w-4 mr-1" /> {tea.views.toLocaleString()}
                  </span>
                  <span className="flex items-center text-sm">
                    <MessageSquare className="h-4 w-4 mr-1" /> {tea.comments}
                  </span>
                </div>
                <button className="text-maroon hover:text-navy">
                  <Share2 className="h-5 w-5" />
                </button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {/* Newsletter signup - revenue generator */}
        <div className="mt-14 bg-gradient-to-r from-navy to-maroon p-6 md:p-8 rounded-lg text-white shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-6">
              <h3 className="text-2xl font-bold mb-2">Get Insider Access</h3>
              <p className="text-white/80">Subscribe to our premium newsletter for exclusive stories and analysis</p>
            </div>
            <div className="flex w-full md:w-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-3 rounded-l-md w-full md:w-64 text-gray-900"
              />
              <button className="bg-gold hover:bg-gold/90 text-black font-bold px-6 py-3 rounded-r-md transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeaDropsSection;
