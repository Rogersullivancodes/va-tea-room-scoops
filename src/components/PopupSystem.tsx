
import React, { useState } from 'react';
import { Gift, CreditCard, Users, Bell, Star, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// New component for the Popup Management Section
export const PopupManagementSection: React.FC = () => {
  const [activePromotions, setActivePromotions] = useState([
    {
      id: 1,
      title: "Premium Membership Sale",
      description: "50% off first month + exclusive political insider access",
      type: "membership",
      active: true
    },
    {
      id: 2,
      title: "Character Credits Bundle",
      description: "100 credits for $9.99 - Create unlimited anonymous personas",
      type: "credits", 
      active: true
    },
    {
      id: 3,
      title: "Capitol Elite Upgrade",
      description: "VIP access to debates, early news alerts, ad-free experience",
      type: "vip",
      active: true
    }
  ]);

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-maroon mb-2">Active Promotions</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
            Don't miss out on our current offers for premium memberships and character credits
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activePromotions.map((promo) => (
            <Card key={promo.id} className="card-shadow hover:shadow-2xl transition-shadow duration-300 border-2 border-red-100 dark:border-red-900">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    promo.type === 'membership' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
                    promo.type === 'credits' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {promo.type === 'membership' ? 'MEMBERSHIP' : 
                     promo.type === 'credits' ? 'CREDITS' : 'VIP'}
                  </div>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                <CardTitle className="text-lg font-bold text-navy dark:text-white">
                  {promo.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {promo.description}
                </p>
                <Button className={`w-full ${
                  promo.type === 'membership' ? 'bg-purple-600 hover:bg-purple-700' :
                  promo.type === 'credits' ? 'bg-yellow-600 hover:bg-yellow-700' :
                  'bg-red-600 hover:bg-red-700'
                } text-white font-semibold`}>
                  {promo.type === 'membership' ? 'Upgrade Now' : 
                   promo.type === 'credits' ? 'Buy Credits' : 'Go VIP'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border-2 border-red-200 dark:border-red-800">
            <h3 className="text-xl font-bold text-navy dark:text-white mb-2">
              🚨 Flash Sale Alert! 🚨
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Next 24 hours only: 75% off all memberships + 200 bonus character credits
            </p>
            <Button className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3">
              Claim Limited Offer
            </Button>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              Offer expires in 23h 45m 12s
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Empty PopupSystem component - no more timed popups
const PopupSystem: React.FC = () => {
  return null;
};

export default PopupSystem;
