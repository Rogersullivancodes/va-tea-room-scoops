
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

type Article = Tables<'articles'>;
type NewsArticle = Tables<'news_articles'>;

type SearchResult = Article | (NewsArticle & { 
  isNewsArticle: true;
  excerpt: string;
  published_at: string;
});

interface SearchBarProps {
  onArticleSelect?: (article: SearchResult) => void;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onArticleSelect, className }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const searchArticles = async () => {
      if (search.length < 2) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        // Search both articles and news_articles in parallel
        const [articlesResponse, newsResponse] = await Promise.all([
          supabase
            .from('articles')
            .select('*')
            .eq('status', 'published')
            .or(`title.ilike.%${search}%, content.ilike.%${search}%, excerpt.ilike.%${search}%`)
            .order('published_at', { ascending: false })
            .limit(5),
          supabase
            .from('news_articles')
            .select('*')
            .or(`title.ilike.%${search}%, content.ilike.%${search}%`)
            .order('created_at', { ascending: false })
            .limit(5)
        ]);

        if (articlesResponse.error) throw articlesResponse.error;
        if (newsResponse.error) throw newsResponse.error;

        // Combine results and mark news articles
        const combinedResults: SearchResult[] = [
          ...(articlesResponse.data || []),
          ...(newsResponse.data || []).map(news => ({
            ...news,
            published_at: news.created_at,
            excerpt: news.content.substring(0, 200) + '...',
            isNewsArticle: true as const
          }))
        ];

        setResults(combinedResults);
      } catch (err) {
        console.error('Search error:', err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchArticles, 300);
    return () => clearTimeout(debounceTimer);
  }, [search]);

  const handleSelect = (article: SearchResult) => {
    setOpen(false);
    setSearch('');
    onArticleSelect?.(article);
  };

  const clearSearch = () => {
    setSearch('');
    setResults([]);
  };

  return (
    <div className={className}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search political news..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setOpen(true)}
              className="pl-10 pr-10"
            />
            {search && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearSearch}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-96 p-0" align="start">
          <Command>
            <CommandInput placeholder="Search articles..." value={search} onValueChange={setSearch} />
            <CommandList>
              {loading && (
                <div className="p-4 text-center text-sm text-gray-500">
                  Searching...
                </div>
              )}
              {!loading && search.length >= 2 && results.length === 0 && (
                <CommandEmpty>No articles found.</CommandEmpty>
              )}
              {results.length > 0 && (
                <CommandGroup>
                  {results.map((article) => (
                    <CommandItem
                      key={article.id}
                      onSelect={() => handleSelect(article)}
                      className="cursor-pointer"
                    >
                      <div className="flex flex-col space-y-1">
                        <span className="font-medium">{article.title}</span>
                        {article.excerpt && (
                          <span className="text-xs text-gray-500 line-clamp-2">
                            {article.excerpt}
                          </span>
                        )}
                        <div className="flex items-center space-x-2 text-xs text-gray-400">
                          <span className={`px-2 py-1 rounded text-xs ${(article as any).isNewsArticle ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
                            {(article as any).isNewsArticle ? 'NEWS' : 'ARTICLE'}
                          </span>
                          <span>•</span>
                          <span>{article.category}</span>
                          <span>•</span>
                          <span>{article.views || 0} views</span>
                        </div>
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SearchBar;
