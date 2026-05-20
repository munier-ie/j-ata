import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { newsApi, NewsArticle } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { Plus, Newspaper, Trash2, Eye, EyeOff, Edit2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const categories = [
  'Announcement',
  'Event',
  'Policy',
  'Development',
  'Health',
  'General'
];

export default function AdminNews() {
  const { toast } = useToast();
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<NewsArticle | null>(null);
  
  // Form state
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('General');
  const [imageUrl, setImageUrl] = useState('');
  const [isPublished, setIsPublished] = useState(false);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const data = await newsApi.getAll();
      setArticles(data);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const slug = generateSlug(title);
    const articleData = {
      title,
      slug,
      excerpt: excerpt || null,
      content,
      category,
      imageUrl: imageUrl || null,
      isPublished
    };

    try {
      if (editing) {
        await newsApi.update(editing.id, articleData);
      } else {
        await newsApi.create(articleData);
      }
      
      toast({
        title: 'Success',
        description: `Article ${editing ? 'updated' : 'created'} successfully`
      });
      resetForm();
      setDialogOpen(false);
      fetchArticles();
    } catch (error) {
      toast({
        title: 'Error',
        description: `Failed to ${editing ? 'update' : 'create'} article`,
        variant: 'destructive'
      });
    }
  };

  const handleEdit = (article: NewsArticle) => {
    setEditing(article);
    setTitle(article.title);
    setExcerpt(article.excerpt || '');
    setContent(article.content);
    setCategory(article.category);
    setImageUrl(article.imageUrl || '');
    setIsPublished(article.isPublished);
    setDialogOpen(true);
  };

  const togglePublish = async (id: string, currentStatus: boolean) => {
    try {
      await newsApi.update(id, { 
        isPublished: !currentStatus
      });
      fetchArticles();
    } catch (error) {
      console.error('Error toggling publish status:', error);
    }
  };

  const deleteArticle = async (id: string) => {
    try {
      await newsApi.delete(id);
      toast({
        title: 'Deleted',
        description: 'Article deleted successfully'
      });
      fetchArticles();
    } catch (error) {
      console.error('Error deleting article:', error);
    }
  };

  const resetForm = () => {
    setEditing(null);
    setTitle('');
    setExcerpt('');
    setContent('');
    setCategory('General');
    setImageUrl('');
    setIsPublished(false);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl lg:text-3xl font-display font-bold text-foreground mb-6">News Management</h1>
      <div className="space-y-6">
        <div className="flex justify-end">
          <Dialog open={dialogOpen} onOpenChange={(open) => {
            setDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button variant="governmentPrimary">
                <Plus className="h-4 w-4 mr-2" />
                Add Article
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editing ? 'Edit Article' : 'Create New Article'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    autoComplete="off"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    rows={2}
                    placeholder="Brief summary of the article"
                  />
                </div>
                <div>
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={8}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(cat => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="imageUrl">Image URL</Label>
                    <Input
                      id="imageUrl"
                      type="url"
                      autoComplete="off"
                      placeholder="https://..."
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={isPublished}
                    onCheckedChange={setIsPublished}
                  />
                  <Label>Publish immediately</Label>
                </div>
                <Button type="submit" variant="governmentPrimary" className="w-full">
                  {editing ? 'Update Article' : 'Create Article'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card variant="elevated">
          <CardHeader>
            <CardTitle>All Articles</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-20 bg-secondary animate-pulse rounded-lg" />
                ))}
              </div>
            ) : articles.length === 0 ? (
              <div className="text-center py-12">
                <Newspaper className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No articles yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {articles.map((article) => (
                  <div key={article.id} className="p-4 border border-border rounded-lg flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">{article.title}</h3>
                        <Badge variant={article.isPublished ? 'default' : 'secondary'}>
                          {article.isPublished ? 'Published' : 'Draft'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1 line-clamp-2">{article.excerpt}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Badge variant="outline">{article.category}</Badge>
                        <span>•</span>
                        <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Edit article"
                        onClick={() => handleEdit(article)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={article.isPublished ? "Unpublish article" : "Publish article"}
                        onClick={() => togglePublish(article.id, article.isPublished)}
                      >
                        {article.isPublished ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Delete article"
                        onClick={() => deleteArticle(article.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
