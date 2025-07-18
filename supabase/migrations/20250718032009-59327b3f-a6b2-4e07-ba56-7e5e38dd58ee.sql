-- Add priority column to news_articles table for better sorting
ALTER TABLE public.news_articles 
ADD COLUMN priority INTEGER DEFAULT 1;

-- Create index on priority column for better query performance
CREATE INDEX idx_news_articles_priority ON public.news_articles(priority);

-- Update existing articles to have priority 1 (political news)
UPDATE public.news_articles SET priority = 1;