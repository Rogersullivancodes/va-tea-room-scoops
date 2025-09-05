import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Clock, ChevronRight, Star } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import InteractiveArticleCard from '@/components/InteractiveArticleCard';
import ReadingListWidget from '@/components/ReadingListWidget';
import AdSpaces from '@/components/AdSpaces';
import DynamicTopBanner from '@/components/DynamicTopBanner';
import NewsTicker from '@/components/NewsTicker';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ThemeProvider from '@/components/ThemeProvider';
import { useNews } from '@/hooks/useNews';
import { useArticles } from '@/hooks/useArticles';
import { useCelebrityNews } from '@/hooks/useCelebrityNews';

const Index: React.FC = () => {
  const { articles: newsArticles, loading: newsLoading } = useNews();
  const { articles, loading: articlesLoading } = useArticles();
  const { articles: celebrityArticles, loading: celebrityLoading } = useCelebrityNews();
  const [featuredNewsArticle, setFeaturedNewsArticle] = useState(null);

  // Categorize news articles with keywords
  const categorizedNews = useMemo(() => {
    const politicalKeywords = ['politics', 'government', 'election', 'vote', 'policy', 'senate', 'congress', 'president', 'biden', 'trump'];
    const collegeKeywords = ['college', 'university', 'student', 'campus', 'academic', 'tuition', 'degree', 'graduation'];
    
    const political = newsArticles
      .filter(article => 
        article.category === 'politics' || 
        politicalKeywords.some(keyword => 
          article.title.toLowerCase().includes(keyword) || 
          article.excerpt?.toLowerCase().includes(keyword)
        )
      )
      .slice(0, 6);

    const college = newsArticles
      .filter(article => 
        article.category === 'college' || 
        collegeKeywords.some(keyword => 
          article.title.toLowerCase().includes(keyword) || 
          article.excerpt?.toLowerCase().includes(keyword)
        )
      )
      .slice(0, 4);

    const other = newsArticles
      .filter(article => 
        !political.includes(article) && 
        !college.includes(article)
      )
      .slice(0, 4);

    return { political, college, other };
  }, [newsArticles]);

  // Set featured article - prioritize political news
  useEffect(() => {
    if (categorizedNews.political.length > 0) {
      setFeaturedNewsArticle(categorizedNews.political[0]);
    } else if (newsArticles.length > 0) {
      setFeaturedNewsArticle(newsArticles[0]);
    }
  }, [categorizedNews.political, newsArticles]);

  const featuredArticles = articles.slice(0, 3);
  const celebNews = celebrityArticles.slice(0, 4);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <DynamicTopBanner />
        <NewsTicker />
        
        <main className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-3 space-y-12">
              
              {/* Hero Section */}
              <Hero />

              {/* Political News Section */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold text-foreground flex items-center gap-2">
                    <Star className="h-6 w-6 text-primary" />
                    Breaking Political News
                  </h2>
                  <Button variant="outline" asChild>
                    <Link to="/news?category=politics" className="flex items-center gap-2">
                      All Breaking News <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {newsLoading ? (
                    Array.from({ length: 6 }).map((_, i) => (
                      <Card key={i} className="overflow-hidden">
                        <Skeleton className="h-48 w-full" />
                        <CardContent className="p-4">
                          <Skeleton className="h-4 w-full mb-2" />
                          <Skeleton className="h-4 w-3/4" />
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    categorizedNews.political.map((article, index) => (
                      <InteractiveArticleCard
                        key={article.id}
                        article={{
                          ...article,
                          author_id: '',
                          credits_required: 0,
                          featured_image_url: article.image_url || `https://images.unsplash.com/photo-${1649972904349 + index}?w=400&h=300&fit=crop&auto=format`,
                          is_premium: false,
                          likes: 0,
                          meta_description: article.excerpt || '',
                          meta_keywords: [],
                          status: 'published',
                          tags: [],
                          updated_at: article.updated_at
                        }}
                      />
                    ))
                  )}
                </div>
              </section>

              {/* College News Section */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold text-foreground">College & Campus News</h2>
                  <Button variant="outline" asChild>
                    <Link to="/news?category=college" className="flex items-center gap-2">
                      View All <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {newsLoading ? (
                    Array.from({ length: 4 }).map((_, i) => (
                      <Card key={i} className="overflow-hidden">
                        <Skeleton className="h-48 w-full" />
                        <CardContent className="p-4">
                          <Skeleton className="h-4 w-full mb-2" />
                          <Skeleton className="h-4 w-3/4" />
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    categorizedNews.college.map((article, index) => (
                      <InteractiveArticleCard
                        key={article.id}
                        article={{
                          ...article,
                          author_id: '',
                          credits_required: 0,
                          featured_image_url: article.image_url || `https://images.unsplash.com/photo-${1488590528505 + index}?w=400&h=300&fit=crop&auto=format`,
                          is_premium: false,
                          likes: 0,
                          meta_description: article.excerpt || '',
                          meta_keywords: [],
                          status: 'published',
                          tags: [],
                          updated_at: article.updated_at
                        }}
                      />
                    ))
                  )}
                </div>
              </section>

              {/* Featured Articles Section */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold text-foreground">Featured Articles</h2>
                  <Button variant="outline" asChild>
                    <Link to="/articles" className="flex items-center gap-2">
                      All Articles <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {articlesLoading ? (
                    Array.from({ length: 3 }).map((_, i) => (
                      <Card key={i} className="overflow-hidden">
                        <Skeleton className="h-48 w-full" />
                        <CardContent className="p-4">
                          <Skeleton className="h-4 w-full mb-2" />
                          <Skeleton className="h-4 w-3/4" />
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    featuredArticles.map((article) => (
                      <InteractiveArticleCard
                        key={article.id}
                        article={article}
                      />
                    ))
                  )}
                </div>
              </section>

              {/* Celebrity & Entertainment News Section */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-bold text-foreground">Celebrity & Entertainment</h2>
                  <Button variant="outline" asChild>
                    <Link to="/news?category=entertainment" className="flex items-center gap-2">
                      View All <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {celebrityLoading ? (
                    Array.from({ length: 4 }).map((_, i) => (
                      <Card key={i} className="overflow-hidden">
                        <Skeleton className="h-48 w-full" />
                        <CardContent className="p-4">
                          <Skeleton className="h-4 w-full mb-2" />
                          <Skeleton className="h-4 w-3/4" />
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    celebNews.map((article, index) => (
                      <InteractiveArticleCard
                        key={article.id}
                        article={{
                          ...article,
                          author_id: '',
                          category: 'entertainment',
                          content: article.excerpt || '',
                          created_at: article.published_at,
                          credits_required: 0,
                          featured_image_url: article.image_url || `https://images.unsplash.com/photo-${1511671782779 + index}?w=400&h=300&fit=crop&auto=format`,
                          is_premium: false,
                          likes: 0,
                          meta_description: article.excerpt || '',
                          meta_keywords: [],
                          status: 'published',
                          tags: [],
                          updated_at: article.published_at,
                          views: 0
                        }}
                      />
                    ))
                  )}
                </div>
              </section>

              {/* Premium Ad Space */}
              <section className="bg-gradient-to-r from-primary/10 to-secondary/10 p-8 rounded-lg border">
                <div className="text-center space-y-4">
                  <h3 className="text-2xl font-bold text-foreground">Premium Ad Space</h3>
                  <p className="text-muted-foreground">Reach thousands of engaged political news readers</p>
                  <Button size="lg" asChild>
                    <Link to="/ad-submission">Advertise With Us</Link>
                  </Button>
                </div>
              </section>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-6">
              <ReadingListWidget />
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