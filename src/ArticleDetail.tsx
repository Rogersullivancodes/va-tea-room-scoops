// src/pages/ArticleDetail.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ThemeProvider from '@/components/ThemeProvider';

// This is a placeholder for your article data structure
interface Article {
  id: string;
  slug: string;
  title: string;
  author: string;
  date: string;
  content: string;
}

const ArticleDetail: React.FC = () => {
  const { articleSlug } = useParams<{ articleSlug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real application, you would fetch this from your Supabase backend
    // using the 'articleSlug' to identify the article.
    const fetchArticle = async () => {
      setLoading(true);
      console.log(`Fetching article with slug: ${articleSlug}`);

      // --- YOUR SUPABASE FETCH LOGIC GOES HERE ---
      // Example: const { data } = await supabase.from('articles').select('*').eq('slug', articleSlug).single();

      // For now, we'll use a timeout to simulate a network request.
      setTimeout(() => {
        const sampleArticle: Article = {
          id: '123',
          slug: articleSlug || 'not-found',
          title: `This is the Title for: ${articleSlug?.replace(/-/g, ' ')}`,
          author: 'A Political Insider',
          date: 'July 3, 2025',
          content: `<p>This is the full story content for the article. It can contain <strong>HTML</strong> tags rendered directly into the page.</p><p>You would fetch this content from your database based on the slug provided in the URL.</p>`,
        };
        setArticle(sampleArticle);
        setLoading(false);
      }, 500);
    };

    fetchArticle();
  }, [articleSlug]);

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto py-12 px-4">
          {loading ? (
            <div>Loading article...</div>
          ) : article ? (
            <article className="prose dark:prose-invert max-w-none">
              <h1>{article.title}</h1>
              <p className="text-sm text-gray-500">By {article.author} on {article.date}</p>
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            </article>
          ) : (
            <div>Article not found.</div>
          )}
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default ArticleDetail;
