import { useState } from "react";
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
import { BookOpen, Sparkles, ArrowRight, ArrowLeft, Play, Clock, Target, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CourseCurate = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [curatedCourses, setCuratedCourses] = useState<any[]>([]);

  // Form state
  const [formData, setFormData] = useState({
    classYear: "",
    degree: "",
    studyArea: "",
    interests: [] as string[],
    goals: "",
    experienceLevel: "",
  });

  const studyAreas = [
    "Computer Science",
    "Information Technology",
    "Electronics",
    "Mechanical Engineering",
    "Business Administration",
    "Commerce",
    "Marketing",
    "Data Science",
    "Design",
    "Other",
  ];

  const interestOptions = [
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
  ];

  const toggleInterest = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleGenerate = async () => {
    if (formData.interests.length === 0) {
      toast({
        title: "Select at least one interest",
        description: "Please choose topics you'd like to learn about",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    // Simulate AI course curation
    setTimeout(() => {
      const mockCourses = [
        {
          id: 1,
          title: `${formData.interests[0]} Fundamentals`,
          description: `Master the basics of ${formData.interests[0]} with hands-on projects and real-world examples`,
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
            {
              id: "2Vv-BfVoq4g",
              title: "Project Walkthrough Part 1",
              duration: "20:10",
              order: 5,
            },
            {
              id: "8aGhZQkoFbQ",
              title: "Project Walkthrough Part 2",
              duration: "19:30",
              order: 6,
            },
          ],
          difficulty: formData.experienceLevel || "Beginner",
          category: formData.interests[0],
          totalDuration: "1h 49m",
          aiReason: `Based on your background in ${formData.studyArea} and interest in ${formData.interests[0]}, this course provides a perfect foundation. The curriculum is tailored to ${formData.experienceLevel || "beginner"} level learners.`,
        },
        {
          id: 2,
          title: `Advanced ${formData.interests[1] || formData.interests[0]} Mastery`,
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
            {
              id: "3JZ_D3ELwOQ",
              title: "Real-World Applications",
              duration: "23:15",
              order: 5,
            },
            {
              id: "hTWKbfoikeg",
              title: "Final Project Guide",
              duration: "25:20",
              order: 6,
            },
          ],
          difficulty: "Intermediate",
          category: formData.interests[1] || formData.interests[0],
          totalDuration: "2h 3m",
          aiReason: `This advanced course aligns with your goals: "${formData.goals}". It bridges theory and practice, preparing you for real internship opportunities.`,
        },
      ];

      setCuratedCourses(mockCourses);
      setIsGenerating(false);
      setStep(4);
    }, 2000);
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Tell us about yourself</h2>
        <p className="text-muted-foreground">Help us understand your academic background</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="classYear">Current Class/Year</Label>
          <Select value={formData.classYear} onValueChange={(value) => setFormData({ ...formData, classYear: value })}>
            <SelectTrigger className="mt-1.5">
              <SelectValue placeholder="Select your class/year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="12th">12th Standard</SelectItem>
              <SelectItem value="1st-year">1st Year (College)</SelectItem>
              <SelectItem value="2nd-year">2nd Year (College)</SelectItem>
              <SelectItem value="3rd-year">3rd Year (College)</SelectItem>
              <SelectItem value="4th-year">4th Year (College)</SelectItem>
              <SelectItem value="graduate">Recent Graduate</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="degree">Degree/Stream</Label>
          <Input
            id="degree"
            placeholder="e.g., B.Tech, BBA, B.Com, B.Sc"
            value={formData.degree}
            onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
            className="mt-1.5"
          />
        </div>

        <div>
          <Label htmlFor="studyArea">Current Study Area</Label>
          <Select value={formData.studyArea} onValueChange={(value) => setFormData({ ...formData, studyArea: value })}>
            <SelectTrigger className="mt-1.5">
              <SelectValue placeholder="Select your field of study" />
            </SelectTrigger>
            <SelectContent>
              {studyAreas.map((area) => (
                <SelectItem key={area} value={area}>
                  {area}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">What do you want to learn?</h2>
        <p className="text-muted-foreground">Select all topics that interest you</p>
      </div>

      <div className="flex flex-wrap gap-3">
        {interestOptions.map((interest) => (
          <Badge
            key={interest}
            onClick={() => toggleInterest(interest)}
            className={`cursor-pointer px-4 py-2 text-sm transition-all ${
              formData.interests.includes(interest)
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-muted text-foreground hover:bg-muted/80"
            }`}
          >
            {formData.interests.includes(interest) && <CheckCircle className="w-4 h-4 mr-2" />}
            {interest}
          </Badge>
        ))}
      </div>

      {formData.interests.length > 0 && (
        <Card className="p-4 bg-primary/5 border-primary/20">
          <div className="text-sm">
            <span className="font-semibold">Selected:</span> {formData.interests.join(", ")}
          </div>
        </Card>
      )}
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Final details</h2>
        <p className="text-muted-foreground">Help AI personalize your learning path</p>
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
          <Label htmlFor="goals">What are your learning goals?</Label>
          <Textarea
            id="goals"
            placeholder="E.g., I want to land an internship in data analytics, build a portfolio website, learn digital marketing for my startup..."
            value={formData.goals}
            onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
            className="mt-1.5 min-h-[120px]"
          />
        </div>
      </div>
    </div>
  );

  const renderCuratedResults = () => (
    <div className="space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-hero mx-auto mb-4 flex items-center justify-center">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Your Personalized Learning Path</h2>
        <p className="text-muted-foreground">AI curated {curatedCourses.length} courses based on your profile</p>
      </div>

      <div className="space-y-4">
        {curatedCourses.map((course) => (
          <Card key={course.id} className="p-6 shadow-medium hover:shadow-large transition-all">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-48 h-32 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Play className="w-12 h-12 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <Badge className="mb-2">{course.category}</Badge>
                    <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                  </div>
                </div>
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

                <div className="flex gap-3">
                  <Button
                    variant="hero"
                    onClick={() => navigate(`/app/course/${course.id}`, { state: { course } })}
                  >
                    Start Learning
                  </Button>
                  <Button variant="outline">Save for Later</Button>
                </div>
              </div>
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
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-hero flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold">SkillPath India</span>
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
          {step < 4 && (
            <div className="mb-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">
                  Step {step} of 3
                </span>
                <span className="text-sm text-muted-foreground">{Math.round((step / 3) * 100)}% complete</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-gradient-hero h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(step / 3) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Step Content */}
          <Card className="p-8 shadow-large">
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
            {step === 4 && renderCuratedResults()}

            {/* Navigation Buttons */}
            {step < 4 && (
              <div className="flex justify-between mt-8 pt-6 border-t">
                {step > 1 ? (
                  <Button variant="ghost" onClick={() => setStep(step - 1)}>
                    <ArrowLeft className="mr-2 w-4 h-4" />
                    Back
                  </Button>
                ) : (
                  <div></div>
                )}

                {step < 3 ? (
                  <Button
                    variant="hero"
                    onClick={() => setStep(step + 1)}
                    disabled={
                      (step === 1 && (!formData.classYear || !formData.studyArea)) ||
                      (step === 2 && formData.interests.length === 0)
                    }
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
                        Generate Courses
                        <Sparkles className="ml-2 w-4 h-4" />
                      </>
                    )}
                  </Button>
                )}
              </div>
            )}
          </Card>
        </div>
      </main>
    </div>
  );
};

export default CourseCurate;
