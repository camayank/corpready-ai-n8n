import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Home,
  Library,
  ClipboardList,
  Briefcase,
  Users,
  User,
  Settings,
  Search,
  Flame,
  Trophy,
  Star,
  Play,
  Clock,
  TrendingUp,
  Target,
} from "lucide-react";

const Dashboard = () => {
  const recommendedCourses = [
    {
      id: 1,
      title: "Python for Data Science",
      category: "Data Analytics",
      videos: 8,
      duration: "4.5 hours",
      difficulty: "Beginner",
      progress: 0,
      thumbnail: "bg-blue-500",
    },
    {
      id: 2,
      title: "React.js Fundamentals",
      category: "Web Development",
      videos: 12,
      duration: "6 hours",
      difficulty: "Intermediate",
      progress: 0,
      thumbnail: "bg-cyan-500",
    },
    {
      id: 3,
      title: "Digital Marketing Essentials",
      category: "Digital Marketing",
      videos: 6,
      duration: "3 hours",
      difficulty: "Beginner",
      progress: 0,
      thumbnail: "bg-purple-500",
    },
    {
      id: 4,
      title: "SQL Database Mastery",
      category: "Data Analytics",
      videos: 10,
      duration: "5 hours",
      difficulty: "Intermediate",
      progress: 0,
      thumbnail: "bg-green-500",
    },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-sidebar flex flex-col">
        <div className="p-4 border-b">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-hero flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold">SkillPath India</span>
          </Link>
        </div>

        <nav className="flex-1 p-4">
          <div className="space-y-1">
            <Link to="/app">
              <Button variant="secondary" className="w-full justify-start" size="sm">
                <Home className="mr-2 w-4 h-4" />
                Home
              </Button>
            </Link>
            <Link to="/app/courses">
              <Button variant="ghost" className="w-full justify-start" size="sm">
                <Library className="mr-2 w-4 h-4" />
                My Courses
              </Button>
            </Link>
            <Link to="/app/quizzes">
              <Button variant="ghost" className="w-full justify-start" size="sm">
                <ClipboardList className="mr-2 w-4 h-4" />
                Quizzes
              </Button>
            </Link>
            <Link to="/app/internships">
              <Button variant="ghost" className="w-full justify-start" size="sm">
                <Briefcase className="mr-2 w-4 h-4" />
                Internships
              </Button>
            </Link>
            <Link to="/app/mentorship">
              <Button variant="ghost" className="w-full justify-start" size="sm">
                <Users className="mr-2 w-4 h-4" />
                Mentorship
              </Button>
            </Link>
          </div>
        </nav>

        <div className="p-4 border-t space-y-1">
          <Link to="/app/profile">
            <Button variant="ghost" className="w-full justify-start" size="sm">
              <User className="mr-2 w-4 h-4" />
              Profile
            </Button>
          </Link>
          <Link to="/app/settings">
            <Button variant="ghost" className="w-full justify-start" size="sm">
              <Settings className="mr-2 w-4 h-4" />
              Settings
            </Button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="p-4 flex items-center justify-between">
            <div className="flex-1 max-w-xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search courses, internships, mentors... (Cmd+K)"
                  className="w-full pl-10 pr-4 py-2 rounded-2xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
            <div className="ml-4 flex items-center gap-3">
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-auto p-6">
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">Welcome back, Student! 👋</h1>
                <p className="text-muted-foreground">Continue your learning journey and achieve your goals</p>
              </div>
              <Link to="/app/curate">
                <Button variant="hero" size="lg">
                  <Search className="mr-2 w-5 h-5" />
                  Curate New Course
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 shadow-soft">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Flame className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <div className="text-2xl font-bold">7</div>
                  <div className="text-sm text-muted-foreground">Day Streak</div>
                </div>
              </div>
            </Card>

            <Card className="p-6 shadow-soft">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                  <Trophy className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">850</div>
                  <div className="text-sm text-muted-foreground">Total XP</div>
                </div>
              </div>
            </Card>

            <Card className="p-6 shadow-soft">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Star className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-2xl font-bold">5</div>
                  <div className="text-sm text-muted-foreground">Badges Earned</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Continue Learning */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Continue Learning</h2>
            <Card className="p-6 shadow-medium hover:shadow-large transition-shadow cursor-pointer">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-48 h-32 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <Play className="w-12 h-12 text-white" />
                </div>
                <div className="flex-1">
                  <Badge className="mb-2">Data Analytics</Badge>
                  <h3 className="text-xl font-bold mb-2">Introduction to Python Programming</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Learn Python basics, variables, functions, and control flow
                  </p>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Play className="w-4 h-4" />
                      <span>Video 3 of 8</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>35 mins left</span>
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2 mb-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: "37%" }}></div>
                  </div>
                  <div className="text-xs text-muted-foreground">37% complete</div>
                </div>
                <div className="flex items-center">
                  <Button variant="hero">Continue</Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Recommended Courses */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Recommended for You</h2>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {recommendedCourses.map((course) => {
                const IconMap: { [key: string]: any } = {
                  "Data Analytics": TrendingUp,
                  "Web Development": BookOpen,
                  "Digital Marketing": Target,
                };
                const Icon = IconMap[course.category] || BookOpen;

                return (
                  <Card
                    key={course.id}
                    className="overflow-hidden shadow-soft hover:shadow-large transition-all hover:-translate-y-1 cursor-pointer group"
                  >
                    <div className={`h-32 ${course.thumbnail} flex items-center justify-center relative`}>
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                      <Icon className="w-12 h-12 text-white relative z-10" />
                    </div>
                    <div className="p-4">
                      <Badge variant="secondary" className="mb-2 text-xs">
                        {course.category}
                      </Badge>
                      <h3 className="font-bold mb-2 line-clamp-2">{course.title}</h3>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Play className="w-3 h-3" />
                          <span>{course.videos} videos</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{course.duration}</span>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {course.difficulty}
                      </Badge>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
