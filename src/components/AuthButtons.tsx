
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import UserMenu from './UserMenu';

const AuthButtons: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center space-x-2">
        <div className="w-16 h-8 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 animate-pulse rounded-lg"></div>
        <div className="w-20 h-8 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 animate-pulse rounded-lg"></div>
      </div>
    );
  }

  if (user) {
    return <UserMenu />;
  }

  return (
    <div className="flex items-center space-x-2">
      <Button variant="ghost" asChild className="hover:bg-primary/10 transition-all duration-200">
        <Link to="/login">Login</Link>
      </Button>
      <Button asChild className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg hover:shadow-xl transition-all duration-200">
        <Link to="/signup">Sign Up</Link>
      </Button>
    </div>
  );
};

export default AuthButtons;
