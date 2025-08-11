
import React, { useState, useEffect } from 'react';
import DynamicTopBanner from '@/components/DynamicTopBanner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import AdSpaces from '@/components/AdSpaces';
import NewsTicker from '@/components/NewsTicker';
import ThemeProvider from '@/components/ThemeProvider';
import PersonalizedFeed from '@/components/PersonalizedFeed';
import InteractiveArticleCard from '@/components/InteractiveArticleCard';
import ReadingListWidget from '@/components/ReadingListWidget';
import InfiniteScrollContainer from '@/components/InfiniteScrollContainer';
import { useNews } from '@/hooks/useNews';
import { useArticles } from '@/hooks/useArticles';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Clock, TrendingUp, MegaphoneIcon, Sparkles, Star, Zap } from 'lucide-react';

const Index = () => {
  const { articles: newsArticles, loading: newsLoading } = useNews();
  const { articles, loading: articlesLoading } = useArticles();
  const [featuredArticle, setFeaturedArticle] = useState(null);
  const [categories, setCategories] = useState([]);

  // Set featured article and extract categories
  useEffect(() => {
    if (articles.length > 0) {
      // Set the most recent premium article as featured, or first article
      const featured = articles.find(article => article.is_premium) || articles[0];
      setFeaturedArticle(featured);
      
      // Extract unique categories for personalization
      const uniqueCategories = [...new Set(articles.map(article => article.category).filter(Boolean))];
      setCategories(uniqueCategories.slice(0, 5)); // Limit to 5 categories
    }
  }, [articles]);

  const loading = newsLoading || articlesLoading;

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <DynamicTopBanner />
        <NewsTicker />
        
        <main className="container mx-auto px-4 py-8 space-y-12">
          {/* Hero Section with Enhanced Animation */}
          <div className="mb-12 animate-fade-in">
            <Hero />
          </div>

          {/* Featured Article Section */}
          {featuredArticle && (
            <section className="mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center gap-3 mb-6">
                <Star className="h-8 w-8 text-accent animate-pulse-slow" />
                <h2 className="text-3xl font-bold text-foreground">Featured Story</h2>
                <div className="flex-1 h-px bg-gradient-to-r from-primary/50 to-transparent" />
              </div>
              <InteractiveArticleCard article={featuredArticle} featured={true} />
            </section>
          )}

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Left Column - Personalized Feed */}
            <div className="xl:col-span-3 space-y-12">
              {/* Dynamic News Ticker Integration */}
              <section className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <div className="flex items-center gap-3 mb-6">
                  <Zap className="h-7 w-7 text-primary animate-float" />
                  <h2 className="text-2xl font-bold text-foreground">Breaking News</h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-primary/50 to-transparent" />
                </div>
                {loading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="bg-card border border-border rounded-lg p-4 animate-pulse">
                        <div className="w-full h-48 bg-muted rounded mb-4"></div>
                        <div className="h-4 bg-muted rounded mb-2"></div>
                        <div className="h-4 bg-muted rounded w-3/4"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {newsArticles.slice(0, 6).map((article, index) => (
                      <div
                        key={article.id}
                        className="animate-fade-in hover-scale"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <InteractiveArticleCard 
                          article={{
                            ...article,
                            id: article.id,
                            title: article.title,
                            excerpt: article.excerpt,
                            category: article.source,
                            published_at: article.published_at,
                            featured_image_url: article.image_url,
                            views: 0,
                            likes: 0,
                            credits_required: 0,
                            is_premium: false,
                            status: 'published',
                            author_id: '',
                            content: '',
                            created_at: article.published_at,
                            meta_description: '',
                            meta_keywords: [],
                            tags: [],
                            updated_at: article.published_at
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </section>

              {/* Personalized Content Feed */}
              <section className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <PersonalizedFeed categories={categories} />
              </section>

              {/* Interactive Navigation */}
              <section className="text-center animate-fade-in" style={{ animationDelay: '0.8s' }}>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link to="/news">
                    <Button variant="outline" className="button-glow hover:scale-105 transition-all duration-300">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      All Breaking News
                    </Button>
                  </Link>
                  <Link to="/articles">
                    <Button variant="outline" className="button-glow hover:scale-105 transition-all duration-300">
                      <Sparkles className="h-4 w-4 mr-2" />
                      Featured Articles
                    </Button>
                  </Link>
                </div>
              </section>
            </div>

            {/* Right Column - Enhanced Sidebar */}
            <div className="space-y-8">
              {/* Reading List Widget */}
              <div className="animate-fade-in" style={{ animationDelay: '1.0s' }}>
                <ReadingListWidget />
              </div>

              {/* Advertisement Space with Enhanced Design */}
              <div className="bg-gradient-to-br from-card via-card to-primary/5 border border-border rounded-lg p-6 text-center hover-scale animate-fade-in" style={{ animationDelay: '1.2s' }}>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <MegaphoneIcon className="h-6 w-6 text-primary animate-pulse-slow" />
                  <h3 className="text-lg font-semibold">Premium Ad Space</h3>
                </div>
                <p className="text-muted-foreground mb-4 text-sm">
                  Reach thousands of politically engaged readers with sophisticated targeting
                </p>
                <Link to="/ads">
                  <Button className="w-full button-glow">
                    Explore Opportunities
                  </Button>
                </Link>
              </div>

              {/* Enhanced Ad Spaces */}
              <div className="animate-fade-in" style={{ animationDelay: '1.4s' }}>
                <AdSpaces />
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Index;
