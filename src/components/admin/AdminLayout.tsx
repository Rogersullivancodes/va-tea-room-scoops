
import React from 'react';
import ThemeProvider from '@/components/ThemeProvider';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-900 text-white">
        {children}
      </div>
    </ThemeProvider>
  );
};

export default AdminLayout;
