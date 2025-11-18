import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const VideoPreviewSkeleton = () => {
  return (
    <div className="relative group animate-pulse">
      <div className="w-full h-24 bg-gradient-to-r from-muted via-muted/50 to-muted rounded-lg"></div>
      <div className="mt-2 space-y-2">
        <div className="h-3 bg-muted rounded w-3/4"></div>
        <div className="h-2 bg-muted rounded w-1/2"></div>
      </div>
    </div>
  );
};

export const CourseCardSkeleton = () => {
  return (
    <Card className="p-6 animate-pulse">
      <div className="mb-6">
        <div className="h-4 bg-muted rounded w-20 mb-2"></div>
        <div className="h-6 bg-muted rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-muted rounded w-full mb-4"></div>

        <div className="flex gap-3 mb-4">
          <div className="h-5 bg-muted rounded w-20"></div>
          <div className="h-5 bg-muted rounded w-16"></div>
          <div className="h-5 bg-muted rounded w-24"></div>
        </div>

        <div className="h-16 bg-muted rounded mb-4"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {[1, 2, 3].map((i) => (
          <div key={i}>
            <div className="h-40 bg-gradient-to-r from-muted via-muted/50 to-muted rounded-lg mb-2"></div>
            <div className="h-4 bg-muted rounded w-3/4 mb-1"></div>
            <div className="h-3 bg-muted rounded w-1/2"></div>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <div className="h-10 bg-muted rounded w-32"></div>
        <div className="h-10 bg-muted rounded w-32"></div>
      </div>
    </Card>
  );
};

export const TopicInputSkeleton = () => {
  return (
    <div className="mt-6 space-y-3">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-4 h-4 bg-muted rounded animate-pulse"></div>
        <div className="h-4 bg-muted rounded w-40 animate-pulse"></div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="relative animate-pulse">
            <div className="w-full h-24 bg-gradient-to-r from-muted via-muted/80 to-muted rounded-lg"></div>
          </div>
        ))}
      </div>
    </div>
  );
};
