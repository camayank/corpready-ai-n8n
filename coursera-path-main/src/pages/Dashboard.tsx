import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Flame,
  Trophy,
  Star,
  Play,
  Clock,
  TrendingUp,
  Target,
  Briefcase,
} from "lucide-react";

const Dashboard = () => {
  const recommendedCourses = [
    {
      id: 1,
      title: "Python for Data Science",
      category: "Data Analytics",
      videos: 8,
      duration: "3h 20m",
      thumbnail: "bg-gradient-to-br from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      title: "React Complete Guide",
      category: "Web Development",
      videos: 12,
      duration: "5h 10m",
      thumbnail: "bg-gradient-to-br from-purple-500 to-pink-500",
    },
    {
      id: 3,
      title: "Digital Marketing Fundamentals",
      category: "Digital Marketing",
      videos: 6,
      duration: "2h 30m",
      thumbnail: "bg-gradient-to-br from-green-500 to-teal-500",
    },
    {
      id: 4,
      title: "UI/UX Design Principles",
      category: "Design",
      videos: 10,
      duration: "4h 15m",
      thumbnail: "bg-gradient-to-br from-orange-500 to-red-500",
    },
  ];

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Welcome Section */}
        <div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome to CorpReady! 🚀</h1>
              <p className="text-muted-foreground">Master skills, build your career, and land your dream opportunities</p>
            </div>
            <Link to="/app/curate">
              <Button variant="hero" size="lg" className="shadow-medium hover:shadow-large transition-shadow">
                <Target className="mr-2 w-5 h-5" />
                Start Learning Path
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 shadow-soft hover:shadow-medium transition-shadow">
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

          <Card className="p-6 shadow-soft hover:shadow-medium transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <div className="text-2xl font-bold">850</div>
                <div className="text-sm text-muted-foreground">Career Points</div>
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-soft hover:shadow-medium transition-shadow">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Star className="w-6 h-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">5</div>
                <div className="text-sm text-muted-foreground">Skills Mastered</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Continue Learning */}
        <div>
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
                    <span>Module 2 of 8</span>
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
                      <span className="flex items-center gap-1">
                        <Play className="w-3 h-3" />
                        {course.videos} videos
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {course.duration}
                      </span>
                    </div>
                    <Button variant="outline" className="w-full" size="sm">
                      Start Learning
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Fast Track Your Career</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link to="/app/curate">
              <Card className="p-6 shadow-soft hover:shadow-medium transition-all cursor-pointer group hover:-translate-y-1">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold">Build Skills</h3>
                    <p className="text-sm text-muted-foreground">AI-powered learning paths</p>
                  </div>
                </div>
              </Card>
            </Link>

            <Link to="/app/certificates">
              <Card className="p-6 shadow-soft hover:shadow-medium transition-all cursor-pointer group hover:-translate-y-1">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                    <Trophy className="w-6 h-6 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold">Showcase Skills</h3>
                    <p className="text-sm text-muted-foreground">Earn verified certificates</p>
                  </div>
                </div>
              </Card>
            </Link>

            <Link to="/app/internships">
              <Card className="p-6 shadow-soft hover:shadow-medium transition-all cursor-pointer group hover:-translate-y-1">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                    <Briefcase className="w-6 h-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold">Land Opportunities</h3>
                    <p className="text-sm text-muted-foreground">Find your dream role</p>
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
