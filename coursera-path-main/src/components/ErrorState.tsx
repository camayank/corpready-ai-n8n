import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw, ArrowLeft, Wifi, Server, Zap } from "lucide-react";

interface ErrorStateProps {
  type?: "network" | "server" | "api" | "generic";
  title?: string;
  message?: string;
  onRetry?: () => void;
  onBack?: () => void;
  showRetry?: boolean;
  showBack?: boolean;
}

export const ErrorState = ({
  type = "generic",
  title,
  message,
  onRetry,
  onBack,
  showRetry = true,
  showBack = false,
}: ErrorStateProps) => {
  const errorConfig = {
    network: {
      icon: Wifi,
      defaultTitle: "Connection Issue",
      defaultMessage:
        "We're having trouble connecting to the server. Please check your internet connection and try again.",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10",
    },
    server: {
      icon: Server,
      defaultTitle: "Server Error",
      defaultMessage:
        "Our servers are experiencing issues. Don't worry, we're on it! Please try again in a moment.",
      color: "text-red-500",
      bgColor: "bg-red-500/10",
    },
    api: {
      icon: Zap,
      defaultTitle: "API Limit Reached",
      defaultMessage:
        "We've reached our daily limit for YouTube API requests. Please try again tomorrow or contact support for assistance.",
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
    },
    generic: {
      icon: AlertCircle,
      defaultTitle: "Something went wrong",
      defaultMessage: "We encountered an unexpected error. Please try again or contact support if the issue persists.",
      color: "text-red-500",
      bgColor: "bg-red-500/10",
    },
  };

  const config = errorConfig[type];
  const Icon = config.icon;

  return (
    <Card className="p-8 border-2 border-destructive/20">
      <div className="flex flex-col items-center text-center space-y-6">
        {/* Icon */}
        <div className={`w-20 h-20 rounded-full ${config.bgColor} flex items-center justify-center`}>
          <Icon className={`w-10 h-10 ${config.color}`} />
        </div>

        {/* Title and Message */}
        <div className="space-y-2 max-w-md">
          <h3 className="text-2xl font-bold">{title || config.defaultTitle}</h3>
          <p className="text-muted-foreground">{message || config.defaultMessage}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 flex-wrap justify-center">
          {showRetry && onRetry && (
            <Button onClick={onRetry} variant="default" className="gap-2">
              <RefreshCw className="w-4 h-4" />
              Try Again
            </Button>
          )}
          {showBack && onBack && (
            <Button onClick={onBack} variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </Button>
          )}
        </div>

        {/* Additional Help */}
        <div className="pt-4 border-t w-full">
          <p className="text-xs text-muted-foreground">
            If this problem persists, please{" "}
            <a href="mailto:support@corpready.com" className="text-primary hover:underline">
              contact our support team
            </a>
          </p>
        </div>
      </div>
    </Card>
  );
};

export const EmptyState = ({
  icon: Icon = AlertCircle,
  title = "No results found",
  message = "Try adjusting your search criteria",
  actionLabel,
  onAction,
}: {
  icon?: any;
  title?: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
}) => {
  return (
    <Card className="p-12 border-2 border-dashed">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
          <Icon className="w-8 h-8 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-muted-foreground text-sm max-w-md">{message}</p>
        </div>
        {actionLabel && onAction && (
          <Button onClick={onAction} variant="outline">
            {actionLabel}
          </Button>
        )}
      </div>
    </Card>
  );
};
