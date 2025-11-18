import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Sparkles,
  Trophy,
  Users,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Play,
  Clock,
  Target,
  Award,
  Briefcase,
  Star,
} from "lucide-react";

const Landing = () => {
  const tracks = [
    {
      title: "Leadership & Management",
      description: "Build executive skills, team management, and strategic thinking",
      icon: Users,
      courses: 42,
      students: "25k+",
      difficulty: "Intermediate to Advanced",
    },
    {
      title: "Technology & Innovation",
      description: "Digital transformation, AI/ML, and emerging technologies",
      icon: TrendingUp,
      courses: 58,
      students: "32k+",
      difficulty: "All Levels",
    },
    {
      title: "Sales & Marketing",
      description: "Growth strategies, B2B sales, and digital marketing excellence",
      icon: Target,
      courses: 36,
      students: "18k+",
      difficulty: "Beginner to Advanced",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "AI-Powered Skill Assessment",
      description:
        "Identify skill gaps and training needs with intelligent assessments. Our AI creates personalized learning roadmaps.",
      icon: Sparkles,
    },
    {
      number: "02",
      title: "Corporate Training Programs",
      description:
        "Engage teams with curated content and industry certifications. Track progress with advanced analytics.",
      icon: Trophy,
    },
    {
      number: "03",
      title: "Talent Marketplace",
      description:
        "Connect skilled professionals with opportunities. Build high-performing teams efficiently.",
      icon: Briefcase,
    },
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "HR Director",
      college: "TechCorp Solutions",
      quote:
        "CorpReady transformed our workforce development. Our team's productivity increased by 40% in just 3 months!",
      rating: 5,
    },
    {
      name: "Priya Mehta",
      role: "L&D Manager",
      college: "Global Innovations Ltd",
      quote:
        "The AI-powered assessments are game-changing. We can now track skill gaps and measure ROI effectively.",
      rating: 5,
    },
    {
      name: "Amit Sharma",
      role: "CTO",
      college: "StartupHub India",
      quote:
        "CorpReady helped us build a skilled tech team rapidly. The talent matching feature is incredibly accurate.",
      rating: 5,
    },
  ];

  const stats = [
    { value: "500+", label: "Enterprise Clients" },
    { value: "50k+", label: "Professionals Trained" },
    { value: "1000+", label: "Career Opportunities" },
    { value: "98%", label: "Satisfaction Rate" },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-hero flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">CorpReady</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="#" className="text-sm font-medium hover:text-primary transition-colors">
              Programs
            </Link>
            <Link to="#" className="text-sm font-medium hover:text-primary transition-colors">
              Opportunities
            </Link>
            <Link to="#" className="text-sm font-medium hover:text-primary transition-colors">
              Mentorship
            </Link>
            <Link to="#" className="text-sm font-medium hover:text-primary transition-colors">
              For Enterprises
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/signin">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button variant="hero" size="sm">
                Start Free
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 opacity-30" style={{background: 'var(--gradient-mesh)'}}></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 glass shadow-glass px-4 py-2 text-primary border-primary/20">
              🚀 AI-Powered Corporate Training Platform
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Upskill Your Workforce.
              <br />
              <span className="bg-gradient-hero bg-clip-text text-transparent">Drive Business Growth.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Transform your team with AI-curated learning paths, industry certifications, and verified skill assessments. 
              Connect talent with opportunities seamlessly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button variant="hero" size="lg" className="text-base px-8 shadow-large">
                  Start Free Trial
                  <ArrowRight className="ml-2" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-base px-8 glass shadow-glass">
                <Play className="mr-2" />
                Watch Demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 glass shadow-glass text-secondary border-secondary/20">How It Works</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Transform Your Workforce</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From skill assessment to career advancement, we power your entire talent development lifecycle
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <Card key={step.number} className="p-8 text-center shadow-medium hover:shadow-large transition-shadow">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-hero mx-auto mb-6 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-muted-foreground/30 mb-3">{step.number}</div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Learning Tracks */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 glass shadow-glass text-primary border-primary/20">Popular Programs</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Enterprise Training Programs</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Industry-leading programs designed for corporate excellence and professional growth
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {tracks.map((track) => {
              const Icon = track.icon;
              return (
                <Card
                  key={track.title}
                  className="p-6 hover:shadow-large transition-all hover:-translate-y-1 cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 group-hover:bg-gradient-hero transition-all flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{track.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{track.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary" className="text-xs">
                      {track.courses} courses
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {track.students} students
                    </Badge>
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="w-3 h-3 mr-1" />
                    {track.difficulty}
                  </div>
                </Card>
              );
            })}
          </div>
          <div className="text-center mt-10">
            <Link to="/signup">
              <Button variant="outline" size="lg" className="glass shadow-glass">
                Explore All Programs
                <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 glass shadow-glass text-accent border-accent/20">Success Stories</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Leading Organizations</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join 500+ companies transforming their workforce with CorpReady
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="p-6 shadow-medium">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-sm mb-6 leading-relaxed">{testimonial.quote}</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-hero flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{testimonial.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {testimonial.role} • {testimonial.college}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="p-12 md:p-16 text-center bg-gradient-hero shadow-large animate-gradient relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Transform Your Workforce?</h2>
              <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
                Join 500+ enterprises building future-ready teams with CorpReady's AI-powered platform
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/signup">
                  <Button variant="secondary" size="lg" className="text-base px-8 shadow-large">
                    Start Free Trial
                    <ArrowRight className="ml-2" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="text-base px-8 bg-white/10 text-white border-white/30 hover:bg-white/20">
                  Schedule Demo
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-hero flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold bg-gradient-hero bg-clip-text text-transparent">CorpReady</span>
              </div>
              <p className="text-sm text-muted-foreground">
                AI-powered corporate training platform connecting professionals to skills and career opportunities.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link to="#" className="hover:text-primary transition-colors">
                    Training Programs
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-primary transition-colors">
                    Talent Marketplace
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-primary transition-colors">
                    Enterprise Solutions
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-primary transition-colors">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link to="#" className="hover:text-primary transition-colors">
                    About CorpReady
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-primary transition-colors">
                    For Enterprises
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-primary transition-colors">
                    Resources
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-primary transition-colors">
                    Contact Sales
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link to="#" className="hover:text-primary transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-primary transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:text-primary transition-colors">
                    Refund Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 text-center text-sm text-muted-foreground">
            <p>© 2025 CorpReady by corpready.in. All rights reserved. Empowering professionals, transforming businesses.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
