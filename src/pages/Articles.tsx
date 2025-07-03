// Inside your Articles.tsx component
import { Link } from 'react-router-dom';

// A sample list of articles. You would fetch this from Supabase.
const articleList = [
  { title: 'Scandals and Gaffes Shake Up Capitol Hill', slug: 'scandals-and-gaffes' },
  { title: 'Following the Money in Politics', slug: 'money-in-politics' },
  { title: 'Latest Election Coverage and Predictions', slug: 'election-coverage' }
];

// In your return statement, where you map over the articles:
<div>
  {articleList.map(article => (
    <div key={article.slug} className="mb-4">
      <Link to={`/articles/${article.slug}`}>
        <h2 className="text-2xl font-bold hover:underline">{article.title}</h2>
      </Link>
    </div>
  ))}
</div>
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Filter, Grid, List } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThemeProvider from '@/components/ThemeProvider';
import ArticleCard from '@/components/ArticleCard';
import SearchBar from '@/components/SearchBar';
import { useArticles } from '@/hooks/useArticles';

const Articles: React.FC = () => {
  const { articles, loading } = useArticles();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');

  const categories = ['all', 'politics', 'virginia', 'federal', 'local', 'campaigns'];

  const filteredArticles = articles
    .filter(article => categoryFilter === 'all' || article.category === categoryFilter)
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.published_at || '').getTime() - new Date(a.published_at || '').getTime();
        case 'oldest':
          return new Date(a.published_at || '').getTime() - new Date(b.published_at || '').getTime();
        case 'popular':
          return (b.views || 0) - (a.views || 0);
        case 'liked':
          return (b.likes || 0) - (a.likes || 0);
        default:
          return 0;
      }
    });

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col space-y-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                <div>
                  <h1 className="text-3xl font-bold">Political Articles</h1>
                  <p className="text-gray-600 dark:text-gray-300">
                    Latest political news and analysis from Virginia and beyond
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
                <div className="flex-1">
                  <SearchBar className="w-full" />
                </div>
                <div className="flex flex-wrap items-center space-x-2">
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="oldest">Oldest</SelectItem>
                      <SelectItem value="popular">Most Viewed</SelectItem>
                      <SelectItem value="liked">Most Liked</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Badge variant="outline">{filteredArticles.length} articles</Badge>
                {categoryFilter !== 'all' && (
                  <Badge variant="secondary">
                    {categoryFilter.charAt(0).toUpperCase() + categoryFilter.slice(1)}
                  </Badge>
                )}
              </div>

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="bg-gray-200 dark:bg-gray-700 h-48 rounded-lg mb-4"></div>
                      <div className="bg-gray-200 dark:bg-gray-700 h-4 rounded mb-2"></div>
                      <div className="bg-gray-200 dark:bg-gray-700 h-4 rounded w-3/4"></div>
                    </div>
                  ))}
                </div>
              ) : filteredArticles.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No articles found matching your criteria.</p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setCategoryFilter('all');
                      setSortBy('newest');
                    }}
                    className="mt-4"
                  >
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <div className={
                  viewMode === 'grid' 
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "space-y-4"
                }>
                  {filteredArticles.map((article) => (
                    <ArticleCard
                      key={article.id}
                      article={article}
                      onClick={() => {
                        // Navigate to article detail page (to be implemented)
                        console.log('Navigate to article:', article.id);
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default Articles;
