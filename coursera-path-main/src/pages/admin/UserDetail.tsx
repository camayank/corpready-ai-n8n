import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { adminService } from '@/services/admin.service';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import {
  User,
  Mail,
  Calendar,
  Shield,
  Activity,
  ArrowLeft,
  Edit,
  Ban,
  CheckCircle,
} from 'lucide-react';
import type { UserDetail as UserDetailType, UserRole } from '@/types/admin';

export const UserDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<UserDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState<UserRole>('USER');

  useEffect(() => {
    if (id) {
      loadUser();
    }
  }, [id]);

  const loadUser = async () => {
    try {
      setLoading(true);
      const data = await adminService.getUserById(id!);
      setUser(data);
      setSelectedRole(data.role);
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error?.message || 'Failed to load user details',
      });
      navigate('/admin/users');
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async () => {
    if (!user || selectedRole === user.role) return;

    try {
      const reason = `Changed role from ${user.role} to ${selectedRole}`;
      await adminService.changeUserRole(id!, selectedRole, reason);
      toast({
        title: 'Success',
        description: 'User role updated successfully',
      });
      loadUser();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error?.message || 'Failed to update user role',
      });
    }
  };

  const handleToggleActive = async () => {
    if (!user) return;

    try {
      const reason = user.isActive ? 'Deactivating user' : 'Activating user';
      await adminService.toggleUserActive(id!, reason);
      toast({
        title: 'Success',
        description: `User ${user.isActive ? 'deactivated' : 'activated'} successfully`,
      });
      loadUser();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error?.message || 'Failed to toggle user status',
      });
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading user details...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-6 text-center">
        <p className="text-muted-foreground">User not found</p>
        <Button onClick={() => navigate('/admin/users')} className="mt-4">
          Back to Users
        </Button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate('/admin/users')}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Users
          </Button>
          <div className="flex items-center gap-2">
            <Button
              variant={user.isActive ? 'destructive' : 'default'}
              onClick={handleToggleActive}
              className="gap-2"
            >
              {user.isActive ? (
                <>
                  <Ban className="w-4 h-4" />
                  Deactivate User
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Activate User
                </>
              )}
            </Button>
          </div>
        </div>

        {/* User Info Card */}
        <Card className="p-6">
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-10 h-10 text-primary" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-2">{user.name}</h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Mail className="w-4 h-4" />
                  {user.email}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Joined {new Date(user.createdAt).toLocaleDateString()}
                </div>
                <Badge variant={user.isActive ? 'default' : 'secondary'}>
                  {user.isActive ? (
                    <>
                      <Activity className="w-3 h-3 mr-1" />
                      Active
                    </>
                  ) : (
                    <>
                      <Ban className="w-3 h-3 mr-1" />
                      Inactive
                    </>
                  )}
                </Badge>
              </div>
            </div>
          </div>
        </Card>

        {/* Role Management */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Role Management
          </h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">User Role</label>
              <div className="flex items-center gap-3">
                <Select value={selectedRole} onValueChange={(value) => setSelectedRole(value as UserRole)}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USER">User</SelectItem>
                    <SelectItem value="ADMIN">Admin</SelectItem>
                    <SelectItem value="CURATOR">Curator</SelectItem>
                    <SelectItem value="OPS">Operations</SelectItem>
                    <SelectItem value="PARTNER">Partner</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  onClick={handleRoleChange}
                  disabled={selectedRole === user.role}
                >
                  Update Role
                </Button>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              Current role: <Badge variant="outline">{user.role}</Badge>
            </div>
          </div>
        </Card>

        {/* User Details */}
        <Card className="p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Edit className="w-5 h-5" />
            User Details
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Email Verified</label>
              <p className="text-base">
                {user.isEmailVerified ? (
                  <Badge variant="default">Verified</Badge>
                ) : (
                  <Badge variant="secondary">Not Verified</Badge>
                )}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Onboarding Complete</label>
              <p className="text-base">
                {user.isOnboardingComplete ? (
                  <Badge variant="default">Complete</Badge>
                ) : (
                  <Badge variant="secondary">Incomplete</Badge>
                )}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Area of Study</label>
              <p className="text-base">{user.areaOfStudy || 'Not specified'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Graduation Year</label>
              <p className="text-base">{user.graduationYear || 'Not specified'}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Last Login</label>
              <p className="text-base">
                {user.lastLoginAt
                  ? new Date(user.lastLoginAt).toLocaleString()
                  : 'Never'}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Created At</label>
              <p className="text-base">{new Date(user.createdAt).toLocaleString()}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
