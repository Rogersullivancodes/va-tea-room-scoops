
import React from 'react';
import { Calendar, Clock, MapPin, TrendingUp, TrendingDown, Users, BarChart, Flag } from 'lucide-react';
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
  candidates?: string[];
  district?: string;
};

const electionEvents: ElectionEvent[] = [
  {
    id: 1,
    title: "Hampton Roads Senate Debate",
    type: 'debate',
    location: "Old Dominion University, Norfolk",
    date: "April 20, 2025",
    time: "7:00 PM",
    description: "Critical debate focusing on port expansion, military spending, and coastal flooding mitigation measures.",
    candidates: ["Melissa Johnson (D)", "Thomas Reynolds (R)"],
    district: "VA Senate District 7"
  },
  {
    id: 2,
    title: "Hotly Contested Tidewater Race",
    type: 'race',
    location: "Virginia Beach & Chesapeake",
    date: "Ongoing",
    description: "Incumbent faces challenge from well-funded newcomer in district that has flipped parties twice in last three elections.",
    candidates: ["Rep. William Chen (D)", "Sarah Matthews (R)"],
    district: "House District 21"
  },
  {
    id: 3,
    title: "Northern Virginia Transportation Bill Support",
    type: 'poll',
    location: "Fairfax, Loudoun, Prince William",
    date: "April 5, 2025",
    description: "Voter opinions on $4.7B transportation infrastructure package.",
    trend: 'up',
    trendAmount: "7%"
  },
  {
    id: 4,
    title: "Richmond Mayoral Race Shakeup",
    type: 'poll',
    location: "City of Richmond",
    date: "April 2, 2025",
    description: "Progressive challenger gains after controversial debate performance by incumbent.",
    trend: 'up',
    trendAmount: "9%",
    candidates: ["Mayor Daniels", "Councilor Washington"]
  }
];

const ElectionWatchSection: React.FC = () => {
  return (
    <section id="election-watch" className="py-16 bg-white relative">
      {/* Featured ad banner - revenue generator */}
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white shadow-lg border px-6 py-3 rounded-full z-10 w-full max-w-md">
        <div className="flex items-center justify-center">
          <Flag className="text-maroon h-5 w-5 mr-2" />
          <span className="text-sm font-medium">Sponsored by Virginia Forward PAC</span>
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-maroon mb-2">Virginia Election Watch</h2>
          <p className="text-gray-600 max-w-2xl">Comprehensive coverage of key races, debates, and polling data across the Commonwealth</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {electionEvents.map((event) => (
            <Card key={event.id} className="card-shadow hover:shadow-2xl transition-shadow duration-300">
              <CardHeader className="pb-2">
                <div className="mb-3">
                  {event.type === 'debate' && (
                    <div className="bg-navy/10 text-navy font-medium inline-flex items-center px-2 py-1 rounded">
                      <Calendar className="h-4 w-4 mr-1" /> Debate
                    </div>
                  )}
                  {event.type === 'race' && (
                    <div className="bg-maroon/10 text-maroon font-medium inline-flex items-center px-2 py-1 rounded">
                      <Users className="h-4 w-4 mr-1" /> Key Race
                    </div>
                  )}
                  {event.type === 'poll' && (
                    <div className="bg-gold/10 text-gold font-medium inline-flex items-center px-2 py-1 rounded">
                      <BarChart className="h-4 w-4 mr-1" /> Polling Update
                    </div>
                  )}
                </div>
                <CardTitle className="text-lg font-bold text-navy">{event.title}</CardTitle>
                {event.district && (
                  <p className="text-sm text-gray-500 mt-1">{event.district}</p>
                )}
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
                
                {event.candidates && (
                  <div className="mb-3">
                    <div className="flex items-start mb-2">
                      <Users className="h-4 w-4 text-gray-500 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-gray-700 font-medium">Candidates:</span>
                    </div>
                    <ul className="ml-6 space-y-1 text-gray-600">
                      {event.candidates.map((candidate, idx) => (
                        <li key={idx} className="list-disc list-inside">{candidate}</li>
                      ))}
                    </ul>
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
        
        <div className="mt-10 text-center">
          <a 
            href="#all-events" 
            className="inline-flex items-center justify-center bg-navy hover:bg-navy/90 text-white px-6 py-3 rounded-full font-bold transition-colors"
          >
            View Complete Election Calendar
          </a>
        </div>
        
        {/* Subscription prompt */}
        <div className="mt-16 bg-gray-100 p-6 rounded-lg">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold text-navy">Election Alerts</h3>
              <p className="text-gray-600">Get real-time notifications for debates, polls, and breaking campaign news</p>
            </div>
            <div>
              <button className="bg-maroon text-white px-5 py-2 rounded-md hover:bg-maroon/90 transition-colors">
                Sign Up for Alerts
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ElectionWatchSection;
