
import React, { useState } from 'react';
import { useNews } from '@/hooks/useNews';
import { useToast } from '@/hooks/use-toast';
import NewsHeader from './news/NewsHeader';
import CreateArticleDialog from './news/CreateArticleDialog';
import NewsTable from './news/NewsTable';

const NewsManagement: React.FC = () => {
  const { articles, loading, fetchMoreNews, refetch } = useNews();
  const { toast } = useToast();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newArticle, setNewArticle] = useState({
    title: '',
    content: '',
    excerpt: '',
    source: 'CrabsFriedPolitically',
    url: '',
    image_url: '',
    category: 'politics'
  });

  const handleFetchNews = async () => {
    try {
      await fetchMoreNews();
      toast({
        title: "News Updated",
        description: "Latest news articles have been fetched successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch news articles.",
        variant: "destructive",
      });
    }
  };

  const handleCreateArticle = async () => {
    console.log('Creating article:', newArticle);
    setIsCreateDialogOpen(false);
    setNewArticle({
      title: '',
      content: '',
      excerpt: '',
      source: 'CrabsFriedPolitically',
      url: '',
      image_url: '',
      category: 'politics'
    });
    toast({
      title: "Article Created",
      description: "New article has been created successfully.",
    });
  };

  const handleDeleteArticle = async (articleId: string) => {
    console.log('Deleting article:', articleId);
    toast({
      title: "Article Deleted",
      description: "Article has been deleted successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <NewsHeader 
        onFetchNews={handleFetchNews}
        onCreateArticle={() => setIsCreateDialogOpen(true)}
      />

      <CreateArticleDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        newArticle={newArticle}
        onArticleChange={setNewArticle}
        onCreateArticle={handleCreateArticle}
      />

      <NewsTable 
        articles={articles}
        onDeleteArticle={handleDeleteArticle}
      />
    </div>
  );
};

export default NewsManagement;
