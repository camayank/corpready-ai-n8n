import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Eye, ThumbsUp, Clock, ExternalLink } from "lucide-react";
import { YouTubeVideo } from "@/services/youtube.service";

interface YouTubeVideoCardProps {
  video: YouTubeVideo;
  onClick?: () => void;
  showStats?: boolean;
}

export const YouTubeVideoCard = ({ video, onClick, showStats = true }: YouTubeVideoCardProps) => {
  const thumbnailUrl = video.thumbnail.high || video.thumbnail.medium || video.thumbnail.default;

  const openInYouTube = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(`https://www.youtube.com/watch?v=${video.id}`, '_blank');
  };

  return (
    <Card
      className="overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
      onClick={onClick}
    >
      <div className="relative">
        <img
          src={thumbnailUrl}
          alt={video.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Play className="w-12 h-12 text-white" />
        </div>
        {video.durationFormatted && (
          <Badge className="absolute bottom-2 right-2 bg-black/80 text-white">
            {video.durationFormatted}
          </Badge>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-sm line-clamp-2 mb-2 group-hover:text-primary transition-colors">
          {video.title}
        </h3>
        <p className="text-xs text-muted-foreground mb-3">{video.channelTitle}</p>

        {showStats && (
          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
            {video.viewCountFormatted && (
              <div className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                <span>{video.viewCountFormatted}</span>
              </div>
            )}
            {video.likeCount && parseInt(video.likeCount) > 0 && (
              <div className="flex items-center gap-1">
                <ThumbsUp className="w-3 h-3" />
                <span>{formatNumber(parseInt(video.likeCount))}</span>
              </div>
            )}
            {video.durationFormatted && (
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{video.durationFormatted}</span>
              </div>
            )}
          </div>
        )}

        <button
          onClick={openInYouTube}
          className="mt-3 flex items-center gap-1 text-xs text-primary hover:underline"
        >
          <ExternalLink className="w-3 h-3" />
          Watch on YouTube
        </button>
      </div>
    </Card>
  );
};

const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
};
