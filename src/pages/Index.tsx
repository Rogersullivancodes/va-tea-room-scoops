
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import NewsTicker from '@/components/NewsTicker';
import TeaDropsSection from '@/components/TeaDropsSection';
import CampaignCoinSection from '@/components/CampaignCoinSection';
import MemeOfTheDay from '@/components/MemeOfTheDay';
import ElectionWatchSection from '@/components/ElectionWatchSection';
import SubmitTeaForm from '@/components/SubmitTeaForm';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <div className="sticky top-0 z-10 shadow-lg">
        <NewsTicker />
      </div>
      <main>
        <TeaDropsSection />
        <div className="bg-navy/5 py-6 px-4 text-center">
          <div className="container mx-auto">
            <p className="text-sm text-gray-600">ADVERTISEMENT</p>
            <div className="h-24 md:h-32 bg-gray-200 rounded-md flex items-center justify-center mt-2">
              <span className="text-gray-500">Premium Banner Ad Space</span>
            </div>
          </div>
        </div>
        <CampaignCoinSection />
        <MemeOfTheDay />
        <ElectionWatchSection />
        <SubmitTeaForm />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
