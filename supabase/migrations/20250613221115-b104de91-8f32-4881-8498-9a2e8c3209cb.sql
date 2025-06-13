
-- Create a table to store news articles
CREATE TABLE public.news_articles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  source TEXT NOT NULL,
  url TEXT,
  image_url TEXT,
  published_at TIMESTAMP WITH TIME ZONE NOT NULL,
  category TEXT DEFAULT 'politics',
  views INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (make articles publicly readable)
ALTER TABLE public.news_articles ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access to news articles
CREATE POLICY "News articles are publicly readable" 
  ON public.news_articles 
  FOR SELECT 
  USING (true);

-- Create policy to allow service role to insert/update articles
CREATE POLICY "Service role can manage news articles" 
  ON public.news_articles 
  FOR ALL 
  USING (auth.role() = 'service_role');

-- Enable realtime for news articles
ALTER TABLE public.news_articles REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.news_articles;

-- Create an index for better performance
CREATE INDEX idx_news_articles_published_at ON public.news_articles(published_at DESC);
CREATE INDEX idx_news_articles_category ON public.news_articles(category);
