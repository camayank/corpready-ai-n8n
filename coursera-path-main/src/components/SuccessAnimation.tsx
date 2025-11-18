import { useEffect, useState } from "react";
import { CheckCircle, Sparkles, Trophy, Rocket } from "lucide-react";
import { Card } from "@/components/ui/card";

interface SuccessAnimationProps {
  show: boolean;
  onComplete?: () => void;
  message?: string;
  subMessage?: string;
}

export const SuccessAnimation = ({
  show,
  onComplete,
  message = "Success!",
  subMessage = "Your personalized learning path is ready",
}: SuccessAnimationProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (show) {
      setIsVisible(true);

      // Stage 1: Checkmark appears
      setTimeout(() => setStage(1), 100);

      // Stage 2: Sparkles
      setTimeout(() => setStage(2), 400);

      // Stage 3: Full celebration
      setTimeout(() => setStage(3), 700);

      // Complete animation
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 2000);
    } else {
      setIsVisible(false);
      setStage(0);
    }
  }, [show, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-in fade-in duration-300">
      <Card className="p-8 max-w-md mx-4 border-2 border-primary/20 bg-gradient-to-br from-primary/5 via-transparent to-accent/5">
        <div className="flex flex-col items-center text-center space-y-6">
          {/* Animated Checkmark */}
          <div className="relative">
            <div
              className={`w-24 h-24 rounded-full bg-gradient-hero flex items-center justify-center transition-all duration-500 ${
                stage >= 1 ? "scale-100 rotate-0" : "scale-0 rotate-180"
              }`}
            >
              <CheckCircle className="w-12 h-12 text-white" />
            </div>

            {/* Floating Sparkles */}
            {stage >= 2 && (
              <>
                <Sparkles
                  className={`absolute -top-2 -right-2 w-6 h-6 text-yellow-500 animate-bounce transition-all ${
                    stage >= 2 ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ animationDelay: "0ms" }}
                />
                <Sparkles
                  className={`absolute -bottom-2 -left-2 w-6 h-6 text-yellow-500 animate-bounce transition-all ${
                    stage >= 2 ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ animationDelay: "150ms" }}
                />
                <Trophy
                  className={`absolute top-0 -left-4 w-6 h-6 text-amber-500 animate-bounce transition-all ${
                    stage >= 2 ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ animationDelay: "75ms" }}
                />
                <Rocket
                  className={`absolute -top-4 left-0 w-6 h-6 text-blue-500 animate-bounce transition-all ${
                    stage >= 2 ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ animationDelay: "225ms" }}
                />
              </>
            )}
          </div>

          {/* Message */}
          <div
            className={`space-y-2 transition-all duration-500 ${
              stage >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <h3 className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              {message}
            </h3>
            <p className="text-muted-foreground">{subMessage}</p>
          </div>

          {/* Confetti Effect (CSS-based) */}
          {stage >= 3 && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-gradient-hero rounded-full animate-confetti"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: "-10px",
                    animationDelay: `${Math.random() * 0.5}s`,
                    animationDuration: `${1 + Math.random()}s`,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

// Add this to your global CSS (index.css)
export const confettiStyles = `
@keyframes confetti {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(720deg);
    opacity: 0;
  }
}

.animate-confetti {
  animation: confetti linear forwards;
}
`;
