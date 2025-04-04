
import React from 'react';
import { Calendar, Clock, MapPin, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

type ElectionEvent = {
  id: number;
  title: string;
  type: 'debate' | 'race' | 'poll';
  location: string;
  date: string;
  time?: string;
  description: string;
  trend?: 'up' | 'down';
  trendAmount?: string;
};

const electionEvents: ElectionEvent[] = [
  {
    id: 1,
    title: "7th District Debate Showdown",
    type: 'debate',
    location: "Richmond Public Library",
    date: "April 15, 2025",
    time: "7:00 PM",
    description: "Candidates face off on education funding and transportation infrastructure in this hotly contested district."
  },
  {
    id: 2,
    title: "VA Senate Race Heats Up",
    type: 'race',
    location: "Northern Virginia",
    date: "Ongoing",
    description: "Accusations fly in controversial attack ads as both candidates pour millions into media buys."
  },
  {
    id: 3,
    title: "Governor Approval Rating",
    type: 'poll',
    location: "Statewide",
    date: "April 2, 2025",
    description: "Latest poll shows governor's approval rating on key issues.",
    trend: 'down',
    trendAmount: "5%"
  },
  {
    id: 4,
    title: "42nd District Candidate Surge",
    type: 'poll',
    location: "Hampton Roads",
    date: "March 30, 2025",
    description: "Challenger gains ground following viral town hall performance.",
    trend: 'up',
    trendAmount: "8%"
  }
];

const ElectionWatchSection: React.FC = () => {
  return (
    <section id="election-watch" className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-maroon mb-2">Election Watch</h2>
          <p className="text-gray-600">Stay updated on debates, races, and polling shifts</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {electionEvents.map((event) => (
            <Card key={event.id} className="card-shadow">
              <CardHeader className="pb-2">
                <div className="mb-3">
                  {event.type === 'debate' && (
                    <div className="bg-navy/10 text-navy font-medium inline-flex items-center px-2 py-1 rounded">
                      <Calendar className="h-4 w-4 mr-1" /> Debate
                    </div>
                  )}
                  {event.type === 'race' && (
                    <div className="bg-maroon/10 text-maroon font-medium inline-flex items-center px-2 py-1 rounded">
                      <MapPin className="h-4 w-4 mr-1" /> Race Watch
                    </div>
                  )}
                  {event.type === 'poll' && (
                    <div className="bg-gold/10 text-gold font-medium inline-flex items-center px-2 py-1 rounded">
                      <TrendingUp className="h-4 w-4 mr-1" /> Poll Update
                    </div>
                  )}
                </div>
                <CardTitle className="text-lg font-bold text-navy">{event.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start mb-3">
                  <MapPin className="h-4 w-4 text-gray-500 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">{event.location}</span>
                </div>
                <div className="flex items-start mb-3">
                  <Calendar className="h-4 w-4 text-gray-500 mt-1 mr-2 flex-shrink-0" />
                  <span className="text-gray-700">{event.date}</span>
                </div>
                {event.time && (
                  <div className="flex items-start mb-3">
                    <Clock className="h-4 w-4 text-gray-500 mt-1 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{event.time}</span>
                  </div>
                )}
                
                <Separator className="my-3" />
                
                <p className="text-gray-600 mb-3">{event.description}</p>
                
                {event.trend && (
                  <div className={`flex items-center ${event.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {event.trend === 'up' ? (
                      <TrendingUp className="h-5 w-5 mr-1" />
                    ) : (
                      <TrendingDown className="h-5 w-5 mr-1" />
                    )}
                    <span className="font-semibold">{event.trendAmount} {event.trend === 'up' ? 'increase' : 'decrease'}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <a 
            href="#all-events" 
            className="inline-flex items-center justify-center bg-navy hover:bg-navy/90 text-white px-6 py-3 rounded-full font-bold transition-colors"
          >
            View All Election Events
          </a>
        </div>
      </div>
    </section>
  );
};

export default ElectionWatchSection;
