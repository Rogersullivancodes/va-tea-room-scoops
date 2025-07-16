
import React from 'react';
import DynamicTopBanner from '@/components/DynamicTopBanner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import HeroStory from '@/components/landing/HeroStory';
import StoryCard from '@/components/landing/StoryCard';
import FeedItem from '@/components/landing/FeedItem';
import VideoRail from '@/components/landing/VideoRail';
import AdSpaces from '@/components/AdSpaces';
import NewsTicker from '@/components/NewsTicker';
import ThemeProvider from '@/components/ThemeProvider';

// --- PLACEHOLDER DATA ---
const mainStory = { 
  imageUrl: 'https://picsum.photos/seed/mainstory/800/450', 
  title: 'Explosive Documents Reveal Shocking Political Alliance',
  slug: 'explosive-docs-reveal-alliance'
};

const secondaryStories = [
  { imageUrl: 'https://picsum.photos/seed/gossip/400/225', title: 'Capitol Hill Aide Caught in Midnight Rendezvous', slug: 'aide-rendezvous' },
  { imageUrl: 'https://picsum.photos/seed/money/400/225', title: 'Unprecedented Campaign Donations Traced to Offshore Accounts', slug: 'donations-traced' },
];

const mainFeed = [
  { imageUrl: 'https://picsum.photos/seed/fundraiser/100/75', title: 'Governor Spotted at Lavish Unregistered Fundraiser', slug: 'governor-fundraiser' },
  { imageUrl: 'https://picsum.photos/seed/scuffle/100/75', title: 'Senator\'s Son Involved in Minor Traffic Scuffle, Demands Immunity', slug: 'senator-son-scuffle' },
  { imageUrl: 'https://picsum.photos/seed/slipup/100/75', title: 'Social Media Slip-Up: Candidate Tweets Private Message Publicly', slug: 'candidate-tweet-slip' },
  { imageUrl: 'https://picsum.photos/seed/context/100/75', title: '"It Was Taken Out of Context" - The Political Excuse of the Week', slug: 'context-excuse' },
  { imageUrl: 'https://picsum.photos/seed/underdog/100/75', title: 'New Polls Show Unexpected Surge for Underdog Candidate', slug: 'underdog-surge' },
  { imageUrl: 'https://picsum.photos/seed/gaffe/100/75', title: 'Analysis: What the Latest Gaffe Really Means for the Election', slug: 'gaffe-analysis' },
];

const videoItems = [
  { imageUrl: 'https://picsum.photos/seed/hotmic/300/170', title: 'Watch the Viral Hot Mic Moment That Has Everyone Talking', slug: 'viral-hot-mic' },
  { imageUrl: 'https://picsum.photos/seed/debate/300/170', title: 'Body Language Expert Breaks Down Tense Debate Performance', slug: 'debate-body-language' },
];

const Index = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <DynamicTopBanner />
        <NewsTicker />
        
        <main className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="mb-8">
            <Hero />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Column - Main Stories */}
            <div className="lg:col-span-2 space-y-8">
              {/* Hero Story */}
              <HeroStory 
                imageUrl={mainStory.imageUrl}
                title={mainStory.title}
                slug={mainStory.slug}
              />
              
              {/* Secondary Stories */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {secondaryStories.map((story, index) => (
                  <StoryCard 
                    key={index}
                    imageUrl={story.imageUrl}
                    title={story.title}
                    slug={story.slug}
                  />
                ))}
              </div>
            </div>

            {/* Center Column - Feed */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground mb-4">Latest Buzz</h2>
              {mainFeed.map((item, index) => (
                <FeedItem 
                  key={index}
                  imageUrl={item.imageUrl}
                  title={item.title}
                  slug={item.slug}
                />
              ))}
            </div>

            {/* Right Column - Ads & Videos */}
            <div className="space-y-8">
              <AdSpaces />
              <VideoRail items={videoItems} />
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Index;
