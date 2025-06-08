
import React, { useState, useEffect } from 'react';
import { X, Gift, CreditCard, Users, Bell, Star, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Popup {
  id: string;
  title: string;
  content: string;
  type: 'promotion' | 'membership' | 'credits' | 'news';
  delay: number;
  duration?: number;
}

const PopupSystem: React.FC = () => {
  const [activePopup, setActivePopup] = useState<Popup | null>(null);
  const [dismissedPopups, setDismissedPopups] = useState<string[]>([]);

  const popups: Popup[] = [
    {
      id: 'welcome',
      title: '🦀 Welcome to Crabs Fried Politically!',
      content: 'Get 50% off your first premium membership. Unlock exclusive political insights and ad-free browsing!',
      type: 'promotion',
      delay: 3000,
      duration: 8000
    },
    {
      id: 'credits',
      title: '⭐ Character Credits Available!',
      content: 'Create fictional anonymous characters and interact in our political discussions. Buy 100 credits for just $9.99!',
      type: 'credits',
      delay: 15000,
      duration: 10000
    },
    {
      id: 'membership',
      title: '👑 Upgrade to Capitol Elite',
      content: 'Join our premium membership for $19.99/month: Exclusive insider reports, early debate access, and VIP chat privileges.',
      type: 'membership',
      delay: 30000,
      duration: 12000
    },
    {
      id: 'limited-offer',
      title: '🔥 Limited Time: Flash Sale!',
      content: 'Next 24 hours only: 75% off all memberships + 200 bonus character credits. Don\'t miss out!',
      type: 'promotion',
      delay: 45000,
      duration: 15000
    }
  ];

  useEffect(() => {
    const showPopups = () => {
      popups.forEach((popup) => {
        if (!dismissedPopups.includes(popup.id)) {
          setTimeout(() => {
            setActivePopup(popup);
            
            // Auto-dismiss after duration if specified
            if (popup.duration) {
              setTimeout(() => {
                setActivePopup(null);
              }, popup.duration);
            }
          }, popup.delay);
        }
      });
    };

    showPopups();
  }, [dismissedPopups]);

  const dismissPopup = (popupId: string) => {
    setDismissedPopups(prev => [...prev, popupId]);
    setActivePopup(null);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'promotion': return <Gift className="h-6 w-6 text-red-600" />;
      case 'credits': return <Star className="h-6 w-6 text-yellow-600" />;
      case 'membership': return <Crown className="h-6 w-6 text-purple-600" />;
      default: return <Bell className="h-6 w-6 text-blue-600" />;
    }
  };

  const getButtonColor = (type: string) => {
    switch (type) {
      case 'promotion': return 'bg-red-600 hover:bg-red-700';
      case 'credits': return 'bg-yellow-600 hover:bg-yellow-700';
      case 'membership': return 'bg-purple-600 hover:bg-purple-700';
      default: return 'bg-blue-600 hover:bg-blue-700';
    }
  };

  if (!activePopup) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full p-6 relative animate-in zoom-in duration-300 border-2 border-red-200 dark:border-red-800">
        <button
          onClick={() => dismissPopup(activePopup.id)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
        
        <div className="flex items-center mb-4">
          {getIcon(activePopup.type)}
          <h3 className="text-xl font-bold text-gray-900 dark:text-white ml-3">
            {activePopup.title}
          </h3>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
          {activePopup.content}
        </p>
        
        <div className="flex space-x-3">
          <Button className={`flex-1 ${getButtonColor(activePopup.type)} text-white font-semibold`}>
            {activePopup.type === 'membership' ? 'Upgrade Now' : 
             activePopup.type === 'credits' ? 'Buy Credits' : 'Claim Offer'}
          </Button>
          <Button 
            variant="outline" 
            onClick={() => dismissPopup(activePopup.id)}
            className="flex-1 border-gray-300 dark:border-gray-600"
          >
            Maybe Later
          </Button>
        </div>
        
        {activePopup.type === 'promotion' && (
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Limited time offer. Terms and conditions apply.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

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

export default PopupSystem;
