import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Sparkles, Brain, Search, Video, CheckCircle } from "lucide-react";

interface AnimatedProgressProps {
  isGenerating: boolean;
  stage?: "analyzing" | "generating" | "searching" | "finalizing" | "complete";
}

export const AnimatedProgress = ({ isGenerating, stage = "analyzing" }: AnimatedProgressProps) => {
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);

  const stages = [
    {
      id: "analyzing",
      icon: Brain,
      label: "Analyzing your learning goals",
      description: "Our AI is understanding your requirements",
      progress: 25,
    },
    {
      id: "generating",
      icon: Sparkles,
      label: "Generating custom curriculum",
      description: "Creating personalized modules just for you",
      progress: 50,
    },
    {
      id: "searching",
      icon: Search,
      label: "Finding best educational content",
      description: "Searching YouTube for top-rated tutorials",
      progress: 75,
    },
    {
      id: "finalizing",
      icon: Video,
      label: "Finalizing your learning path",
      description: "Organizing videos and structuring modules",
      progress: 95,
    },
    {
      id: "complete",
      icon: CheckCircle,
      label: "Your path is ready!",
      description: "Enjoy your personalized learning journey",
      progress: 100,
    },
  ];

  useEffect(() => {
    if (!isGenerating) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const nextProgress = prev + 1;

        // Update stage based on progress
        if (nextProgress >= 25 && nextProgress < 50 && currentStage < 1) {
          setCurrentStage(1);
        } else if (nextProgress >= 50 && nextProgress < 75 && currentStage < 2) {
          setCurrentStage(2);
        } else if (nextProgress >= 75 && nextProgress < 95 && currentStage < 3) {
          setCurrentStage(3);
        } else if (nextProgress >= 95 && currentStage < 4) {
          setCurrentStage(4);
        }

        return nextProgress >= 100 ? 100 : nextProgress;
      });
    }, 300);

    return () => clearInterval(interval);
  }, [isGenerating, currentStage]);

  if (!isGenerating) return null;

  const activeStage = stages[currentStage];
  const StageIcon = activeStage.icon;

  return (
    <Card className="p-8 border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-transparent to-accent/5">
      <div className="space-y-6">
        {/* Icon and Title */}
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-hero flex items-center justify-center mb-4 animate-bounce">
            <StageIcon className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold mb-2">{activeStage.label}</h3>
          <p className="text-sm text-muted-foreground">{activeStage.description}</p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <Progress value={progress} className="h-3" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Progress</span>
            <span className="font-medium">{progress}%</span>
          </div>
        </div>

        {/* Stage Indicators */}
        <div className="flex justify-between items-center pt-4">
          {stages.slice(0, 4).map((stageItem, index) => {
            const Icon = stageItem.icon;
            const isActive = index === currentStage;
            const isCompleted = index < currentStage;

            return (
              <div
                key={stageItem.id}
                className={`flex flex-col items-center gap-2 transition-all duration-300 ${
                  isActive ? "scale-110" : isCompleted ? "opacity-70" : "opacity-30"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                    isActive
                      ? "bg-gradient-hero text-white shadow-lg"
                      : isCompleted
                      ? "bg-primary/20 text-primary"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </div>
                <span className="text-xs text-center max-w-[80px] hidden sm:block">
                  {stageItem.label.split(" ").slice(0, 2).join(" ")}
                </span>
              </div>
            );
          })}
        </div>

        {/* Fun Facts */}
        <div className="pt-4 border-t">
          <p className="text-xs text-center text-muted-foreground italic">
            {currentStage === 0 && "💡 Did you know? Personalized learning paths improve retention by 60%"}
            {currentStage === 1 && "🎯 Our AI analyzes thousands of learning patterns to create your perfect path"}
            {currentStage === 2 && "📚 We search through millions of educational videos to find the best matches"}
            {currentStage === 3 && "✨ Almost there! Organizing everything for optimal learning flow"}
          </p>
        </div>
      </div>
    </Card>
  );
};
