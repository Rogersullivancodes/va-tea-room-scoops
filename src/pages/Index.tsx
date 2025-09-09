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
import SearchBar from '@/components/SearchBar';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ThemeProvider from '@/components/ThemeProvider';
import { useNews } from '@/hooks/useNews';
import { useArticles } from '@/hooks/useArticles';
import { useCelebrityNews } from '@/hooks/useCelebrityNews';

// Import thumbnail images
import politicalThumb from '@/assets/political-news-thumb.jpg';
import collegeThumb from '@/assets/college-news-thumb.jpg';
import entertainmentThumb from '@/assets/entertainment-news-thumb.jpg';
import generalThumb from '@/assets/general-news-thumb.jpg';
import featuredThumb from '@/assets/featured-article-thumb.jpg';

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
          {/* Search Bar - Full Width */}
          <section className="mb-8">
            <SearchBar className="max-w-2xl mx-auto" />
          </section>

          {/* Premium Ad Space - Full Width */}
          <section className="bg-gradient-to-r from-primary/10 to-secondary/10 p-8 rounded-lg border mb-8">
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold text-foreground">Premium Ad Space</h3>
              <p className="text-muted-foreground">Reach thousands of engaged political news readers</p>
              <Button size="lg" asChild>
                <Link to="/ad-submission">Advertise With Us</Link>
              </Button>
            </div>
          </section>

          {/* Sidebar Content Below */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ReadingListWidget />
            <AdSpaces />
          </div>
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Index;