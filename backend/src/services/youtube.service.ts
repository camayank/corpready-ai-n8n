import axios from 'axios';

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_API_BASE_URL = 'https://www.googleapis.com/youtube/v3';

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: {
    default: string;
    medium: string;
    high: string;
    standard?: string;
    maxres?: string;
  };
  channelTitle: string;
  publishedAt: string;
  duration: string;
  viewCount: string;
  likeCount: string;
  commentCount: string;
  categoryId: string;
}

export interface YouTubeSearchResult {
  videoId: string;
  title: string;
  description: string;
  thumbnail: string;
  channelTitle: string;
  publishedAt: string;
}

class YouTubeService {
  /**
   * Search for YouTube videos
   * @param query - Search query
   * @param maxResults - Maximum number of results (default: 10)
   * @param options - Additional search options
   */
  async searchVideos(
    query: string,
    maxResults: number = 10,
    options: {
      videoDuration?: 'short' | 'medium' | 'long'; // short: <4min, medium: 4-20min, long: >20min
      relevanceLanguage?: string;
      safeSearch?: 'none' | 'moderate' | 'strict';
      order?: 'date' | 'rating' | 'relevance' | 'title' | 'videoCount' | 'viewCount';
    } = {}
  ): Promise<YouTubeSearchResult[]> {
    try {
      const params: any = {
        part: 'snippet',
        q: query,
        type: 'video',
        maxResults,
        key: YOUTUBE_API_KEY,
        order: options.order || 'relevance',
        safeSearch: options.safeSearch || 'moderate',
      };

      if (options.videoDuration) {
        params.videoDuration = options.videoDuration;
      }

      if (options.relevanceLanguage) {
        params.relevanceLanguage = options.relevanceLanguage;
      }

      const response = await axios.get(`${YOUTUBE_API_BASE_URL}/search`, { params });

      return response.data.items.map((item: any) => ({
        videoId: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium.url,
        channelTitle: item.snippet.channelTitle,
        publishedAt: item.snippet.publishedAt,
      }));
    } catch (error: any) {
      console.error('YouTube search error:', error.response?.data || error.message);
      throw new Error(`Failed to search YouTube videos: ${error.message}`);
    }
  }

  /**
   * Get detailed information about specific videos
   * @param videoIds - Array of video IDs or single video ID
   */
  async getVideoDetails(videoIds: string | string[]): Promise<YouTubeVideo[]> {
    try {
      const ids = Array.isArray(videoIds) ? videoIds.join(',') : videoIds;

      const response = await axios.get(`${YOUTUBE_API_BASE_URL}/videos`, {
        params: {
          part: 'snippet,contentDetails,statistics',
          id: ids,
          key: YOUTUBE_API_KEY,
        },
      });

      return response.data.items.map((item: any) => ({
        id: item.id,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: {
          default: item.snippet.thumbnails.default.url,
          medium: item.snippet.thumbnails.medium.url,
          high: item.snippet.thumbnails.high.url,
          standard: item.snippet.thumbnails.standard?.url,
          maxres: item.snippet.thumbnails.maxres?.url,
        },
        channelTitle: item.snippet.channelTitle,
        publishedAt: item.snippet.publishedAt,
        duration: item.contentDetails.duration,
        viewCount: item.statistics.viewCount,
        likeCount: item.statistics.likeCount,
        commentCount: item.statistics.commentCount,
        categoryId: item.snippet.categoryId,
      }));
    } catch (error: any) {
      console.error('YouTube video details error:', error.response?.data || error.message);
      throw new Error(`Failed to get video details: ${error.message}`);
    }
  }

  /**
   * Convert ISO 8601 duration to seconds
   * @param duration - ISO 8601 duration string (e.g., "PT15M33S")
   */
  parseDuration(duration: string): number {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) return 0;

    const hours = parseInt(match[1]) || 0;
    const minutes = parseInt(match[2]) || 0;
    const seconds = parseInt(match[3]) || 0;

    return hours * 3600 + minutes * 60 + seconds;
  }

  /**
   * Convert ISO 8601 duration to human-readable format
   * @param duration - ISO 8601 duration string (e.g., "PT15M33S")
   */
  formatDuration(duration: string): string {
    const totalSeconds = this.parseDuration(duration);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  /**
   * Format view count to human-readable format
   * @param viewCount - View count as string
   */
  formatViewCount(viewCount: string): string {
    const count = parseInt(viewCount);
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M views`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K views`;
    }
    return `${count} views`;
  }

  /**
   * Search for educational videos on a specific topic
   * @param topic - Learning topic
   * @param maxResults - Maximum number of results
   */
  async searchEducationalVideos(topic: string, maxResults: number = 10): Promise<YouTubeVideo[]> {
    // First, search for videos
    const searchResults = await this.searchVideos(
      `${topic} tutorial learn`,
      maxResults,
      {
        videoDuration: 'medium', // 4-20 minutes is ideal for learning
        order: 'relevance',
        safeSearch: 'strict',
      }
    );

    // Then get detailed information
    const videoIds = searchResults.map(result => result.videoId);
    const videoDetails = await this.getVideoDetails(videoIds);

    return videoDetails;
  }

  /**
   * Validate if YouTube API key is configured
   */
  isConfigured(): boolean {
    return !!YOUTUBE_API_KEY && YOUTUBE_API_KEY !== 'your-youtube-api-key';
  }
}

export const youtubeService = new YouTubeService();
