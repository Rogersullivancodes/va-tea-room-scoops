
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Plus, Edit, Trash2, RefreshCw, Eye } from 'lucide-react';
import { useNews } from '@/hooks/useNews';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

const NewsManagement: React.FC = () => {
  const { articles, loading, fetchMoreNews, refetch } = useNews();
  const { toast } = useToast();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
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
    // In a real implementation, this would call an API to create the article
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
    // In a real implementation, this would call an API to delete the article
    console.log('Deleting article:', articleId);
    toast({
      title: "Article Deleted",
      description: "Article has been deleted successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">News Management</h2>
        <div className="flex space-x-2">
          <Button 
            onClick={handleFetchNews}
            variant="outline"
            className="border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Fetch Latest News
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-green-600 hover:bg-green-700">
                <Plus className="h-4 w-4 mr-2" />
                Create Article
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Article</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={newArticle.title}
                    onChange={(e) => setNewArticle({...newArticle, title: e.target.value})}
                    className="bg-gray-700 border-gray-600"
                  />
                </div>
                <div>
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    value={newArticle.excerpt}
                    onChange={(e) => setNewArticle({...newArticle, excerpt: e.target.value})}
                    className="bg-gray-700 border-gray-600"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={newArticle.content}
                    onChange={(e) => setNewArticle({...newArticle, content: e.target.value})}
                    className="bg-gray-700 border-gray-600"
                    rows={6}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="source">Source</Label>
                    <Input
                      id="source"
                      value={newArticle.source}
                      onChange={(e) => setNewArticle({...newArticle, source: e.target.value})}
                      className="bg-gray-700 border-gray-600"
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Input
                      id="category"
                      value={newArticle.category}
                      onChange={(e) => setNewArticle({...newArticle, category: e.target.value})}
                      className="bg-gray-700 border-gray-600"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="url">URL</Label>
                  <Input
                    id="url"
                    value={newArticle.url}
                    onChange={(e) => setNewArticle({...newArticle, url: e.target.value})}
                    className="bg-gray-700 border-gray-600"
                  />
                </div>
                <div>
                  <Label htmlFor="image_url">Image URL</Label>
                  <Input
                    id="image_url"
                    value={newArticle.image_url}
                    onChange={(e) => setNewArticle({...newArticle, image_url: e.target.value})}
                    className="bg-gray-700 border-gray-600"
                  />
                </div>
                <Button onClick={handleCreateArticle} className="w-full bg-green-600 hover:bg-green-700">
                  Create Article
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Articles ({articles.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-gray-700">
                <TableHead className="text-gray-300">Title</TableHead>
                <TableHead className="text-gray-300">Source</TableHead>
                <TableHead className="text-gray-300">Category</TableHead>
                <TableHead className="text-gray-300">Published</TableHead>
                <TableHead className="text-gray-300">Views</TableHead>
                <TableHead className="text-gray-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {articles.map((article) => (
                <TableRow key={article.id} className="border-gray-700">
                  <TableCell className="text-white font-medium">
                    {article.title.substring(0, 50)}...
                  </TableCell>
                  <TableCell className="text-gray-300">{article.source}</TableCell>
                  <TableCell className="text-gray-300">{article.category}</TableCell>
                  <TableCell className="text-gray-300">
                    {format(new Date(article.published_at), 'MMM dd, yyyy')}
                  </TableCell>
                  <TableCell className="text-gray-300">{article.views}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="border-blue-600 text-blue-400">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline" className="border-yellow-600 text-yellow-400">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-red-600 text-red-400"
                        onClick={() => handleDeleteArticle(article.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewsManagement;
