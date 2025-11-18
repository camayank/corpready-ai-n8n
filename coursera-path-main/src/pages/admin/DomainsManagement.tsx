import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export const DomainsManagement = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', description: '', icon: '' });
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: domains } = useQuery({
    queryKey: ['admin-domains'],
    queryFn: () => apiClient.get('/admin/domains'),
  });

  const createMutation = useMutation({
    mutationFn: (data: any) => apiClient.post('/admin/domains', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-domains'] });
      toast({ title: 'Domain created successfully' });
      setIsOpen(false);
      setEditingId(null);
      setFormData({ name: '', description: '', icon: '' });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      apiClient.patch(`/admin/domains/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-domains'] });
      toast({ title: 'Domain updated successfully' });
      setIsOpen(false);
      setEditingId(null);
      setFormData({ name: '', description: '', icon: '' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiClient.delete(`/admin/domains/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-domains'] });
      toast({ title: 'Domain deleted' });
    },
  });

  const handleEdit = (domain: any) => {
    setEditingId(domain.id);
    setFormData({
      name: domain.name,
      description: domain.description,
      icon: domain.icon || '',
    });
    setIsOpen(true);
  };

  const handleSubmit = () => {
    if (editingId) {
      updateMutation.mutate({ id: editingId, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Domains & Topics</h1>
          <p className="text-muted-foreground">Manage learning domains and topics</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" /> Add Domain</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingId ? 'Edit Domain' : 'Create Domain'}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              </div>
              <div>
                <Label>Description</Label>
                <Input value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
              </div>
              <div>
                <Label>Icon (emoji)</Label>
                <Input value={formData.icon} onChange={(e) => setFormData({ ...formData, icon: e.target.value })} />
              </div>
              <Button className="w-full" onClick={handleSubmit}>
                {editingId ? 'Update Domain' : 'Create Domain'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {domains?.map((domain: any) => (
          <Card key={domain.id} className="shadow-soft hover:shadow-medium transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{domain.icon || '📚'}</div>
                <div className="flex gap-2">
                  <Button size="sm" variant="ghost" onClick={() => handleEdit(domain)}>
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" className="text-red-600" onClick={() => deleteMutation.mutate(domain.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">{domain.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{domain.description}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{domain.topics?.length || 0} topics</span>
                <span className="text-muted-foreground">{domain._count?.courses || 0} courses</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
