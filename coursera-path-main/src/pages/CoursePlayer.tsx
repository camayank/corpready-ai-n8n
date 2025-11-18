import { useState, useEffect } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Play,
  CheckCircle,
  Clock,
  Target,
  Lock,
  ArrowLeft,
  ChevronRight,
  FileText,
  Award,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CoursePlayer = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [course, setCourse] = useState<any>(location.state?.course || null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [completedVideos, setCompletedVideos] = useState<number[]>([]);
  const [showQuizPrompt, setShowQuizPrompt] = useState(false);

  useEffect(() => {
    // If no course data, use mock data
    if (!course) {
      setCourse({
        id: parseInt(id || "1"),
        title: "Web Development Fundamentals",
        description: "Master the basics of web development with hands-on projects",
        videos: [
          { id: "dQw4w9WgXcQ", title: "Introduction to Web Development", duration: "12:30", order: 1 },
          { id: "jNQXAC9IVRw", title: "HTML Fundamentals", duration: "18:45", order: 2 },
          { id: "9bZkp7q19f0", title: "CSS Styling Basics", duration: "22:15", order: 3 },
          { id: "kJQP7kiw5Fk", title: "JavaScript Introduction", duration: "16:20", order: 4 },
          { id: "2Vv-BfVoq4g", title: "Building Your First Website", duration: "20:10", order: 5 },
          { id: "8aGhZQkoFbQ", title: "Responsive Design", duration: "19:30", order: 6 },
        ],
        difficulty: "Beginner",
        category: "Web Development",
        totalDuration: "1h 49m",
        aiReason: "This course provides a perfect foundation for web development beginners.",
      });
    }
  }, [id, course]);

  if (!course) return null;

  const currentVideo = course.videos[currentVideoIndex];
  const progress = (completedVideos.length / course.videos.length) * 100;
  const quizUnlocked = progress >= 60;

  const handleVideoComplete = () => {
    if (!completedVideos.includes(currentVideoIndex)) {
      const newCompleted = [...completedVideos, currentVideoIndex];
      setCompletedVideos(newCompleted);

      // Show quiz prompt when 60% complete
      if ((newCompleted.length / course.videos.length) * 100 >= 60 && !showQuizPrompt) {
        setShowQuizPrompt(true);
        toast({
          title: "Quiz Unlocked! 🎉",
          description: "You've completed 60% of the course. Ready to test your knowledge?",
        });
      }

      toast({
        title: "Video completed!",
        description: "Keep going, you're doing great!",
      });
    }
  };

  const handleNextVideo = () => {
    if (currentVideoIndex < course.videos.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    }
  };

  const handlePreviousVideo = () => {
    if (currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 1);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/app" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Dashboard</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="hidden md:block text-sm text-muted-foreground">
              Progress: {Math.round(progress)}%
            </div>
            <Progress value={progress} className="w-32 hidden md:block" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Video Player Section */}
        <main className="flex-1 p-4 lg:p-6">
          <div className="max-w-5xl mx-auto">
            {/* Video Player */}
            <div className="relative aspect-video bg-black rounded-2xl overflow-hidden mb-6 shadow-large">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${currentVideo.id}?autoplay=0&rel=0`}
                title={currentVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0"
              ></iframe>
            </div>

            {/* Video Info */}
            <div className="mb-6">
              <Badge className="mb-3">{course.category}</Badge>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">{currentVideo.title}</h1>
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Play className="w-4 h-4" />
                  Video {currentVideoIndex + 1} of {course.videos.length}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {currentVideo.duration}
                </div>
              </div>
            </div>

            {/* Video Controls */}
            <div className="flex flex-wrap gap-3 mb-6">
              <Button onClick={handleVideoComplete} variant="secondary" disabled={completedVideos.includes(currentVideoIndex)}>
                {completedVideos.includes(currentVideoIndex) ? (
                  <>
                    <CheckCircle className="mr-2 w-4 h-4" />
                    Completed
                  </>
                ) : (
                  <>
                    <CheckCircle className="mr-2 w-4 h-4" />
                    Mark as Complete
                  </>
                )}
              </Button>
              {currentVideoIndex > 0 && (
                <Button onClick={handlePreviousVideo} variant="outline">
                  Previous Video
                </Button>
              )}
              {currentVideoIndex < course.videos.length - 1 && (
                <Button onClick={handleNextVideo} variant="hero">
                  Next Video
                  <ChevronRight className="ml-2 w-4 h-4" />
                </Button>
              )}
            </div>

            {/* Tabs Section */}
            <Tabs defaultValue="about" className="mb-6">
              <TabsList>
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="transcript">Transcript</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
              </TabsList>

              <TabsContent value="about" className="mt-4">
                <Card className="p-6">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    Why This Was Curated
                  </h3>
                  <p className="text-muted-foreground mb-6">{course.aiReason}</p>

                  <h3 className="font-semibold mb-3">Learning Objectives</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                      <span>Understand core concepts and fundamentals</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                      <span>Apply knowledge through practical examples</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                      <span>Build real-world projects and portfolio pieces</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                      <span>Prepare for quizzes and certification</span>
                    </li>
                  </ul>
                </Card>
              </TabsContent>

              <TabsContent value="transcript" className="mt-4">
                <Card className="p-6">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <FileText className="w-5 h-5" />
                    <span>Video transcript will appear here</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    Auto-generated transcripts help you follow along and review key points at your own pace.
                  </p>
                </Card>
              </TabsContent>

              <TabsContent value="resources" className="mt-4">
                <Card className="p-6">
                  <h3 className="font-semibold mb-4">Additional Resources</h3>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="mr-2 w-4 h-4" />
                      Download Course Notes (PDF)
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="mr-2 w-4 h-4" />
                      Practice Exercises
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="mr-2 w-4 h-4" />
                      Reference Links
                    </Button>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Quiz CTA */}
            {showQuizPrompt && (
              <Card className="p-6 bg-gradient-hero shadow-large">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1 text-white text-center md:text-left">
                    <h3 className="text-xl font-bold mb-2">Ready to Test Your Knowledge?</h3>
                    <p className="text-white/90">
                      You've unlocked the quiz! Complete it to earn your certificate and prove your skills.
                    </p>
                  </div>
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={() => navigate(`/app/quiz/${course.id}`, { state: { course } })}
                  >
                    Take Quiz Now
                  </Button>
                </div>
              </Card>
            )}

            {!quizUnlocked && (
              <Card className="p-6 bg-muted/30 border-dashed">
                <div className="flex items-center gap-4 text-muted-foreground">
                  <Lock className="w-8 h-8" />
                  <div>
                    <div className="font-semibold text-foreground mb-1">Quiz Locked</div>
                    <div className="text-sm">Complete 60% of videos to unlock the quiz and earn your certificate</div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </main>

        {/* Playlist Sidebar */}
        <aside className="w-full lg:w-96 border-t lg:border-t-0 lg:border-l bg-muted/30 p-4 lg:p-6 lg:overflow-y-auto">
          <div className="mb-4">
            <h2 className="text-lg font-bold mb-2">{course.title}</h2>
            <div className="text-sm text-muted-foreground mb-4">
              {completedVideos.length} of {course.videos.length} videos completed
            </div>
            <Progress value={progress} className="mb-2" />
            <div className="text-xs text-muted-foreground">{Math.round(progress)}% complete</div>
          </div>

          <div className="space-y-2">
            {course.videos.map((video: any, index: number) => (
              <Card
                key={video.id}
                onClick={() => setCurrentVideoIndex(index)}
                className={`p-4 cursor-pointer transition-all hover:shadow-medium ${
                  currentVideoIndex === index ? "ring-2 ring-primary bg-primary/5" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    {completedVideos.includes(index) ? (
                      <div className="w-8 h-8 rounded-lg bg-secondary/20 flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-secondary" />
                      </div>
                    ) : (
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          currentVideoIndex === index
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {index + 1}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm mb-1 line-clamp-2">{video.title}</div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {video.duration}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CoursePlayer;
