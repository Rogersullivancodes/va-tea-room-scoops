
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import NewsTicker from '@/components/NewsTicker';
import ImageCarousel from '@/components/ImageCarousel';
import TeaDropsSection from '@/components/TeaDropsSection';
import CampaignCoinSection from '@/components/CampaignCoinSection';
import MemeOfTheDay from '@/components/MemeOfTheDay';
import ElectionWatchSection from '@/components/ElectionWatchSection';
import InteractiveChat from '@/components/InteractiveChat';
import PaymentSection from '@/components/PaymentSection';
import SubmitTeaForm from '@/components/SubmitTeaForm';
import Footer from '@/components/Footer';
import LoadingScreen from '@/components/LoadingScreen';
import ThemeProvider from '@/components/ThemeProvider';
import AIChatbot from '@/components/AIChatbot';
import { PopupManagementSection } from '@/components/PopupSystem';
import SecureCheckout from '@/components/SecureCheckout';
import AdSpaces from '@/components/AdSpaces';
import ShareCreditsWidget from '@/components/ShareCreditsWidget';
import { useAdmin } from '@/contexts/AdminContext';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { isAuthenticated: isAdminAuthenticated } = useAdmin();
  const { user, isGuest } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAdminAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAdminAuthenticated, navigate]);

  if (isAdminAuthenticated) {
    return null; // Don't render anything while redirecting
  }

  return (
    <ThemeProvider>
      <LoadingScreen />
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <Hero />
        <div className="sticky top-0 z-10 shadow-lg">
          <NewsTicker />
        </div>
        <main>
          {/* Free Credits Banner - only show for authenticated users */}
          {user && !isGuest && (
            <div className="bg-green-50 dark:bg-green-900/20 py-4">
              <div className="container mx-auto px-4">
                <div className="max-w-md mx-auto">
                  <ShareCreditsWidget />
                </div>
              </div>
            </div>
          )}
          
          <ImageCarousel />
          <TeaDropsSection />
          
          {/* First Ad Space */}
          <div className="container mx-auto px-4 my-8">
            <AdSpaces />
          </div>
          
          <CampaignCoinSection />
          <MemeOfTheDay />
          <InteractiveChat />
          
          {/* Secure Checkout Section - only show for authenticated users */}
          {user && !isGuest && <SecureCheckout />}
          
          {/* Payment Section - show for guests to encourage signup */}
          <PaymentSection />
          
          {/* Election Watch and Popup Management side by side */}
          <div className="bg-white dark:bg-gray-900">
            <ElectionWatchSection />
          </div>
          <PopupManagementSection />
          
          {/* More Ad Spaces */}
          <div className="bg-navy/5 dark:bg-gray-800/50 py-6 px-4">
            <div className="container mx-auto">
              <AdSpaces />
            </div>
          </div>
          
          <SubmitTeaForm />
        </main>
        <Footer />
        <AIChatbot />
      </div>
    </ThemeProvider>
  );
};

export default Index;
