import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  CheckCircle,
  ArrowRight,
  Play,
  Clock,
  Award,
  Star,
  GraduationCap,
  Zap,
  Rocket,
  BookOpen,
  Youtube,
  Brain,
  Target,
  Trophy,
  ListChecks,
  Video,
  TrendingUp,
} from "lucide-react";

const Landing = () => {
  const features = [
    {
      title: "AI-Curated Learning Paths",
      description: "Tell us what you want to learn. Our AI creates personalized learning pathways from thousands of YouTube videos.",
      icon: Brain,
      highlight: "Smart curation",
    },
    {
      title: "YouTube-Powered Content",
      description: "Access expert-created video content from top creators. Learn from the best without the noise.",
      icon: Youtube,
      highlight: "Quality content",
    },
    {
      title: "Structured Pathways",
      description: "No more scattered learning. Get organized modules with clear progression from beginner to expert.",
      icon: ListChecks,
      highlight: "Clear roadmap",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Describe Your Goal",
      description: "Tell our AI what you want to learn, your background, and your objectives. Be as specific or broad as you like.",
      icon: Target,
    },
    {
      number: "02",
      title: "Get Curated Pathway",
      description: "Receive a structured learning path with hand-picked YouTube videos organized into progressive modules.",
      icon: Sparkles,
    },
    {
      number: "03",
      title: "Learn & Achieve",
      description: "Follow your personalized pathway, track progress, and earn certificates to prove your new skills.",
      icon: Trophy,
    },
  ];

  const useCases = [
    {
      title: "Career Switchers",
      description: "Moving to a new field? Get a complete learning roadmap tailored to your transition goals.",
      icon: Rocket,
    },
    {
      title: "Skill Upgraders",
      description: "Stay current in your field with curated content on the latest trends and technologies.",
      icon: TrendingUp,
    },
    {
      title: "Students & Graduates",
      description: "Complement your education with practical, industry-relevant skills from real-world experts.",
      icon: GraduationCap,
    },
  ];

  const stats = [
    { value: "AI-Powered", label: "Course Curation" },
    { value: "YouTube", label: "Video Content" },
    { value: "Personalized", label: "Learning Paths" },
    { value: "Certificates", label: "Proof of Skills" },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50 shadow-soft">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-hero flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold leading-tight">CorpReady</span>
              <span className="text-[9px] text-muted-foreground -mt-0.5">Learning Pathways</span>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="#features" className="text-sm font-medium hover:text-primary transition-colors">
              Features
            </Link>
            <Link to="#how-it-works" className="text-sm font-medium hover:text-primary transition-colors">
              How It Works
            </Link>
            <Link to="#use-cases" className="text-sm font-medium hover:text-primary transition-colors">
              Use Cases
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/signin">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="hero" size="sm" className="shadow-medium hover:shadow-large transition-shadow">
                Start Free
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-hero opacity-5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-accent/10 text-accent border-accent/20">
              <Sparkles className="w-3 h-3 mr-1 inline" />
              AI-Powered Learning Curation
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Your Personalized
              <br />
              <span className="bg-gradient-hero bg-clip-text text-transparent">Learning Pathway</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Stop wasting time searching for learning resources. Get AI-curated learning paths from YouTube's
              best content, organized into structured modules tailored to your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button variant="hero" size="lg" className="text-base px-8 shadow-medium hover:shadow-large transition-all">
                  Create My Learning Path
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-base px-8 shadow-soft hover:shadow-medium transition-all">
                <Play className="mr-2 w-5 h-5" />
                See Example
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center p-4 rounded-xl hover:bg-muted/50 transition-colors">
                  <div className="text-2xl md:text-3xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Why Choose Us</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Learning Made Simple</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              No more endless searching. No more scattered bookmarks. Just focused, personalized learning.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="p-8 shadow-medium hover:shadow-large transition-shadow">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-hero mb-6 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <Badge className="mb-3 bg-secondary/10 text-secondary border-secondary/20 text-xs">
                    {feature.highlight}
                  </Badge>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-secondary/10 text-secondary border-secondary/20">How It Works</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">From Goal to Growth in 3 Steps</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A streamlined process to turn your learning goals into structured action
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <Card key={step.number} className="p-8 text-center shadow-medium hover:shadow-large transition-shadow relative overflow-hidden">
                  <div className="absolute top-0 right-0 text-8xl font-bold text-muted-foreground/5">{step.number}</div>
                  <div className="w-16 h-16 rounded-2xl bg-gradient-hero mx-auto mb-6 flex items-center justify-center relative z-10">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 relative z-10">{step.title}</h3>
                  <p className="text-muted-foreground relative z-10">{step.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section id="use-cases" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">Use Cases</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Perfect For Every Learner</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Whether you're starting fresh or leveling up, we've got you covered
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {useCases.map((useCase) => {
              const Icon = useCase.icon;
              return (
                <Card
                  key={useCase.title}
                  className="p-6 hover:shadow-large transition-all hover:-translate-y-1 cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 group-hover:bg-gradient-hero transition-all flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{useCase.title}</h3>
                  <p className="text-muted-foreground text-sm">{useCase.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto p-12 text-center bg-gradient-hero shadow-large">
            <div className="mb-6">
              <Zap className="w-16 h-16 text-white mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Start Your Learning Journey?
              </h2>
              <p className="text-white/90 text-lg max-w-2xl mx-auto">
                Join thousands of learners who've found their path. Get your personalized learning roadmap in minutes.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" variant="secondary" className="text-base px-8">
                  Create Free Account
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/signin">
                <Button size="lg" variant="outline" className="text-base px-8 bg-white/10 text-white border-white/20 hover:bg-white/20">
                  Sign In
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-hero flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold leading-tight">CorpReady</span>
                <span className="text-[9px] text-muted-foreground -mt-0.5">Learning Pathways</span>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2025 CorpReady. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
