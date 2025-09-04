
import React, { useState, useEffect, useMemo } from 'react';
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
import { useCelebrityNews } from '@/hooks/useCelebrityNews';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Clock, TrendingUp, MegaphoneIcon, Sparkles, Star, Zap, Users, Trophy } from 'lucide-react';

const Index = () => {
  const { articles: newsArticles, loading: newsLoading } = useNews();
  const { articles: celebrityArticles, loading: celebrityLoading } = useCelebrityNews();
  const [featuredNewsArticle, setFeaturedNewsArticle] = useState(null);

  // Enhanced categorization with better filtering and thumbnail management
  const categorizedNews = useMemo(() => {
    // Political/Government news with priority keywords
    const politicalNews = newsArticles.filter(article => {
      const searchText = `${article.title || ''} ${article.content || ''} ${article.excerpt || ''} ${article.source || ''}`.toLowerCase();
      return (
        article.category === 'politics' ||
        searchText.includes('politics') ||
        searchText.includes('government') ||
        searchText.includes('election') ||
        searchText.includes('congress') ||
        searchText.includes('senate') ||
        searchText.includes('house') ||
        searchText.includes('democrat') ||
        searchText.includes('republican') ||
        searchText.includes('campaign') ||
        searchText.includes('vote') ||
        searchText.includes('policy') ||
        searchText.includes('administration') ||
        searchText.includes('governor') ||
        searchText.includes('mayor')
      );
    }).sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
    
    // College/University news
    const collegeNews = newsArticles.filter(article => {
      const searchText = `${article.title || ''} ${article.content || ''} ${article.excerpt || ''} ${article.source || ''}`.toLowerCase();
      return (
        article.category === 'education' ||
        searchText.includes('university') ||
        searchText.includes('college') ||
        searchText.includes('student') ||
        searchText.includes('campus') ||
        searchText.includes('academic') ||
        searchText.includes('school') ||
        searchText.includes('education') ||
        searchText.includes('graduation') ||
        searchText.includes('tuition')
      );
    }).filter(article => !politicalNews.includes(article))
    .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
    
    // Other news (everything else)
    const otherNews = newsArticles.filter(article => 
      !politicalNews.includes(article) && !collegeNews.includes(article)
    ).sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());

    return {
      political: politicalNews.slice(0, 12), // More political news
      college: collegeNews.slice(0, 8),
      celebrity: celebrityArticles.slice(0, 6),
      other: otherNews.slice(0, 6)
    };
  }, [newsArticles, celebrityArticles]);

  // Set featured news article (political news first priority)
  useEffect(() => {
    if (categorizedNews.political.length > 0) {
      setFeaturedNewsArticle(categorizedNews.political[0]);
    } else if (newsArticles.length > 0) {
      setFeaturedNewsArticle(newsArticles[0]);
    }
  }, [categorizedNews.political, newsArticles]);

  const loading = newsLoading || celebrityLoading;

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <DynamicTopBanner />
        <NewsTicker />
        
        <main className="container mx-auto px-4 py-8 space-y-12">
          {/* Featured News Section */}
          {featuredNewsArticle && (
            <section className="mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center gap-3 mb-6">
                <Star className="h-8 w-8 text-accent animate-pulse-slow" />
                <h2 className="text-3xl font-bold text-foreground">Featured Political News</h2>
                <div className="flex-1 h-px bg-gradient-to-r from-primary/50 to-transparent" />
              </div>
              <InteractiveArticleCard 
                article={{
                  ...featuredNewsArticle,
                  id: featuredNewsArticle.id,
                  title: featuredNewsArticle.title,
                  excerpt: featuredNewsArticle.excerpt,
                  category: featuredNewsArticle.source,
                  published_at: featuredNewsArticle.published_at,
                  featured_image_url: featuredNewsArticle.image_url || 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=600&fit=crop',
                  views: featuredNewsArticle.views || 0,
                  likes: 0,
                  credits_required: 0,
                  is_premium: false,
                  status: 'published',
                  author_id: '',
                  content: featuredNewsArticle.content,
                  created_at: featuredNewsArticle.published_at,
                  meta_description: '',
                  meta_keywords: [],
                  tags: [],
                  updated_at: featuredNewsArticle.published_at
                }}
                featured={true} 
              />
            </section>
          )}

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Left Column - Categorized News */}
            <div className="xl:col-span-3 space-y-12">
              
              {/* Political News Section */}
              <section className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <div className="flex items-center gap-3 mb-6">
                  <Zap className="h-7 w-7 text-red-500 animate-float" />
                  <h2 className="text-2xl font-bold text-foreground">Political News</h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-red-500/50 to-transparent" />
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
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                     {categorizedNews.political.map((article, index) => {
                      const politicalImages = [
                        'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop',
                        'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=400&h=300&fit=crop',
                        'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=400&h=300&fit=crop',
                        'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=400&h=300&fit=crop',
                        'https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&h=300&fit=crop',
                        'https://images.unsplash.com/photo-1541872705-1f73c6400ec9?w=400&h=300&fit=crop',
                        'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=300&fit=crop',
                        'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=300&fit=crop',
                        'https://images.unsplash.com/photo-1586339949916-3e9457bef6d3?w=400&h=300&fit=crop',
                        'https://images.unsplash.com/photo-1482062364825-616fd23b8fc1?w=400&h=300&fit=crop',
                        'https://images.unsplash.com/photo-1526666923127-b2970f64b422?w=400&h=300&fit=crop',
                        'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop'
                      ];
                      
                      // Create unique hash from article ID for consistent image selection
                      const hash = article.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
                      const imageIndex = hash % politicalImages.length;
                      
                      return (
                        <div
                          key={article.id}
                          className="animate-fade-in hover-scale"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <InteractiveArticleCard 
                            article={{
                              ...article,
                              featured_image_url: article.image_url || politicalImages[imageIndex],
                              category: article.source,
                              views: article.views || 0,
                              likes: 0,
                              credits_required: 0,
                              is_premium: false,
                              status: 'published',
                              author_id: '',
                              created_at: article.published_at,
                              meta_description: '',
                              meta_keywords: [],
                              tags: [],
                              updated_at: article.published_at
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>

              {/* College News Section */}
              <section className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
                <div className="flex items-center gap-3 mb-6">
                  <Users className="h-7 w-7 text-blue-500 animate-float" />
                  <h2 className="text-2xl font-bold text-foreground">College & University News</h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-blue-500/50 to-transparent" />
                </div>
                {loading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="bg-card border border-border rounded-lg p-4 animate-pulse">
                        <div className="w-full h-48 bg-muted rounded mb-4"></div>
                        <div className="h-4 bg-muted rounded mb-2"></div>
                        <div className="h-4 bg-muted rounded w-3/4"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                     {categorizedNews.college.map((article, index) => {
                      const collegeImages = [
                        'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop',
                        'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&h=300&fit=crop',
                        'https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=300&fit=crop',
                        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop',
                        'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&h=300&fit=crop',
                        'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop',
                        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
                        'https://images.unsplash.com/photo-1576267423445-b2f8b13e1923?w=400&h=300&fit=crop'
                      ];
                      
                      // Create unique hash from article ID for consistent image selection
                      const hash = article.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
                      const imageIndex = hash % collegeImages.length;
                      
                      return (
                        <div
                          key={article.id}
                          className="animate-fade-in hover-scale"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <InteractiveArticleCard 
                            article={{
                              ...article,
                              featured_image_url: article.image_url || collegeImages[imageIndex],
                              category: article.source,
                              views: article.views || 0,
                              likes: 0,
                              credits_required: 0,
                              is_premium: false,
                              status: 'published',
                              author_id: '',
                              created_at: article.published_at,
                              meta_description: '',
                              meta_keywords: [],
                              tags: [],
                              updated_at: article.published_at
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>

              {/* Celebrity News Section */}
              <section className="animate-fade-in" style={{ animationDelay: '0.7s' }}>
                <div className="flex items-center gap-3 mb-6">
                  <Trophy className="h-7 w-7 text-purple-500 animate-float" />
                  <h2 className="text-2xl font-bold text-foreground">Virginia Celebrity News</h2>
                  <div className="flex-1 h-px bg-gradient-to-r from-purple-500/50 to-transparent" />
                </div>
                {loading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="bg-card border border-border rounded-lg p-4 animate-pulse">
                        <div className="w-full h-48 bg-muted rounded mb-4"></div>
                        <div className="h-4 bg-muted rounded mb-2"></div>
                        <div className="h-4 bg-muted rounded w-3/4"></div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {categorizedNews.celebrity.map((article, index) => (
                      <div
                        key={article.id}
                        className="animate-fade-in hover-scale"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <InteractiveArticleCard 
                          article={{
                            ...article,
                            featured_image_url: article.image_url,
                            content: article.excerpt,
                            views: 0,
                            likes: 0,
                            credits_required: 0,
                            is_premium: false,
                            status: 'published',
                            author_id: '',
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
