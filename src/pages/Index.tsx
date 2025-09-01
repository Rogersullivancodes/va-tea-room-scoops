
import React, { useState, useEffect, useMemo } from 'react';
import ThemeProvider from '@/components/ThemeProvider';
import FullscreenVideoBanner from '@/components/FullscreenVideoBanner';
import FeaturedNewsSection from '@/components/FeaturedNewsSection';
import NewsCard from '@/components/NewsCard';
import NewsModal from '@/components/NewsModal';
import Footer from '@/components/Footer';
import { useNews } from '@/hooks/useNews';
import { Zap, AlertTriangle } from 'lucide-react';

// Types for news items
interface NewsItem {
  id: string;
  title: string;
  description: string;
  sourceName: string;
  articleUrl?: string;
  thumbnailUrl: string;
  videoUrl?: string;
  category: string;
  publishedAt: string;
}

const Index = () => {
  const { articles: newsArticles, loading: newsLoading } = useNews();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Transform news articles to required format
  const transformedNews: NewsItem[] = useMemo(() => {
    return newsArticles.map(article => ({
      id: article.id,
      title: article.title,
      description: article.excerpt || article.content?.substring(0, 200) + '...' || 'No description available',
      sourceName: (article as any).source || 'News Source',
      articleUrl: (article as any).url || '',
      thumbnailUrl: (article as any).image_url || '',
      category: (article as any).category || 'politics',
      publishedAt: article.published_at
    }));
  }, [newsArticles]);

  // Sort news: Political first, then university, each sorted by date
  const sortedNews = useMemo(() => {
    const politicalNews = transformedNews
      .filter(news => news.category === 'politics')
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    
    const universityNews = transformedNews
      .filter(news => news.category === 'university')
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    
    return [...politicalNews, ...universityNews];
  }, [transformedNews]);

  // Filter news based on search query (only political news when searching)
  const filteredNews = useMemo(() => {
    if (!searchQuery.trim()) {
      return sortedNews;
    }
    
    // Only search through political news
    const politicalNews = sortedNews.filter(news => news.category === 'politics');
    return politicalNews.filter(news =>
      news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      news.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [sortedNews, searchQuery]);

  // Featured news (first item)
  const featuredNews = filteredNews[0];
  
  // Breaking news grid (remaining items)
  const breakingNews = filteredNews.slice(1);

  const handleNewsClick = (news: NewsItem) => {
    setSelectedNews(news);
    setIsModalOpen(true);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        {/* Full Viewport Video Banner */}
        <FullscreenVideoBanner onSearch={handleSearch} searchQuery={searchQuery} />
        
        {/* Main Content */}
        <main className="container mx-auto px-4 py-12 space-y-12">
          {/* Loading State */}
          {newsLoading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading latest news...</p>
            </div>
          )}

          {/* Search Results Info */}
          {searchQuery && (
            <div className="bg-muted/50 border border-border rounded-lg p-4 mb-8">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <AlertTriangle className="w-4 h-4" />
                <span>
                  Showing results for "{searchQuery}". University news is hidden during search.
                </span>
              </div>
            </div>
          )}

          {/* Featured News Section */}
          {featuredNews && (
            <FeaturedNewsSection 
              featuredNews={featuredNews}
              onReadMore={() => handleNewsClick(featuredNews)}
            />
          )}

          {/* Breaking News Grid */}
          {breakingNews.length > 0 && (
            <section className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center gap-3 mb-8">
                <Zap className="h-7 w-7 text-primary animate-float" />
                <h2 className="text-3xl font-bold text-foreground">Breaking News</h2>
                <div className="flex-1 h-px bg-gradient-to-r from-primary/50 to-transparent" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {breakingNews.map((news, index) => (
                  <NewsCard
                    key={news.id}
                    news={news}
                    onClick={() => handleNewsClick(news)}
                    className={`animate-fade-in`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  />
                ))}
              </div>
            </section>
          )}

          {/* No Results */}
          {!newsLoading && filteredNews.length === 0 && (
            <div className="text-center py-12">
              <AlertTriangle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No news found</h3>
              <p className="text-muted-foreground">
                {searchQuery ? 'Try adjusting your search terms.' : 'Check back later for the latest updates.'}
              </p>
            </div>
          )}
        </main>

        {/* News Modal */}
        <NewsModal 
          news={selectedNews}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />

        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Index;
