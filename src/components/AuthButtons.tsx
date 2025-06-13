
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
        <div className="w-16 h-8 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
        <div className="w-20 h-8 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
      </div>
    );
  }

  if (user) {
    return <UserMenu />;
  }

  return (
    <div className="flex items-center space-x-2">
      <Button variant="ghost" asChild>
        <Link to="/login">Login</Link>
      </Button>
      <Button asChild className="bg-red-600 hover:bg-red-700">
        <Link to="/signup">Sign Up</Link>
      </Button>
    </div>
  );
};

export default AuthButtons;
