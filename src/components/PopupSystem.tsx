
import React, { useState, useEffect } from 'react';
import { X, Gift, CreditCard, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Popup {
  id: string;
  title: string;
  content: string;
  type: 'promotion' | 'membership' | 'credits' | 'news';
  delay: number;
}

const PopupSystem: React.FC = () => {
  const [activePopup, setActivePopup] = useState<Popup | null>(null);
  const [dismissedPopups, setDismissedPopups] = useState<string[]>([]);

  const popups: Popup[] = [
    {
      id: 'welcome',
      title: 'Welcome to Crabs Fried Politically!',
      content: 'Get 50% off your first premium membership. Unlock exclusive political insights!',
      type: 'promotion',
      delay: 3000
    },
    {
      id: 'credits',
      title: 'Character Credits Available!',
      content: 'Create fictional anonymous characters and interact in our political discussions. Buy credits now!',
      type: 'credits',
      delay: 15000
    },
    {
      id: 'membership',
      title: 'Upgrade to Premium',
      content: 'Join our Capitol Elite membership for exclusive political insider information and ad-free browsing.',
      type: 'membership',
      delay: 30000
    }
  ];

  useEffect(() => {
    const showPopups = () => {
      popups.forEach((popup) => {
        if (!dismissedPopups.includes(popup.id)) {
          setTimeout(() => {
            setActivePopup(popup);
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
      case 'credits': return <Users className="h-6 w-6 text-blue-600" />;
      case 'membership': return <CreditCard className="h-6 w-6 text-yellow-600" />;
      default: return <Gift className="h-6 w-6 text-red-600" />;
    }
  };

  if (!activePopup) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl max-w-md w-full p-6 relative animate-in zoom-in duration-300">
        <button
          onClick={() => dismissPopup(activePopup.id)}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <X className="h-5 w-5" />
        </button>
        
        <div className="flex items-center mb-4">
          {getIcon(activePopup.type)}
          <h3 className="text-xl font-bold text-gray-900 dark:text-white ml-3">
            {activePopup.title}
          </h3>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {activePopup.content}
        </p>
        
        <div className="flex space-x-3">
          <Button className="flex-1 bg-red-600 hover:bg-red-700">
            Learn More
          </Button>
          <Button 
            variant="outline" 
            onClick={() => dismissPopup(activePopup.id)}
            className="flex-1"
          >
            Maybe Later
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PopupSystem;
