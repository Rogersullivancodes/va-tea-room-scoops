
import React from 'react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface NewArticle {
  title: string;
  content: string;
  excerpt: string;
  source: string;
  url: string;
  image_url: string;
  category: string;
}

interface CreateArticleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  newArticle: NewArticle;
  onArticleChange: (article: NewArticle) => void;
  onCreateArticle: () => void;
}

const CreateArticleDialog: React.FC<CreateArticleDialogProps> = ({
  open,
  onOpenChange,
  newArticle,
  onArticleChange,
  onCreateArticle
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
              onChange={(e) => onArticleChange({...newArticle, title: e.target.value})}
              className="bg-gray-700 border-gray-600"
            />
          </div>
          <div>
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              value={newArticle.excerpt}
              onChange={(e) => onArticleChange({...newArticle, excerpt: e.target.value})}
              className="bg-gray-700 border-gray-600"
              rows={3}
            />
          </div>
          <div>
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={newArticle.content}
              onChange={(e) => onArticleChange({...newArticle, content: e.target.value})}
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
                onChange={(e) => onArticleChange({...newArticle, source: e.target.value})}
                className="bg-gray-700 border-gray-600"
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={newArticle.category}
                onChange={(e) => onArticleChange({...newArticle, category: e.target.value})}
                className="bg-gray-700 border-gray-600"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="url">URL</Label>
            <Input
              id="url"
              value={newArticle.url}
              onChange={(e) => onArticleChange({...newArticle, url: e.target.value})}
              className="bg-gray-700 border-gray-600"
            />
          </div>
          <div>
            <Label htmlFor="image_url">Image URL</Label>
            <Input
              id="image_url"
              value={newArticle.image_url}
              onChange={(e) => onArticleChange({...newArticle, image_url: e.target.value})}
              className="bg-gray-700 border-gray-600"
            />
          </div>
          <Button onClick={onCreateArticle} className="w-full bg-green-600 hover:bg-green-700">
            Create Article
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateArticleDialog;
