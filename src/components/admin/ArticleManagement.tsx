
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
import { Plus, Edit, Trash2, Eye, Calendar } from 'lucide-react';
import { useArticles } from '@/hooks/useArticles';
import { useAuth } from '@/contexts/AuthContext';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';

const ArticleManagement: React.FC = () => {
  const { articles, loading, createArticle, updateArticle } = useArticles();
  const { user } = useAuth();
  const { toast } = useToast();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [newArticle, setNewArticle] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: 'politics',
    tags: [],
    featured_image_url: '',
    is_premium: false,
    credits_required: 0,
    meta_description: '',
    meta_keywords: [],
    status: 'draft'
  });

  const handleCreateArticle = async () => {
    if (!user) return;

    const articleData = {
      ...newArticle,
      author_id: user.id,
      published_at: newArticle.status === 'published' ? new Date().toISOString() : null
    };

    const { error } = await createArticle(articleData);
    
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Article Created",
        description: "New article has been created successfully.",
      });
      setIsCreateDialogOpen(false);
      resetForm();
    }
  };

  const handleUpdateStatus = async (articleId: string, status: string) => {
    const updates = {
      status,
      published_at: status === 'published' ? new Date().toISOString() : null
    };

    const { error } = await updateArticle(articleId, updates);
    
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Article Updated",
        description: `Article ${status} successfully.`,
      });
    }
  };

  const resetForm = () => {
    setNewArticle({
      title: '',
      content: '',
      excerpt: '',
      category: 'politics',
      tags: [],
      featured_image_url: '',
      is_premium: false,
      credits_required: 0,
      meta_description: '',
      meta_keywords: [],
      status: 'draft'
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge className="bg-green-600">Published</Badge>;
      case 'draft':
        return <Badge variant="outline">Draft</Badge>;
      case 'archived':
        return <Badge variant="secondary">Archived</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Article Management</h2>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="h-4 w-4 mr-2" />
              Create Article
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-800 border-gray-700 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
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
                  rows={8}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={newArticle.category} onValueChange={(value) => setNewArticle({...newArticle, category: value})}>
                    <SelectTrigger className="bg-gray-700 border-gray-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="politics">Politics</SelectItem>
                      <SelectItem value="virginia">Virginia</SelectItem>
                      <SelectItem value="federal">Federal</SelectItem>
                      <SelectItem value="local">Local</SelectItem>
                      <SelectItem value="campaigns">Campaigns</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={newArticle.status} onValueChange={(value) => setNewArticle({...newArticle, status: value})}>
                    <SelectTrigger className="bg-gray-700 border-gray-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="featured_image">Featured Image URL</Label>
                <Input
                  id="featured_image"
                  value={newArticle.featured_image_url}
                  onChange={(e) => setNewArticle({...newArticle, featured_image_url: e.target.value})}
                  className="bg-gray-700 border-gray-600"
                />
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={newArticle.is_premium}
                    onCheckedChange={(checked) => setNewArticle({...newArticle, is_premium: checked})}
                  />
                  <Label>Premium Article</Label>
                </div>
                {newArticle.is_premium && (
                  <div>
                    <Label htmlFor="credits">Credits Required</Label>
                    <Input
                      id="credits"
                      type="number"
                      value={newArticle.credits_required}
                      onChange={(e) => setNewArticle({...newArticle, credits_required: parseInt(e.target.value) || 0})}
                      className="bg-gray-700 border-gray-600 w-24"
                    />
                  </div>
                )}
              </div>
              <div>
                <Label htmlFor="meta_description">Meta Description</Label>
                <Textarea
                  id="meta_description"
                  value={newArticle.meta_description}
                  onChange={(e) => setNewArticle({...newArticle, meta_description: e.target.value})}
                  className="bg-gray-700 border-gray-600"
                  rows={2}
                />
              </div>
              <Button onClick={handleCreateArticle} className="w-full bg-green-600 hover:bg-green-700">
                Create Article
              </Button>
            </div>
          </DialogContent>
        </Dialog>
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
                <TableHead className="text-gray-300">Category</TableHead>
                <TableHead className="text-gray-300">Status</TableHead>
                <TableHead className="text-gray-300">Views</TableHead>
                <TableHead className="text-gray-300">Published</TableHead>
                <TableHead className="text-gray-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {articles.map((article) => (
                <TableRow key={article.id} className="border-gray-700">
                  <TableCell className="text-white font-medium">
                    <div>
                      <p className="font-semibold">{article.title.substring(0, 60)}...</p>
                      {article.is_premium && (
                        <Badge variant="outline" className="text-gold border-gold mt-1">
                          Premium ({article.credits_required} credits)
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-300">
                    <Badge variant="secondary">{article.category}</Badge>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(article.status)}
                  </TableCell>
                  <TableCell className="text-gray-300">{article.views || 0}</TableCell>
                  <TableCell className="text-gray-300">
                    {article.published_at ? format(new Date(article.published_at), 'MMM dd, yyyy') : '-'}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="border-blue-600 text-blue-400">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline" className="border-yellow-600 text-yellow-400">
                        <Edit className="h-3 w-3" />
                      </Button>
                      {article.status === 'draft' && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-green-600 text-green-400"
                          onClick={() => handleUpdateStatus(article.id, 'published')}
                        >
                          <Calendar className="h-3 w-3" />
                        </Button>
                      )}
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="border-red-600 text-red-400"
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

export default ArticleManagement;
