
import React from 'react';
import { ArrowRight, Eye, MessageSquare, Share2, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNews } from '@/hooks/useNews';
import { format } from 'date-fns';

const TeaDropsSection: React.FC = () => {
  const { articles, loading, error, fetchMoreNews } = useNews();

  const handleFetchNews = async () => {
    await fetchMoreNews();
  };

  if (loading) {
    return (
      <section id="tea-drops" className="py-14 bg-lightgray relative">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-maroon"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="tea-drops" className="py-14 bg-lightgray relative">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-red-600">Error loading news: {error}</p>
            <Button onClick={handleFetchNews} className="mt-4">
              Try Again
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="tea-drops" className="py-14 bg-lightgray relative">
      {/* Ad sidebar - desktop only */}
      <div className="hidden lg:block absolute right-4 top-20 w-48 h-[600px] bg-white shadow-md rounded-lg overflow-hidden">
        <div className="bg-navy text-white p-2 text-center text-xs">ADVERTISEMENT</div>
        <div className="p-3 text-center">
          <p className="text-sm">Premium ad space available</p>
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-maroon mb-2">
              Live Virginia Political News
            </h2>
            <p className="text-gray-600">Real-time updates from across the Commonwealth</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              onClick={handleFetchNews}
              variant="outline"
              size="sm"
              className="flex items-center space-x-2"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Fetch Latest</span>
            </Button>
            <a href="#more-tea" className="text-navy font-medium flex items-center hover:text-maroon">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </a>
          </div>
        </div>
        
        {articles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No news articles available yet.</p>
            <Button onClick={handleFetchNews}>
              Fetch Latest News
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.slice(0, 6).map((article) => (
              <Card key={article.id} className="card-shadow group">
                <div className="h-56 overflow-hidden rounded-t-lg relative">
                  <img 
                    src={article.image_url || "https://images.unsplash.com/photo-1494522358652-f30e61a60313?w=400&h=300&fit=crop"} 
                    alt={article.title} 
                    className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold text-white bg-maroon px-2 py-1 rounded">
                      {article.category}
                    </span>
                    <span className="text-xs text-gray-500">
                      {format(new Date(article.published_at), 'MMM d, yyyy')}
                    </span>
                  </div>
                  <CardTitle className="text-xl font-bold text-navy group-hover:text-maroon transition-colors">
                    <a href={article.url || `#story-${article.id}`}>{article.title}</a>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{article.excerpt || article.content.substring(0, 150) + "..."}</p>
                  <p className="text-sm text-gray-500 mt-2 font-medium">Source: {article.source}</p>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <div className="flex space-x-4 text-gray-500">
                    <span className="flex items-center text-sm">
                      <Eye className="h-4 w-4 mr-1" /> {article.views?.toLocaleString() || 0}
                    </span>
                    <span className="flex items-center text-sm">
                      <MessageSquare className="h-4 w-4 mr-1" /> {article.comments || 0}
                    </span>
                  </div>
                  <button className="text-maroon hover:text-navy">
                    <Share2 className="h-5 w-5" />
                  </button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
        
        {/* Newsletter signup - revenue generator */}
        <div className="mt-14 bg-gradient-to-r from-navy to-maroon p-6 md:p-8 rounded-lg text-white shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-6">
              <h3 className="text-2xl font-bold mb-2">Get Insider Access</h3>
              <p className="text-white/80">Subscribe to our premium newsletter for exclusive stories and analysis</p>
            </div>
            <div className="flex w-full md:w-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-3 rounded-l-md w-full md:w-64 text-gray-900"
              />
              <button className="bg-gold hover:bg-gold/90 text-black font-bold px-6 py-3 rounded-r-md transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeaDropsSection;
