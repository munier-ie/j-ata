import { useEffect, useState } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { reportsApi, Report } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { Plus, FileText, Trash2, Eye, EyeOff } from 'lucide-react';
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
  'Annual Report',
  'Financial Report',
  'Project Update',
  'Research',
  'Policy Document',
  'General'
];

export default function AdminReports() {
  const { toast } = useToast();
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('General');
  const [fileUrl, setFileUrl] = useState('');
  const [isPublished, setIsPublished] = useState(false);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const data = await reportsApi.getAll();
      setReports(data);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await reportsApi.create({
        title,
        description: description || null,
        category,
        fileUrl: fileUrl || null,
        isPublished,
        uploadedBy: null
      });
      
      toast({
        title: 'Success',
        description: 'Report created successfully'
      });
      resetForm();
      setDialogOpen(false);
      fetchReports();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create report',
        variant: 'destructive'
      });
    }
  };

  const togglePublish = async (id: string, currentStatus: boolean) => {
    try {
      await reportsApi.update(id, { isPublished: !currentStatus });
      fetchReports();
    } catch (error) {
      console.error('Error toggling publish status:', error);
    }
  };

  const deleteReport = async (id: string) => {
    try {
      await reportsApi.delete(id);
      toast({
        title: 'Deleted',
        description: 'Report deleted successfully'
      });
      fetchReports();
    } catch (error) {
      console.error('Error deleting report:', error);
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setCategory('General');
    setFileUrl('');
    setIsPublished(false);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl lg:text-3xl font-display font-bold text-foreground mb-6">Reports Management</h1>
      <div className="space-y-6">
        <div className="flex justify-end">
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="governmentPrimary">
                <Plus className="h-4 w-4 mr-2" />
                Add Report
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Report</DialogTitle>
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
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                  />
                </div>
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
                  <Label htmlFor="fileUrl">File URL (Optional)</Label>
                  <Input
                    id="fileUrl"
                    type="url"
                    autoComplete="off"
                    placeholder="https://..."
                    value={fileUrl}
                    onChange={(e) => setFileUrl(e.target.value)}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={isPublished}
                    onCheckedChange={setIsPublished}
                  />
                  <Label>Publish immediately</Label>
                </div>
                <Button type="submit" variant="governmentPrimary" className="w-full">
                  Create Report
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card variant="elevated">
          <CardHeader>
            <CardTitle>All Reports</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-16 bg-secondary animate-pulse rounded-lg" />
                ))}
              </div>
            ) : reports.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No reports yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {reports.map((report) => (
                  <div key={report.id} className="p-4 border border-border rounded-lg flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">{report.title}</h3>
                        <Badge variant={report.isPublished ? 'default' : 'secondary'}>
                          {report.isPublished ? 'Published' : 'Draft'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{report.description}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Badge variant="outline">{report.category}</Badge>
                        <span>•</span>
                        <span>{new Date(report.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={report.isPublished ? "Unpublish report" : "Publish report"}
                        onClick={() => togglePublish(report.id, report.isPublished)}
                      >
                        {report.isPublished ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Delete report"
                        onClick={() => deleteReport(report.id)}
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
