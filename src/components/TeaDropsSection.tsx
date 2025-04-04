
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

type TeaDrop = {
  id: number;
  title: string;
  excerpt: string;
  imageUrl: string;
  date: string;
  category: string;
};

const teaDrops: TeaDrop[] = [
  {
    id: 1,
    title: "Councilman's Instagram Likes Reveal Secret Political Alliance",
    excerpt: "What happens on social media doesn't stay on social media, especially for this Richmond councilman whose late-night likes exposed connections to opposition groups...",
    imageUrl: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb",
    date: "1 hour ago",
    category: "Social Tea"
  },
  {
    id: 2,
    title: "TikTok Reveals Delegate's Wild Bar Speech During Budget Crisis",
    excerpt: "While the legislature was deadlocked over emergency funding, this NoVA delegate was caught on TikTok giving an impromptu karaoke performance at a downtown bar...",
    imageUrl: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624",
    date: "3 hours ago",
    category: "Party Foul"
  },
  {
    id: 3,
    title: "Delegate Double-Dipping? Two Paychecks, One Office",
    excerpt: "A whistleblower claims this prominent Virginia Beach representative has been collecting consulting fees from the same industry they're supposed to be regulating...",
    imageUrl: "https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6",
    date: "Yesterday",
    category: "Money Matters"
  }
];

const TeaDropsSection: React.FC = () => {
  return (
    <section id="tea-drops" className="py-12 bg-lightgray">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-maroon">Today's Tea</h2>
          <a href="#more-tea" className="text-navy font-medium flex items-center hover:text-maroon">
            More Tea <ArrowRight className="ml-1 h-4 w-4" />
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teaDrops.map((tea) => (
            <Card key={tea.id} className="card-shadow">
              <div className="h-48 overflow-hidden rounded-t-lg">
                <img 
                  src={tea.imageUrl} 
                  alt={tea.title} 
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                />
              </div>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-semibold text-gold bg-gold/10 px-2 py-1 rounded">
                    {tea.category}
                  </span>
                  <span className="text-xs text-gray-500">{tea.date}</span>
                </div>
                <CardTitle className="text-xl font-bold text-navy hover:text-maroon">
                  <a href={`#story-${tea.id}`}>{tea.title}</a>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{tea.excerpt}</p>
              </CardContent>
              <CardFooter>
                <a 
                  href={`#story-${tea.id}`}
                  className="text-maroon font-semibold hover:underline inline-flex items-center"
                >
                  Read Full Story <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeaDropsSection;
