import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Eye, Clock, ExternalLink, RefreshCw, Filter } from 'lucide-react';
import { format } from 'date-fns';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThemeProvider from '@/components/ThemeProvider';
import { useNews } from '@/hooks/useNews';
import type { Tables } from '@/integrations/supabase/types';

type NewsArticle = Tables<'news_articles'>;

const News: React.FC = () => {
  const { articles, loading, error, fetchMoreNews } = useNews();
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const category = searchParams.get('category');
  
  // Category mapping for filtering
  const categoryKeywords = {
    social: ['social media', 'twitter', 'facebook', 'instagram', 'tiktok', 'post', 'tweet'],
    scandals: ['scandal', 'controversy', 'gaffe', 'mistake', 'error', 'blunder'],
    money: ['money', 'funding', 'donation', 'finance', 'campaign finance', 'lobbying'],
    election: ['election', 'vote', 'poll', 'candidate', 'campaign', 'ballot'],
    gossip: ['gossip', 'rumor', 'insider', 'behind scenes', 'leak', 'exclusive']
  };
  
  // Filter articles based on category
  const filteredArticles = useMemo(() => {
    if (!category || !categoryKeywords[category as keyof typeof categoryKeywords]) {
      return articles;
    }
    
    const keywords = categoryKeywords[category as keyof typeof categoryKeywords];
    return articles.filter(article => {
      const searchText = `${article.title} ${article.content} ${article.excerpt || ''}`.toLowerCase();
      return keywords.some(keyword => searchText.includes(keyword.toLowerCase()));
    });
  }, [articles, category]);
  
  const getCategoryTitle = () => {
    const titles = {
      social: 'Social Media Slips',
      scandals: 'Scandals & Gaffes', 
      money: 'Money in Politics',
      election: 'Election Coverage',
      gossip: 'Capitol Gossip'
    };
    return category ? titles[category as keyof typeof titles] || 'Latest Political News' : 'Latest Political News';
  };

  const handleFetchLatest = async () => {
    setIsFetching(true);
    try {
      await fetchMoreNews();
    } finally {
      setIsFetching(false);
    }
  };

  const handleArticleClick = (article: NewsArticle) => {
    setSelectedArticle(article);
    setIsDialogOpen(true);
  };

  const getPlaceholderImage = (index: number) => {
    const placeholders = [
      'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop'
    ];
    return placeholders[index % placeholders.length];
  };

  if (loading) {
    return (
      <ThemeProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1 container mx-auto py-12 px-4">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading latest news...</p>
            </div>
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 py-8 px-4">
          <div className="container mx-auto max-w-6xl">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                {getCategoryTitle()}
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
                {category ? `Browse articles in the ${getCategoryTitle()} category` : 'Stay updated with the latest political developments from Virginia and beyond'}
              </p>
              {category && (
                <div className="flex items-center justify-center mb-4">
                  <Badge variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Filtered by: {getCategoryTitle()}
                  </Badge>
                </div>
              )}
              <Button 
                onClick={handleFetchLatest}
                disabled={isFetching}
                className="mb-8"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${isFetching ? 'animate-spin' : ''}`} />
                {isFetching ? 'Fetching...' : 'Fetch Latest News'}
              </Button>
            </div>

            {/* News Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article, index) => (
                <Card 
                  key={article.id} 
                  className="group hover:shadow-lg transition-all duration-300 cursor-pointer"
                  onClick={() => handleArticleClick(article)}
                >
                  <div className="w-full h-48 overflow-hidden rounded-t-lg">
                    <img
                      src={article.image_url || getPlaceholderImage(index)}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.currentTarget.src = getPlaceholderImage(index);
                      }}
                    />
                  </div>
                  <CardHeader className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {article.source}
                      </Badge>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Clock className="h-3 w-3 mr-1" />
                        {format(new Date(article.published_at), 'MMM d')}
                      </div>
                    </div>
                    <CardTitle className="text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    {article.excerpt && (
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                        {article.excerpt}
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Eye className="h-3 w-3" />
                          <span>{article.views || 0}</span>
                        </div>
                      </div>
                      {article.url && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(article.url, '_blank', 'noopener,noreferrer');
                          }}
                        >
                          <ExternalLink className="h-4 w-4 mr-1" />
                          Source
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredArticles.length === 0 && articles.length > 0 && (
              <div className="text-center py-16">
                <h3 className="text-2xl font-semibold text-muted-foreground mb-2">No articles found in this category</h3>
                <p className="text-muted-foreground mb-4">Try browsing all news or check back later for updates in this category.</p>
              </div>
            )}

            {articles.length === 0 && (
              <div className="text-center py-16">
                <h3 className="text-2xl font-semibold text-muted-foreground mb-2">No news available</h3>
                <p className="text-muted-foreground mb-4">Check back later for the latest updates.</p>
                <Button onClick={handleFetchLatest} disabled={isFetching}>
                  <RefreshCw className={`h-4 w-4 mr-2 ${isFetching ? 'animate-spin' : ''}`} />
                  {isFetching ? 'Fetching...' : 'Fetch Latest News'}
                </Button>
              </div>
            )}

            {/* Article Reading Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                {selectedArticle && (
                  <>
                    <DialogHeader>
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant="secondary" className="text-sm">
                          {selectedArticle.source}
                        </Badge>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-4 w-4 mr-1" />
                          {format(new Date(selectedArticle.published_at), 'MMM d, yyyy')}
                        </div>
                      </div>
                      <DialogTitle className="text-xl md:text-2xl leading-tight">
                        {selectedArticle.title}
                      </DialogTitle>
                    </DialogHeader>
                    
                    {(selectedArticle.image_url || selectedArticle) && (
                      <div className="w-full h-64 rounded-lg overflow-hidden mb-4">
                        <img
                          src={selectedArticle.image_url || getPlaceholderImage(0)}
                          alt={selectedArticle.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = getPlaceholderImage(0);
                          }}
                        />
                      </div>
                    )}
                    
                    <div className="prose prose-sm max-w-none">
                      {selectedArticle.excerpt && (
                        <p className="text-lg text-muted-foreground mb-4">
                          {selectedArticle.excerpt}
                        </p>
                      )}
                      
                      <div className="whitespace-pre-wrap text-foreground">
                        {selectedArticle.content}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-6 pt-4 border-t">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>{selectedArticle.views || 0} views</span>
                        </div>
                      </div>
                      {selectedArticle.url && (
                        <Button asChild>
                          <a href={selectedArticle.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Read Original Article
                          </a>
                        </Button>
                      )}
                    </div>
                  </>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default News;