import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Search, Flag, Trash2, Eye } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export const CoursesManagement = () => {
  const [search, setSearch] = useState('');
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data, isLoading } = useQuery({
    queryKey: ['admin-courses', search],
    queryFn: () => apiClient.get('/admin/courses', { params: { search } }),
  });

  const flagMutation = useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) =>
      apiClient.post(`/admin/courses/${id}/flag`, { reason }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-courses'] });
      toast({ title: 'Course flagged' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiClient.delete(`/admin/courses/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-courses'] });
      toast({ title: 'Course deleted' });
    },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Courses Management</h1>
        <p className="text-muted-foreground">Manage courses, videos, and content quality</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-6 shadow-soft">
          <div className="text-2xl font-bold">{data?.pagination?.total || 0}</div>
          <div className="text-sm text-muted-foreground">Total Courses</div>
        </Card>
        <Card className="p-6 shadow-soft">
          <div className="text-2xl font-bold text-green-600">
            {data?.courses?.filter((c: any) => c.status === 'active').length || 0}
          </div>
          <div className="text-sm text-muted-foreground">Active</div>
        </Card>
        <Card className="p-6 shadow-soft">
          <div className="text-2xl font-bold text-red-600">
            {data?.courses?.filter((c: any) => c.status === 'flagged').length || 0}
          </div>
          <div className="text-sm text-muted-foreground">Flagged</div>
        </Card>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search courses..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-10" />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course Title</TableHead>
                  <TableHead>Domain</TableHead>
                  <TableHead>Videos</TableHead>
                  <TableHead>Enrollments</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow><TableCell colSpan={6} className="text-center py-8">Loading...</TableCell></TableRow>
                ) : data?.courses?.length === 0 ? (
                  <TableRow><TableCell colSpan={6} className="text-center py-8">No courses found</TableCell></TableRow>
                ) : (
                  data?.courses?.map((course: any) => (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium">{course.title}</TableCell>
                      <TableCell>{course.domain}</TableCell>
                      <TableCell>{course.modules?.reduce((acc: number, m: any) => acc + (m.videos?.length || 0), 0) || 0}</TableCell>
                      <TableCell>{course._count?.courseProgress || 0}</TableCell>
                      <TableCell>
                        <Badge variant={course.status === 'active' ? 'default' : course.status === 'flagged' ? 'destructive' : 'secondary'}>
                          {course.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button size="sm" variant="ghost" onClick={() => flagMutation.mutate({ id: course.id, reason: 'Quality issue' })}>
                          <Flag className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost"><Eye className="h-4 w-4" /></Button>
                        <Button size="sm" variant="ghost" className="text-red-600" onClick={() => deleteMutation.mutate(course.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
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
