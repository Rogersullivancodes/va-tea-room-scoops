import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X, Plus, PenTool } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ArticleSubmissionFormProps {
  onSuccess?: () => void;
}

const ArticleSubmissionForm: React.FC<ArticleSubmissionFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: 'politics',
    author_name: '',
    author_email: '',
    featured_image_url: '',
    meta_description: ''
  });
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const categories = ['politics', 'virginia', 'federal', 'local', 'campaigns'];

  const handleAddTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim()) && tags.length < 10) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.content || !formData.author_name || !formData.author_email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('submit-article', {
        body: {
          ...formData,
          tags,
          content: formData.content,
          excerpt: formData.excerpt || formData.content.substring(0, 200) + '...',
          meta_description: formData.meta_description || formData.excerpt || formData.content.substring(0, 160) + '...'
        }
      });

      if (error) throw error;

      toast({
        title: "Article Submitted!",
        description: "Your article has been submitted for review and will be published soon.",
      });

      // Reset form
      setFormData({
        title: '',
        content: '',
        excerpt: '',
        category: 'politics',
        author_name: '',
        author_email: '',
        featured_image_url: '',
        meta_description: ''
      });
      setTags([]);
      setCurrentTag('');

      if (onSuccess) onSuccess();
    } catch (err) {
      console.error('Error submitting article:', err);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your article. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <PenTool className="h-5 w-5" />
          <span>Submit Your Article</span>
        </CardTitle>
        <p className="text-muted-foreground">
          Share your political insights and analysis with our community. All submissions are reviewed before publication.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Author Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="author_name">Author Name *</Label>
              <Input
                id="author_name"
                value={formData.author_name}
                onChange={(e) => setFormData({...formData, author_name: e.target.value})}
                placeholder="Your full name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="author_email">Author Email *</Label>
              <Input
                id="author_email"
                type="email"
                value={formData.author_email}
                onChange={(e) => setFormData({...formData, author_email: e.target.value})}
                placeholder="your.email@example.com"
                required
              />
            </div>
          </div>

          {/* Article Details */}
          <div className="space-y-2">
            <Label htmlFor="title">Article Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="Enter a compelling title for your article"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => setFormData({...formData, category: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="featured_image_url">Featured Image URL</Label>
              <Input
                id="featured_image_url"
                value={formData.featured_image_url}
                onChange={(e) => setFormData({...formData, featured_image_url: e.target.value})}
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Article Excerpt</Label>
            <Textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
              placeholder="A brief summary of your article (will be auto-generated if left blank)"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Article Content *</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              placeholder="Write your article content here. Use clear paragraphs and provide well-researched insights."
              rows={12}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="meta_description">SEO Description</Label>
            <Textarea
              id="meta_description"
              value={formData.meta_description}
              onChange={(e) => setFormData({...formData, meta_description: e.target.value})}
              placeholder="SEO meta description (160 characters max)"
              rows={2}
              maxLength={160}
            />
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="px-2 py-1">
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-1 text-xs hover:text-destructive"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex space-x-2">
              <Input
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                placeholder="Add a tag"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
              />
              <Button type="button" onClick={handleAddTag} variant="outline" size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Add relevant tags to help readers find your article. Press Enter or click + to add.
            </p>
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Article'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ArticleSubmissionForm;