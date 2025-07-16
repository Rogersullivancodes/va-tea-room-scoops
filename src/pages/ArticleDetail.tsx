// src/pages/ArticleDetail.tsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { ArrowLeft, Clock, Eye, Heart, Share2, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThemeProvider from '@/components/ThemeProvider';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

type Article = Tables<'articles'>;

const ArticleDetail: React.FC = () => {
  const { articleSlug } = useParams<{ articleSlug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!articleSlug) {
        setError('No article specified');
        setLoading(false);
        return;
      }

      setLoading(true);
      console.log(`Fetching article with slug: ${articleSlug}`);

      try {
        // Create a slug from the URL parameter to match against titles
        const titleQuery = articleSlug.replace(/-/g, ' ');
        
        const { data, error: fetchError } = await supabase
          .from('articles')
          .select('*')
          .eq('status', 'published')
          .ilike('title', `%${titleQuery}%`)
          .single();

        if (fetchError) {
          console.error('Error fetching article:', fetchError);
          setError('Article not found');
          setLoading(false);
          return;
        }

        setArticle(data);
        
        // Update view count
        if (data) {
          const { error: updateError } = await supabase
            .from('articles')
            .update({ views: (data.views || 0) + 1 })
            .eq('id', data.id);
            
          if (updateError) {
            console.error('Error updating view count:', updateError);
          }
        }
      } catch (err) {
        console.error('Error:', err);
        setError('Failed to load article');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [articleSlug]);

  if (loading) {
    return (
      <ThemeProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1 container mx-auto py-12 px-4">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading article...</p>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      </ThemeProvider>
    );
  }

  if (error || !article) {
    return (
      <ThemeProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1 container mx-auto py-12 px-4">
            <div className="text-center py-16">
              <h1 className="text-4xl font-bold text-muted-foreground mb-4">Article Not Found</h1>
              <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist or has been removed.</p>
              <Link to="/articles">
                <Button>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Articles
                </Button>
              </Link>
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
          <div className="container mx-auto max-w-4xl">
            {/* Back button */}
            <div className="mb-6">
              <Link to="/articles">
                <Button variant="ghost" className="hover:bg-muted">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Articles
                </Button>
              </Link>
            </div>

            {/* Article header */}
            <Card className="mb-8 p-6 md:p-8">
              <div className="space-y-4">
                {/* Category badge */}
                {article.category && (
                  <Badge variant="secondary" className="mb-2">
                    {article.category}
                  </Badge>
                )}
                
                {/* Title */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                  {article.title}
                </h1>
                
                {/* Excerpt */}
                {article.excerpt && (
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {article.excerpt}
                  </p>
                )}
                
                {/* Meta information */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>By Staff Writer</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>
                      {article.published_at 
                        ? format(new Date(article.published_at), 'MMMM d, yyyy') 
                        : format(new Date(article.created_at), 'MMMM d, yyyy')
                      }
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>{article.views || 0} views</span>
                  </div>
                  {article.likes && article.likes > 0 && (
                    <div className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      <span>{article.likes} likes</span>
                    </div>
                  )}
                </div>
                
                {/* Tags */}
                {article.tags && article.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </Card>

            {/* Featured image */}
            {article.featured_image_url && (
              <div className="mb-8">
                <img
                  src={article.featured_image_url}
                  alt={article.title}
                  className="w-full h-48 md:h-64 lg:h-80 object-cover rounded-lg shadow-lg"
                />
              </div>
            )}

            {/* Article content */}
            <Card className="p-6 md:p-8">
              <div 
                className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-foreground prose-p:text-foreground prose-a:text-primary prose-strong:text-foreground prose-em:text-foreground prose-blockquote:text-muted-foreground prose-blockquote:border-l-primary prose-code:text-foreground prose-pre:bg-muted prose-pre:text-foreground prose-li:text-foreground"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </Card>

            {/* Share buttons */}
            <div className="mt-8 flex justify-center">
              <Card className="p-4">
                <div className="flex items-center justify-center gap-4">
                  <span className="text-sm font-medium text-muted-foreground">Share this article:</span>
                  <Button variant="outline" size="sm">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default ArticleDetail;
