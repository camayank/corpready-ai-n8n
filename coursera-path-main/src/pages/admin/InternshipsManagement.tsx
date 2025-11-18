import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, CheckCircle, XCircle, Eye } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export const InternshipsManagement = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data, isLoading } = useQuery({
    queryKey: ['admin-internships', search, statusFilter],
    queryFn: () => apiClient.get('/admin/internships', { params: { search, status: statusFilter !== 'all' ? statusFilter : undefined } }),
  });

  const approveMutation = useMutation({
    mutationFn: (id: string) => apiClient.post(`/admin/internships/${id}/approve`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-internships'] });
      toast({ title: 'Internship approved successfully' });
    },
  });

  const rejectMutation = useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) =>
      apiClient.post(`/admin/internships/${id}/reject`, { reason }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-internships'] });
      toast({ title: 'Internship rejected' });
    },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Internships Management</h1>
        <p className="text-muted-foreground">Review and approve internship listings</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-6 shadow-soft">
          <div className="text-2xl font-bold">{data?.internships?.length || 0}</div>
          <div className="text-sm text-muted-foreground">Total Internships</div>
        </Card>
        <Card className="p-6 shadow-soft">
          <div className="text-2xl font-bold text-orange-600">
            {data?.internships?.filter((i: any) => !i.isApproved).length || 0}
          </div>
          <div className="text-sm text-muted-foreground">Pending Approval</div>
        </Card>
        <Card className="p-6 shadow-soft">
          <div className="text-2xl font-bold text-green-600">
            {data?.internships?.filter((i: any) => i.isApproved).length || 0}
          </div>
          <div className="text-sm text-muted-foreground">Approved</div>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search internships..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
            </div>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border rounded-md px-4">
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
            </select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow><TableCell colSpan={5} className="text-center py-8">Loading...</TableCell></TableRow>
                ) : data?.internships?.length === 0 ? (
                  <TableRow><TableCell colSpan={5} className="text-center py-8">No internships found</TableCell></TableRow>
                ) : (
                  data?.internships?.map((internship: any) => (
                    <TableRow key={internship.id}>
                      <TableCell className="font-medium">{internship.title}</TableCell>
                      <TableCell>{internship.company}</TableCell>
                      <TableCell>{internship.location || 'Remote'}</TableCell>
                      <TableCell>
                        {internship.isApproved ? (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            <CheckCircle className="h-3 w-3 mr-1" /> Approved
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                            Pending
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        {!internship.isApproved && (
                          <>
                            <Button size="sm" variant="outline" className="text-green-600" onClick={() => approveMutation.mutate(internship.id)}>
                              <CheckCircle className="h-4 w-4 mr-1" /> Approve
                            </Button>
                            <Button size="sm" variant="outline" className="text-red-600" onClick={() => rejectMutation.mutate({ id: internship.id, reason: 'Not suitable' })}>
                              <XCircle className="h-4 w-4 mr-1" /> Reject
                            </Button>
                          </>
                        )}
                        <Button size="sm" variant="ghost"><Eye className="h-4 w-4" /></Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
