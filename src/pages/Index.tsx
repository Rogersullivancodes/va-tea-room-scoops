// src/pages/Index.tsx
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThemeProvider from '@/components/ThemeProvider';
import { HeroStory } from '@/components/landing/HeroStory';
import { StoryCard } from '@/components/landing/StoryCard';
import { FeedItem } from '@/components/landing/FeedItem';
import { VideoRail } from '@/components/landing/VideoRail';

// --- PLACEHOLDER DATA: You will replace this with data from Supabase ---
const mainStory = { 
  imageUrl: 'https://placehold.co/800x450/dc2626/white?text=BREAKING', 
  title: 'Explosive Documents Reveal Shocking Political Alliance',
  slug: 'explosive-docs-reveal-alliance'
};

const secondaryStories = [
  { imageUrl: 'https://placehold.co/400x225/1d4ed8/white?text=Gossip', title: 'Capitol Hill Aide Caught in Midnight Rendezvous', slug: 'aide-rendezvous' },
  { imageUrl: 'https://placehold.co/400x225/166534/white?text=Money', title: 'Unprecedented Campaign Donations Traced to Offshore Accounts', slug: 'donations-traced' },
];

const mainFeed = [
  { imageUrl: 'https://placehold.co/100x75/6b7280/white', title: 'Governor Spotted at Lavish Unregistered Fundraiser', slug: 'governor-fundraiser' },
  { imageUrl: 'https://placehold.co/100x75/6b7280/white', title: 'Senator\'s Son Involved in Minor Traffic Scuffle, Demands Immunity', slug: 'senator-son-scuffle' },
  { imageUrl: 'https://placehold.co/100x75/6b7280/white', title: 'Social Media Slip-Up: Candidate Tweets Private Message Publicly', slug: 'candidate-tweet-slip' },
  { imageUrl: 'https://placehold.co/100x75/6b7280/white', title: '"It Was Taken Out of Context" - The Political Excuse of the Week', slug: 'context-excuse' },
  { imageUrl: 'https://placehold.co/100x75/6b7280/white', title: 'New Polls Show Unexpected Surge for Underdog Candidate', slug: 'underdog-surge' },
  { imageUrl: 'https://placehold.co/100x75/6b7280/white', title: 'Analysis: What the Latest Gaffe Really Means for the Election', slug: 'gaffe-analysis' },
];

const videoItems = [
  { imageUrl: 'https://placehold.co/300x170/ca8a04/white?text=VIDEO', title: 'Watch the Viral Hot Mic Moment That Has Everyone Talking', slug: 'viral-hot-mic' },
  { imageUrl: 'https://placehold.co/300x170/ca8a04/white?text=VIDEO', title: 'Body Language Expert Breaks Down Tense Debate Performance', slug: 'debate-body-language' },
];
// --- END OF PLACEHOLDER DATA ---


const Index: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-white dark:bg-black">
        <Navbar />
        <main className="flex-1 container mx-auto py-8 px-4">
          {/* Main 3-Column Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* --- LEFT COLUMN (Featured Stories) --- */}
            <div className="lg:col-span-4 space-y-8">
              <HeroStory story={mainStory} />
              {secondaryStories.map(story => (
                <StoryCard key={story.slug} story={story} />
              ))}
            </div>

            {/* --- MIDDLE COLUMN (Main Feed) --- */}
            <div className="lg:col-span-5 border-x border-gray-200 dark:border-gray-800 px-4">
              <div className="space-y-4">
                {mainFeed.map(item => (
                  <FeedItem key={item.slug} item={item} />
                ))}
              </div>
            </div>

            {/* --- RIGHT COLUMN (Videos/Ancillary) --- */}
            <div className="lg:col-span-3">
              <VideoRail videos={videoItems} />
            </div>
            
          </div>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Index;
