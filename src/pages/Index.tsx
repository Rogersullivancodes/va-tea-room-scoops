
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
      <div className="sticky top-0 z-10">
        <NewsTicker />
      </div>
      <main>
        <TeaDropsSection />
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
