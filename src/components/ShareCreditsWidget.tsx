
import React, { useState } from 'react';
import { Share2, Twitter, Facebook, Link, Gift, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ShareCreditsWidget: React.FC = () => {
  const [shared, setShared] = useState<string[]>([]);
  
  const shareUrl = window.location.origin;
  const shareText = "Check out CrabsFriedPolitically - Virginia's best source for unfiltered political news!";

  const shareOptions = [
    {
      id: 'twitter',
      name: 'Twitter',
      icon: <Twitter className="h-5 w-5" />,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: <Facebook className="h-5 w-5" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      color: 'bg-blue-700 hover:bg-blue-800'
    },
    {
      id: 'copy',
      name: 'Copy Link',
      icon: <Link className="h-5 w-5" />,
      url: '',
      color: 'bg-gray-600 hover:bg-gray-700'
    }
  ];

  const handleShare = (option: typeof shareOptions[0]) => {
    if (option.id === 'copy') {
      navigator.clipboard.writeText(shareUrl);
      setShared([...shared, option.id]);
      return;
    }
    
    window.open(option.url, '_blank', 'width=600,height=400');
    setShared([...shared, option.id]);
  };

  const totalEarned = shared.length * 5;

  return (
    <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center mb-2">
          <Gift className="h-6 w-6 text-green-600 mr-2" />
          <CardTitle className="text-green-800 dark:text-green-200">
            Earn 5 Free Credits Per Share!
          </CardTitle>
        </div>
        <p className="text-green-700 dark:text-green-300 text-sm">
          Share CrabsFriedPolitically with your network and earn character credits
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {shareOptions.map((option) => (
            <Button
              key={option.id}
              onClick={() => handleShare(option)}
              disabled={shared.includes(option.id)}
              className={`w-full ${option.color} text-white ${
                shared.includes(option.id) ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {shared.includes(option.id) ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Shared! (+5 credits)
                </>
              ) : (
                <>
                  {option.icon}
                  <span className="ml-2">Share on {option.name}</span>
                  <span className="ml-auto bg-white/20 px-2 py-1 rounded text-xs">
                    +5 credits
                  </span>
                </>
              )}
            </Button>
          ))}
        </div>
        
        {totalEarned > 0 && (
          <div className="mt-4 p-3 bg-green-100 dark:bg-green-800 rounded-lg text-center">
            <p className="text-green-800 dark:text-green-200 font-semibold">
              🎉 You've earned {totalEarned} credits from sharing!
            </p>
          </div>
        )}
        
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-3 text-center">
          Credits are added to your account instantly after sharing
        </p>
      </CardContent>
    </Card>
  );
};

export default ShareCreditsWidget;
