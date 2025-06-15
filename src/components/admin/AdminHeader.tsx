
import React from 'react';
import { Button } from '@/components/ui/button';
import { Shield, LogOut } from 'lucide-react';

interface AdminHeaderProps {
  adminName: string;
  onSignOut: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ adminName, onSignOut }) => {
  return (
    <header className="bg-gray-800 border-b border-red-800 p-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-4">
          <Shield className="h-8 w-8 text-red-400" />
          <div>
            <h1 className="text-xl font-bold text-red-400">Admin Dashboard</h1>
            <p className="text-gray-400 text-sm">CrabsFriedPolitically Management</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-gray-300">Welcome, {adminName}</span>
          <Button 
            variant="outline" 
            onClick={onSignOut}
            className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
