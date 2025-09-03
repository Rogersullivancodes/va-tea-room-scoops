import { useState, useEffect } from 'react';

interface CelebrityNews {
  id: string;
  title: string;
  excerpt: string;
  source: string;
  published_at: string;
  image_url?: string;
  url?: string;
  category: 'celebrity';
}

export const useCelebrityNews = () => {
  const [articles, setArticles] = useState<CelebrityNews[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Virginia celebrity news with varied thumbnails
  const virginiaCelebrity = [
    {
      id: 'celeb-1',
      title: 'Pharrell Williams Announces New Virginia Music Festival',
      excerpt: 'The Virginia Beach native plans a massive music festival celebrating Virginia artists',
      source: 'Entertainment Tonight',
      published_at: new Date().toISOString(),
      image_url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
      url: '#',
      category: 'celebrity' as const
    },
    {
      id: 'celeb-2', 
      title: 'Missy Elliott Honored at Virginia Museum of Fine Arts',
      excerpt: 'The Portsmouth rapper receives recognition for her cultural impact on Virginia',
      source: 'Billboard',
      published_at: new Date(Date.now() - 86400000).toISOString(),
      image_url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&h=300&fit=crop',
      url: '#',
      category: 'celebrity' as const
    },
    {
      id: 'celeb-3',
      title: 'Chris Brown Visits Richmond for Community Event',
      excerpt: 'The Tappahannock native returns home to support local youth programs',
      source: 'Rolling Stone',
      published_at: new Date(Date.now() - 172800000).toISOString(),
      image_url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
      url: '#',
      category: 'celebrity' as const
    },
    {
      id: 'celeb-4',
      title: 'Ella Fitzgerald Estate Opens New Virginia Exhibit',
      excerpt: 'Newport News celebrates the jazz legend with a comprehensive display',
      source: 'Jazz Weekly',
      published_at: new Date(Date.now() - 259200000).toISOString(),
      image_url: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=300&fit=crop',
      url: '#',
      category: 'celebrity' as const
    },
    {
      id: 'celeb-5',
      title: 'Dave Matthews Band Announces Virginia Tour Dates',
      excerpt: 'The Charlottesville-formed band returns to perform across the Commonwealth',
      source: 'Variety',
      published_at: new Date(Date.now() - 345600000).toISOString(),
      image_url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
      url: '#',
      category: 'celebrity' as const
    },
    {
      id: 'celeb-6',
      title: 'Sandra Bullock Spotted Filming in Virginia Beach',
      excerpt: 'The actress was seen on location for her upcoming thriller project',
      source: 'People Magazine',
      published_at: new Date(Date.now() - 432000000).toISOString(),
      image_url: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=300&fit=crop',
      url: '#',
      category: 'celebrity' as const
    }
  ];

  const fetchCelebrityNews = async () => {
    try {
      setLoading(true);
      
      // Shuffle articles for variety
      const shuffled = [...virginiaCelebrity].sort(() => Math.random() - 0.5);
      
      setArticles(shuffled);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch celebrity news');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCelebrityNews();
    
    // Refresh every 10 minutes
    const interval = setInterval(fetchCelebrityNews, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return {
    articles,
    loading,
    error,
    refetch: fetchCelebrityNews
  };
};