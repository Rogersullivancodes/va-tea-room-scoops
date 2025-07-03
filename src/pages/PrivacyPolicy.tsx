// src/pages/PrivacyPolicy.tsx
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThemeProvider from '@/components/ThemeProvider';

const PrivacyPolicy: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto py-12 px-4">
          <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
          <div className="prose dark:prose-invert max-w-none">
            <p>
              This is where your privacy policy content will go. You should detail
              how you collect, use, and protect your users' data, especially
              since you are handling memberships and payments.
            </p>
            {/* Add all your detailed sections, like data collection, cookies, security, etc. */}
          </div>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default PrivacyPolicy;
