import { useEffect, useState, useCallback } from 'react';
import { AdminLayout } from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { managementApi, ManagementMember } from '@/lib/api';
import { Plus, Pencil, Trash2, User, Loader2, Crown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function AdminManagement() {
  const [members, setMembers] = useState<ManagementMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<ManagementMember | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    imageUrl: '',
    bio: '',
    isCommissioner: false,
    sortOrder: 0
  });
  const { toast } = useToast();

  const fetchMembers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await managementApi.getAll();
      setMembers(data);
    } catch (error) {
      console.error('Error fetching members:', error);
      toast({
        title: 'Error',
        description: 'Failed to load management members',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const handleOpenDialog = (member?: ManagementMember) => {
    if (member) {
      setEditingMember(member);
      setFormData({
        name: member.name,
        role: member.role,
        imageUrl: member.imageUrl || '',
        bio: member.bio,
        isCommissioner: member.isCommissioner,
        sortOrder: member.sortOrder
      });
    } else {
      setEditingMember(null);
      setFormData({ 
        name: '', 
        role: '', 
        imageUrl: '', 
        bio: '', 
        isCommissioner: false,
        sortOrder: members.length 
      });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (editingMember) {
        await managementApi.update(editingMember.id, formData);
        toast({ title: 'Success', description: 'Member updated successfully' });
      } else {
        await managementApi.create(formData);
        toast({ title: 'Success', description: 'Member added successfully' });
      }

      await fetchMembers();
      setIsDialogOpen(false);
      setEditingMember(null);
      setFormData({ name: '', role: '', imageUrl: '', bio: '', isCommissioner: false, sortOrder: 0 });
    } catch (error) {
      console.error('Error saving member:', error);
      toast({
        title: 'Error',
        description: 'Failed to save member',
        variant: 'destructive'
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this management member?')) return;

    try {
      await managementApi.delete(id);
      toast({ title: 'Success', description: 'Member deleted successfully' });
      await fetchMembers();
    } catch (error) {
      console.error('Error deleting member:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete member',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl lg:text-3xl font-display font-bold text-foreground mb-6">Management</h1>
      <div className="space-y-6">
        {/* Header with Add Button */}
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">
            Manage the leadership org chart displayed on the public website.
          </p>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => handleOpenDialog()}>
                <Plus className="h-4 w-4 mr-2" />
                Add Member
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>
                  {editingMember ? 'Edit Member' : 'Add New Member'}
                </DialogTitle>
                <DialogDescription>
                  {editingMember 
                    ? 'Update the management member details below.'
                    : 'Fill in the details for the new management member.'}
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    autoComplete="off"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Prof. John Doe"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role / Position</Label>
                  <Input
                    id="role"
                    autoComplete="off"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="e.g., Director, Veterinary Services"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="imageUrl">Image URL</Label>
                  <Input
                    id="imageUrl"
                    autoComplete="off"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="/image-name.png"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Biography</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    placeholder="Brief description of experience and role..."
                    rows={4}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sortOrder">Display Order</Label>
                    <Input
                      id="sortOrder"
                      type="number"
                      autoComplete="off"
                      inputMode="numeric"
                      value={formData.sortOrder}
                      onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) || 0 })}
                      min={0}
                    />
                  </div>
                  <div className="flex items-center space-x-2 pt-8">
                    <Checkbox
                      id="isCommissioner"
                      checked={formData.isCommissioner}
                      onCheckedChange={(checked) => setFormData({ ...formData, isCommissioner: checked as boolean })}
                    />
                    <Label htmlFor="isCommissioner" className="text-sm cursor-pointer">
                      Leadership (Director General)
                    </Label>
                  </div>
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={saving}>
                    {saving && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                    {editingMember ? 'Update Member' : 'Add Member'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : members.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <User className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No management members yet.</p>
              <p className="text-sm text-muted-foreground">Click "Add Member" to get started.</p>
            </CardContent>
          </Card>
        ) : (
          /* Management Members Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map((member) => (
              <Card key={member.id} variant="elevated" className={`overflow-hidden ${member.isCommissioner ? 'ring-2 ring-primary' : ''}`}>
                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-secondary flex-shrink-0">
                      {member.imageUrl ? (
                        <img 
                          src={member.imageUrl} 
                          alt={member.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <User className="h-8 w-8 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg truncate">{member.name}</CardTitle>
                        {member.isCommissioner && (
                          <Crown className="h-4 w-4 text-primary flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-sm text-primary font-medium">{member.role}</p>
                      {member.isCommissioner && (
                        <Badge variant="secondary" className="mt-1 text-xs">Leadership</Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                    {member.bio}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Order: {member.sortOrder}</span>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleOpenDialog(member)}
                      >
                        <Pencil className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDelete(member.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
