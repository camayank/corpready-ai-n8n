import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, BookOpen, GraduationCap, Briefcase, TrendingUp, AlertCircle, Activity, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminDashboard = () => {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard 🎯</h1>
          <p className="text-muted-foreground">
            Monitor platform health, manage users, and oversee operations
          </p>
        </div>
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          <Activity className="h-3 w-3 mr-1" />
          All Systems Operational
        </Badge>
      </div>

      {/* KPI Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 shadow-soft hover:shadow-medium transition-shadow">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold">1,234</div>
              <div className="text-sm text-muted-foreground">Total Users</div>
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-emerald-600">
            <TrendingUp className="h-3 w-3 mr-1" />
            +12% from last week
          </div>
        </Card>

        <Card className="p-6 shadow-soft hover:shadow-medium transition-shadow">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <div className="text-2xl font-bold">567</div>
              <div className="text-sm text-muted-foreground">Courses Generated</div>
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-emerald-600">
            <TrendingUp className="h-3 w-3 mr-1" />
            +8% from last week
          </div>
        </Card>

        <Card className="p-6 shadow-soft hover:shadow-medium transition-shadow">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-accent" />
            </div>
            <div>
              <div className="text-2xl font-bold">234</div>
              <div className="text-sm text-muted-foreground">Certificates Issued</div>
            </div>
          </div>
          <div className="mt-4 flex items-center text-xs text-blue-600">
            <TrendingUp className="h-3 w-3 mr-1" />
            +15% from last week
          </div>
        </Card>

        <Card className="p-6 shadow-soft hover:shadow-medium transition-shadow">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">45</div>
              <div className="text-sm text-muted-foreground">Active Internships</div>
            </div>
          </div>
          <div className="mt-4 text-xs text-muted-foreground">
            12 pending approval
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-4">
        <Link to="/admin/users">
          <Card className="p-4 hover:shadow-medium transition-shadow cursor-pointer group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium">Manage Users</div>
                  <div className="text-xs text-muted-foreground">View and edit users</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </Card>
        </Link>

        <Link to="/admin/internships">
          <Card className="p-4 hover:shadow-medium transition-shadow cursor-pointer group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <div className="font-medium">Approve Internships</div>
                  <div className="text-xs text-muted-foreground">12 pending review</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </Card>
        </Link>

        <Link to="/admin/courses">
          <Card className="p-4 hover:shadow-medium transition-shadow cursor-pointer group">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <div className="font-medium">Manage Courses</div>
                  <div className="text-xs text-muted-foreground">View all courses</div>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </Card>
        </Link>
      </div>

      {/* Alerts Section */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-orange-500" />
            Recent Alerts & Actions Required
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-4 bg-orange-50 border border-orange-200 rounded-xl">
              <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-orange-900">
                  12 internships pending approval
                </p>
                <p className="text-xs text-orange-700 mt-1">
                  Review and approve or reject internship listings
                </p>
              </div>
              <Button variant="outline" size="sm" className="border-orange-200 text-orange-700 hover:bg-orange-100">
                Review
              </Button>
            </div>

            <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-blue-900">
                  3 new signups in the last 24 hours
                </p>
                <p className="text-xs text-blue-700 mt-1">
                  Welcome new users and monitor onboarding completion
                </p>
              </div>
              <Button variant="outline" size="sm" className="border-blue-200 text-blue-700 hover:bg-blue-100">
                View Users
              </Button>
            </div>

            <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-xl">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-green-900">
                  System health: All services operational
                </p>
                <p className="text-xs text-green-700 mt-1">
                  Last checked: 2 minutes ago
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Recent User Signups</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              User activity data will be displayed here
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Course Completion Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              Course completion metrics will be displayed here
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
