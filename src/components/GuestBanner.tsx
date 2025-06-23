
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Crown, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const GuestBanner: React.FC = () => {
  return (
    <Card className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200 dark:border-amber-800 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-amber-100 dark:bg-amber-900 rounded-full">
            <Crown className="h-5 w-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <h3 className="font-semibold text-amber-800 dark:text-amber-200">
              Limited Access Mode
            </h3>
            <p className="text-sm text-amber-700 dark:text-amber-300">
              Sign up for free to unlock premium content and get 10 free credits!
            </p>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button asChild variant="outline" size="sm" className="border-amber-300 text-amber-700 hover:bg-amber-100 dark:border-amber-700 dark:text-amber-300 dark:hover:bg-amber-900">
            <Link to="/login">Login</Link>
          </Button>
          <Button asChild size="sm" className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white">
            <Link to="/signup">
              <Sparkles className="h-4 w-4 mr-1" />
              Sign Up Free
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default GuestBanner;
