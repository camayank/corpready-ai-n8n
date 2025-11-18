import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { BookOpen, Sparkles, ArrowRight, ArrowLeft, Play, Clock, Target, CheckCircle, Send, Search, Eye, ThumbsUp, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { youtubeService, YouTubeVideo } from "@/services/youtube.service";
import { YouTubeVideoCard } from "@/components/YouTubeVideoCard";
import { AnimatedProgress } from "@/components/AnimatedProgress";
import { SuccessAnimation } from "@/components/SuccessAnimation";
import { ErrorState } from "@/components/ErrorState";
import { VideoPreviewSkeleton, CourseCardSkeleton, TopicInputSkeleton } from "@/components/skeletons/CurationSkeletons";

const CourseCurate = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [curatedCourses, setCuratedCourses] = useState<any[]>([]);
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [previewVideos, setPreviewVideos] = useState<YouTubeVideo[]>([]);
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);
  const [youtubeConfigured, setYoutubeConfigured] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [generationError, setGenerationError] = useState<{ type: "network" | "server" | "api" | "generic"; message?: string } | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    userType: "",
    learningTopic: "",
    reason: "",
    experienceLevel: "",
    additionalContext: "",
  });

  const userTypeOptions = [
    { value: "student", label: "Student" },
    { value: "professional", label: "Professional" },
    { value: "owner", label: "Business Owner" },
    { value: "other", label: "Other" },
  ];

  const topicSuggestions = [
    "Web Development",
    "Mobile Development",
    "Data Analytics",
    "Machine Learning",
    "Digital Marketing",
    "Graphic Design",
    "Content Writing",
    "Business Strategy",
    "Finance",
    "Product Management",
    "Python Programming",
    "JavaScript",
    "React",
    "Node.js",
    "Data Science",
  ];

  // Check YouTube API configuration on mount
  useEffect(() => {
    checkYouTubeConfig();
  }, []);

  // Load preview videos when learning topic changes
  useEffect(() => {
    if (formData.learningTopic && formData.learningTopic.length > 3) {
      loadPreviewVideos();
    }
  }, [formData.learningTopic]);

  const checkYouTubeConfig = async () => {
    try {
      const configured = await youtubeService.checkConfiguration();
      setYoutubeConfigured(configured);
    } catch (error) {
      // Silently handle configuration check failure
      setYoutubeConfigured(false);
    }
  };

  const loadPreviewVideos = async () => {
    if (!youtubeConfigured || !formData.learningTopic) return;

    setIsLoadingPreview(true);
    try {
      const videos = await youtubeService.searchEducationalVideos(
        formData.learningTopic,
        6
      );
      setPreviewVideos(videos);
    } catch (error) {
      console.error('Failed to load preview videos:', error);
      setPreviewVideos([]);
    } finally {
      setIsLoadingPreview(false);
    }
  };

  const handleGenerate = async () => {
    if (!formData.userType || !formData.learningTopic || !formData.reason) {
      toast({
        title: "Please complete all required fields",
        description: "User type, learning topic, and reason are required",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setGenerationError(null);

    try {
      // Construct message for n8n workflow
      const chatInput = `I am a ${formData.userType}. I want to learn about ${formData.learningTopic}. My reason for learning is: ${formData.reason}. ${formData.experienceLevel ? `My experience level is ${formData.experienceLevel}.` : ''} ${formData.additionalContext ? `Additional context: ${formData.additionalContext}` : ''}`;

      // Call n8n webhook
      const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL || 'http://localhost:5678/webhook/9291673e-e3f2-47ed-9113-f70dbb32fef4';

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chatInput: chatInput,
        }),
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('network');
        } else if (response.status >= 500) {
          throw new Error('server');
        } else if (response.status === 429) {
          throw new Error('api');
        }
        throw new Error('generic');
      }

      const data = await response.json();

      // Parse n8n response and enrich with YouTube data
      // The workflow returns formatted learning pathway with topics and videos
      const parsedCourses = await parseN8NResponse(data);

      setCuratedCourses(parsedCourses);
      setIsGenerating(false);

      // Show success animation
      setShowSuccess(true);

      // Move to results step after animation
      setTimeout(() => {
        setShowSuccess(false);
        setStep(3);
      }, 2000);

      toast({
        title: "Success!",
        description: "Your personalized learning path has been generated",
      });
    } catch (error: any) {
      // Silently handle N8N errors and show user-friendly feedback

      setIsGenerating(false);

      // Determine error type
      const errorType = error.message === 'network' || error.message === 'Failed to fetch'
        ? 'network'
        : error.message === 'server'
        ? 'server'
        : error.message === 'api'
        ? 'api'
        : 'generic';

      setGenerationError({ type: errorType });

      // Fallback to mock data after showing error
      setTimeout(() => {
        toast({
          title: "Using demo data",
          description: "Showing example curriculum for demonstration",
          variant: "default",
        });

        const mockCourses = generateMockCourses();
        setCuratedCourses(mockCourses);
        setGenerationError(null);
        setStep(3);
      }, 3000);
    }
  };

  const enrichVideosWithYouTubeData = async (courses: any[]) => {
    if (!youtubeConfigured) return courses;

    try {
      const enrichedCourses = await Promise.all(
        courses.map(async (course) => {
          if (!course.videos || course.videos.length === 0) return course;

          const videoIds = course.videos.map((v: any) => v.id || v.videoId).filter(Boolean);
          if (videoIds.length === 0) return course;

          try {
            const youtubeVideos = await youtubeService.getVideoDetails(videoIds);
            const videoMap = new Map(youtubeVideos.map(v => [v.id, v]));

            const enrichedVideos = course.videos.map((video: any) => {
              const ytData = videoMap.get(video.id || video.videoId);
              if (!ytData) return video;

              return {
                ...video,
                title: ytData.title,
                duration: ytData.durationFormatted || video.duration,
                thumbnail: ytData.thumbnail.high,
                channelTitle: ytData.channelTitle,
                viewCount: ytData.viewCountFormatted,
                likeCount: ytData.likeCount ? formatLikes(parseInt(ytData.likeCount)) : null,
                description: ytData.description,
              };
            });

            return {
              ...course,
              videos: enrichedVideos,
            };
          } catch (error) {
            console.error('Error enriching videos for course:', course.id, error);
            return course;
          }
        })
      );

      return enrichedCourses;
    } catch (error) {
      console.error('Error enriching courses with YouTube data:', error);
      return courses;
    }
  };

  const formatLikes = (likes: number): string => {
    if (likes >= 1000000) return `${(likes / 1000000).toFixed(1)}M`;
    if (likes >= 1000) return `${(likes / 1000).toFixed(1)}K`;
    return likes.toString();
  };

  const parseN8NResponse = async (data: any) => {
    // Parse the n8n workflow response
    // Expected structure: topics with YouTube videos
    try {
      const courses = [];

      if (data.output && Array.isArray(data.output)) {
        data.output.forEach((topic: any, index: number) => {
          if (topic.videos && Array.isArray(topic.videos)) {
            courses.push({
              id: index + 1,
              title: topic.title || `${formData.learningTopic} - Module ${index + 1}`,
              description: topic.description || `Learn ${topic.title} with curated video content`,
              videos: topic.videos.map((video: any, vIndex: number) => ({
                id: video.videoId || video.id,
                title: video.title,
                duration: video.duration || "N/A",
                order: vIndex + 1,
                thumbnail: video.thumbnail || `https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`,
              })),
              difficulty: formData.experienceLevel || "Beginner",
              category: formData.learningTopic,
              totalDuration: calculateTotalDuration(topic.videos),
              aiReason: topic.reason || `Curated based on your interest in ${formData.learningTopic} and your goal to ${formData.reason}`,
            });
          }
        });
      }

      const baseCourses = courses.length > 0 ? courses : generateMockCourses();

      // Enrich with real YouTube data
      const enrichedCourses = await enrichVideosWithYouTubeData(baseCourses);
      return enrichedCourses;
    } catch (error) {
      console.error('Error parsing n8n response:', error);
      return generateMockCourses();
    }
  };

  const calculateTotalDuration = (videos: any[]) => {
    // Calculate total duration from video array
    let totalMinutes = 0;
    videos.forEach(video => {
      if (video.duration) {
        const parts = video.duration.split(':');
        if (parts.length === 2) {
          totalMinutes += parseInt(parts[0]) * 60 + parseInt(parts[1]);
        } else if (parts.length === 3) {
          totalMinutes += parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseInt(parts[2]);
        }
      }
    });

    const hours = Math.floor(totalMinutes / 3600);
    const minutes = Math.floor((totalMinutes % 3600) / 60);
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  const generateMockCourses = () => {
    return [
      {
        id: 1,
        title: `${formData.learningTopic} Fundamentals`,
        description: `Master the basics of ${formData.learningTopic} with hands-on projects and real-world examples`,
        videos: [
          {
            id: "dQw4w9WgXcQ",
            title: "Introduction and Overview",
            duration: "12:30",
            order: 1,
          },
          {
            id: "jNQXAC9IVRw",
            title: "Core Concepts Explained",
            duration: "18:45",
            order: 2,
          },
          {
            id: "9bZkp7q19f0",
            title: "Practical Implementation",
            duration: "22:15",
            order: 3,
          },
          {
            id: "kJQP7kiw5Fk",
            title: "Advanced Techniques",
            duration: "16:20",
            order: 4,
          },
        ],
        difficulty: formData.experienceLevel || "Beginner",
        category: formData.learningTopic,
        totalDuration: "1h 10m",
        aiReason: `Based on your profile as a ${formData.userType} interested in ${formData.learningTopic}, this course provides a perfect foundation. ${formData.reason}`,
      },
      {
        id: 2,
        title: `Advanced ${formData.learningTopic} Mastery`,
        description: `Take your skills to the next level with advanced concepts and industry best practices`,
        videos: [
          {
            id: "L_LUpnjgPso",
            title: "Advanced Fundamentals",
            duration: "15:40",
            order: 1,
          },
          {
            id: "YE7VzlLtp-4",
            title: "Expert Strategies",
            duration: "21:25",
            order: 2,
          },
          {
            id: "Mus_vwhTCq0",
            title: "Industry Case Studies",
            duration: "19:50",
            order: 3,
          },
          {
            id: "r7QXEJDJ-Ig",
            title: "Optimization Techniques",
            duration: "17:35",
            order: 4,
          },
        ],
        difficulty: "Intermediate",
        category: formData.learningTopic,
        totalDuration: "1h 14m",
        aiReason: `This advanced course aligns with your goal to ${formData.reason}. It bridges theory and practice, preparing you for real-world opportunities.`,
      },
    ];
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Tell us about yourself</h2>
        <p className="text-muted-foreground">Help our AI understand your learning context</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="userType">I am a... *</Label>
          <Select value={formData.userType} onValueChange={(value) => setFormData({ ...formData, userType: value })}>
            <SelectTrigger className="mt-1.5">
              <SelectValue placeholder="Select your role" />
            </SelectTrigger>
            <SelectContent>
              {userTypeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="learningTopic">What do you want to learn? *</Label>
          <Input
            id="learningTopic"
            placeholder="e.g., Web Development, Data Science, Digital Marketing"
            value={formData.learningTopic}
            onChange={(e) => setFormData({ ...formData, learningTopic: e.target.value })}
            className="mt-1.5"
          />
          <div className="flex flex-wrap gap-2 mt-3">
            {topicSuggestions.slice(0, 6).map((topic, index) => (
              <Badge
                key={topic}
                variant="outline"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-all-smooth hover:scale-105 active:scale-95 animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
                onClick={() => setFormData({ ...formData, learningTopic: topic })}
              >
                {topic}
              </Badge>
            ))}
          </div>

          {/* YouTube Video Preview */}
          {formData.learningTopic && previewVideos.length > 0 && (
            <div className="mt-6 animate-fade-in">
              <div className="flex items-center gap-2 mb-3">
                <Search className="w-4 h-4 text-primary" />
                <h4 className="font-semibold text-sm">Sample videos for "{formData.learningTopic}"</h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[400px] overflow-y-auto">
                {previewVideos.slice(0, 4).map((video, index) => (
                  <div
                    key={video.id}
                    className="relative group animate-scale-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <img
                      src={video.thumbnail.medium}
                      alt={video.title}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex flex-col items-center justify-center p-2">
                      <p className="text-white text-xs font-medium line-clamp-2 mb-1">{video.title}</p>
                      <div className="flex gap-2 text-white text-xs">
                        {video.viewCountFormatted && (
                          <span className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {video.viewCountFormatted}
                          </span>
                        )}
                        {video.durationFormatted && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {video.durationFormatted}
                          </span>
                        )}
                      </div>
                    </div>
                    {video.durationFormatted && (
                      <Badge className="absolute bottom-2 right-2 text-xs bg-black/80 text-white">
                        {video.durationFormatted}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                These are just samples. Our AI will curate a complete learning path for you!
              </p>
            </div>
          )}

          {isLoadingPreview && formData.learningTopic && (
            <div className="mt-6">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-primary animate-spin-slow" />
                <h4 className="font-semibold text-sm">Finding best videos for "{formData.learningTopic}"...</h4>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <VideoPreviewSkeleton key={i} />
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          <Label htmlFor="reason">Why do you want to learn this? *</Label>
          <Textarea
            id="reason"
            placeholder="E.g., To land an internship, build a portfolio project, start freelancing, switch careers..."
            value={formData.reason}
            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
            className="mt-1.5 min-h-[100px]"
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Customize your learning path</h2>
        <p className="text-muted-foreground">Optional details to personalize your curriculum</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="experienceLevel">Experience Level</Label>
          <Select
            value={formData.experienceLevel}
            onValueChange={(value) => setFormData({ ...formData, experienceLevel: value })}
          >
            <SelectTrigger className="mt-1.5">
              <SelectValue placeholder="Select your experience level" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Beginner">Beginner - Just starting out</SelectItem>
              <SelectItem value="Intermediate">Intermediate - Have some experience</SelectItem>
              <SelectItem value="Advanced">Advanced - Looking to master</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="additionalContext">Additional Context (Optional)</Label>
          <Textarea
            id="additionalContext"
            placeholder="Any specific requirements, time constraints, or preferences? E.g., I prefer project-based learning, I have 2 hours daily..."
            value={formData.additionalContext}
            onChange={(e) => setFormData({ ...formData, additionalContext: e.target.value })}
            className="mt-1.5 min-h-[120px]"
          />
        </div>

        <Card className="p-4 bg-primary/5 border-primary/20">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <p className="font-semibold mb-1">AI-Powered Curation</p>
              <p className="text-muted-foreground">
                Our AI will analyze your profile and generate a personalized learning path with curated YouTube videos,
                optimized for your goals and experience level.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

  const renderCuratedResults = () => (
    <div className="space-y-6">
      <div className="text-center animate-fade-in">
        <div className="w-16 h-16 rounded-2xl bg-gradient-hero mx-auto mb-4 flex items-center justify-center animate-bounce-subtle">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Your Personalized Learning Path</h2>
        <p className="text-muted-foreground">AI curated {curatedCourses.length} courses based on your profile</p>
      </div>

      <div className="space-y-6">
        {curatedCourses.map((course, index) => (
          <Card
            key={course.id}
            className="p-6 shadow-medium hover-lift animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="mb-6">
              <Badge className="mb-2">{course.category}</Badge>
              <h3 className="text-xl font-bold mb-2">{course.title}</h3>
              <p className="text-muted-foreground text-sm mb-4">{course.description}</p>

              <div className="flex flex-wrap gap-3 mb-4">
                <div className="flex items-center gap-1 text-sm">
                  <Play className="w-4 h-4 text-primary" />
                  <span>{course.videos.length} videos</span>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>{course.totalDuration}</span>
                </div>
                <Badge variant="outline">{course.difficulty}</Badge>
              </div>

              <Card className="p-3 bg-accent/5 border-accent/20 mb-4">
                <div className="flex items-start gap-2">
                  <Target className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <div className="text-xs text-muted-foreground">
                    <span className="font-semibold text-foreground">Why this was curated: </span>
                    {course.aiReason}
                  </div>
                </div>
              </Card>
            </div>

            {/* YouTube Video Grid */}
            {course.videos && course.videos.length > 0 && (
              <div className="mb-6">
                <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                  <Play className="w-4 h-4 text-primary" />
                  Course Videos ({course.videos.length})
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {course.videos.map((video: any, videoIndex: number) => (
                    <div
                      key={video.id}
                      className="group animate-fade-in"
                      style={{ animationDelay: `${videoIndex * 0.05}s` }}
                    >
                      <div className="relative rounded-lg overflow-hidden mb-2">
                        <img
                          src={video.thumbnail || `https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                          alt={video.title}
                          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <Play className="w-10 h-10 text-white" />
                        </div>
                        {video.duration && (
                          <Badge className="absolute bottom-2 right-2 text-xs bg-black/80 text-white">
                            {video.duration}
                          </Badge>
                        )}
                      </div>
                      <div>
                        <h5 className="font-medium text-sm line-clamp-2 mb-1">{video.title}</h5>
                        {video.channelTitle && (
                          <p className="text-xs text-muted-foreground mb-2">{video.channelTitle}</p>
                        )}
                        {(video.viewCount || video.likeCount) && (
                          <div className="flex gap-3 text-xs text-muted-foreground">
                            {video.viewCount && (
                              <span className="flex items-center gap-1">
                                <Eye className="w-3 h-3" />
                                {video.viewCount}
                              </span>
                            )}
                            {video.likeCount && (
                              <span className="flex items-center gap-1">
                                <ThumbsUp className="w-3 h-3" />
                                {video.likeCount}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3">
              <Button
                variant="hero"
                onClick={() => navigate(`/app/course/${course.id}`, { state: { course } })}
              >
                Start Learning
              </Button>
              <Button variant="outline">Save for Later</Button>
            </div>
          </Card>
        ))}
      </div>

      <div className="text-center pt-4">
        <Button variant="ghost" onClick={() => window.location.reload()}>
          Curate Different Courses
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Success Animation Overlay */}
      <SuccessAnimation
        show={showSuccess}
        onComplete={() => setShowSuccess(false)}
      />

      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-hero flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">CorpReady</span>
          </Link>
          <Link to="/app">
            <Button variant="ghost" size="sm">
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Progress Indicator */}
          {step < 3 && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">
                  Step {step} of 2
                </span>
                <span className="text-sm text-muted-foreground">{Math.round((step / 2) * 100)}% complete</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-gradient-hero h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(step / 2) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Animated Progress During Generation */}
          {isGenerating && (
            <div className="animate-fade-in">
              <AnimatedProgress isGenerating={isGenerating} />
            </div>
          )}

          {/* Error State */}
          {generationError && !isGenerating && (
            <div className="animate-scale-in">
              <ErrorState
                type={generationError.type}
                message={generationError.message}
                onRetry={() => {
                  setGenerationError(null);
                  handleGenerate();
                }}
                onBack={() => setGenerationError(null)}
                showRetry={true}
                showBack={true}
              />
            </div>
          )}

          {/* Step Content */}
          {!isGenerating && !generationError && (
            <Card className="p-8 shadow-large animate-fade-in">
              {step === 1 && renderStep1()}
              {step === 2 && renderStep2()}
              {step === 3 && renderCuratedResults()}

              {/* Navigation Buttons */}
              {step < 3 && (
              <div className="flex justify-between mt-8 pt-6 border-t">
                {step > 1 ? (
                  <Button variant="ghost" onClick={() => setStep(step - 1)}>
                    <ArrowLeft className="mr-2 w-4 h-4" />
                    Back
                  </Button>
                ) : (
                  <div></div>
                )}

                {step < 2 ? (
                  <Button
                    variant="hero"
                    onClick={() => setStep(step + 1)}
                    disabled={!formData.userType || !formData.learningTopic || !formData.reason}
                  >
                    Continue
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                ) : (
                  <Button variant="hero" onClick={handleGenerate} disabled={isGenerating}>
                    {isGenerating ? (
                      <>
                        <Sparkles className="mr-2 w-4 h-4 animate-pulse" />
                        AI is Curating...
                      </>
                    ) : (
                      <>
                        Generate My Learning Path
                        <Sparkles className="ml-2 w-4 h-4" />
                      </>
                    )}
                  </Button>
                )}
              </div>
              )}
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default CourseCurate;
