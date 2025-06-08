
import React from 'react';
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

const Index = () => {
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
          <ImageCarousel />
          <TeaDropsSection />
          
          {/* First Ad Space */}
          <div className="container mx-auto px-4 my-8">
            <AdSpaces />
          </div>
          
          <CampaignCoinSection />
          <MemeOfTheDay />
          <InteractiveChat />
          
          {/* Secure Checkout Section */}
          <SecureCheckout />
          
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
