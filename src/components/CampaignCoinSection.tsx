
import React from 'react';
import { DollarSign, TrendingUp, Users } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const CampaignCoinSection: React.FC = () => {
  return (
    <section id="campaign-coin" className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-maroon mb-2">Campaign Coin</h2>
          <p className="text-gray-600">Follow the money in Virginia politics</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Feature Article */}
          <Card className="card-shadow overflow-hidden">
            <div className="h-64 relative">
              <img 
                src="https://images.unsplash.com/photo-1621504450181-5d356f61d307" 
                alt="Campaign Finance" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-4">
                <span className="bg-gold text-black px-3 py-1 text-sm font-bold rounded">FEATURE</span>
                <h3 className="text-2xl font-bold text-white mt-2">Who's Really Bankrolling the VA Governor Race?</h3>
              </div>
            </div>
            <CardContent className="py-4">
              <p className="text-gray-700">
                Our investigation reveals the surprising out-of-state interests pouring millions into campaign coffers. 
                The numbers tell a different story than what candidates are saying on stage.
              </p>
              <a href="#full-finance-story" className="inline-block mt-4 text-maroon font-semibold hover:underline">
                See the Full Investigation →
              </a>
            </CardContent>
          </Card>
          
          {/* Side Articles */}
          <div className="space-y-6">
            <Card className="card-shadow">
              <CardHeader className="flex flex-row items-start space-x-4 pb-2">
                <DollarSign className="h-10 w-10 text-gold bg-gold/10 p-2 rounded" />
                <div>
                  <CardTitle className="text-xl font-bold text-navy">Top 5 Donors You've Never Heard Of</CardTitle>
                  <CardDescription>Meet the shadowy figures funding key campaigns</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  While candidates tout grassroots support, these five mega-donors have quietly given over $10M to shape Virginia's political landscape.
                </p>
                <a href="#top-donors" className="block mt-3 text-maroon font-semibold hover:underline">
                  See the List →
                </a>
              </CardContent>
            </Card>
            
            <Card className="card-shadow">
              <CardHeader className="flex flex-row items-start space-x-4 pb-2">
                <TrendingUp className="h-10 w-10 text-gold bg-gold/10 p-2 rounded" />
                <div>
                  <CardTitle className="text-xl font-bold text-navy">Dark Money Surges in House Races</CardTitle>
                  <CardDescription>PAC spending doubles in competitive districts</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Anonymous donors are flooding competitive House districts with record amounts of cash through complex networks of PACs.
                </p>
                <a href="#dark-money" className="block mt-3 text-maroon font-semibold hover:underline">
                  Follow the Trail →
                </a>
              </CardContent>
            </Card>
            
            <Card className="card-shadow">
              <CardHeader className="flex flex-row items-start space-x-4 pb-2">
                <Users className="h-10 w-10 text-gold bg-gold/10 p-2 rounded" />
                <div>
                  <CardTitle className="text-xl font-bold text-navy">Lobbyist Lunch Tracker</CardTitle>
                  <CardDescription>Who's buying meals for your lawmakers?</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Our interactive database tracks every meal, gift, and trip provided to Virginia legislators by special interest groups.
                </p>
                <a href="#lobbyist-tracker" className="block mt-3 text-maroon font-semibold hover:underline">
                  Search the Database →
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CampaignCoinSection;
