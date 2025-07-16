
import React from 'react';
import TopAdBanner from '@/components/TopAdBanner';
import DynamicTopBanner from '@/components/DynamicTopBanner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import AdSpaces from '@/components/AdSpaces';
import NewsTicker from '@/components/NewsTicker';
import ThemeProvider from '@/components/ThemeProvider';
import { useNews } from '@/hooks/useNews';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Clock, TrendingUp } from 'lucide-react';

const Index = () => {
  const { articles, loading } = useNews();

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <TopAdBanner />
        <DynamicTopBanner />
        <NewsTicker />
        
        <main className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="mb-8">
            <Hero />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Latest News */}
            <div className="lg:col-span-2 space-y-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-foreground flex items-center gap-2">
                  <TrendingUp className="h-8 w-8 text-primary" />
                  Latest News
                </h2>
                <Link to="/news">
                  <Button variant="outline" className="hover:bg-primary hover:text-primary-foreground">
                    View All News
                  </Button>
                </Link>
              </div>
              
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-card border border-border rounded-lg p-4 animate-pulse">
                      <div className="w-full h-48 bg-muted rounded mb-4"></div>
                      <div className="h-4 bg-muted rounded mb-2"></div>
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {articles.slice(0, 6).map((article, index) => (
                    <div key={article.id} className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                      <img 
                        src={article.image_url || `https://picsum.photos/seed/${article.id}/400/250`}
                        alt={article.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {new Date(article.published_at).toLocaleDateString()}
                          </span>
                          <span className="bg-primary/10 text-primary px-2 py-1 rounded">
                            {article.source}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column - Ads */}
            <div className="space-y-8">
              <AdSpaces />
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Index;
