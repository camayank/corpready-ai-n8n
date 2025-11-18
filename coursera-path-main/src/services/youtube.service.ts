import { apiClient } from './api';

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
  durationFormatted?: string;
  durationSeconds?: number;
  viewCount: string;
  viewCountFormatted?: string;
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

export interface YouTubeApiResponse<T> {
  success: boolean;
  data: T;
  count: number;
  message?: string;
}

class YouTubeService {
  /**
   * Search for YouTube videos
   */
  async searchVideos(
    query: string,
    maxResults: number = 10,
    options: {
      videoDuration?: 'short' | 'medium' | 'long';
      order?: 'date' | 'rating' | 'relevance' | 'title' | 'videoCount' | 'viewCount';
    } = {}
  ): Promise<YouTubeSearchResult[]> {
    try {
      const response = await apiClient.get<YouTubeApiResponse<YouTubeSearchResult[]>>(
        '/youtube/search',
        {
          params: {
            query,
            maxResults,
            ...options,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('YouTube search error:', error);
      throw error;
    }
  }

  /**
   * Get detailed information about specific videos
   */
  async getVideoDetails(videoIds: string | string[]): Promise<YouTubeVideo[]> {
    try {
      const ids = Array.isArray(videoIds) ? videoIds.join(',') : videoIds;

      const response = await apiClient.get<YouTubeApiResponse<YouTubeVideo[]>>(
        '/youtube/videos',
        {
          params: {
            videoIds: ids,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('YouTube video details error:', error);
      throw error;
    }
  }

  /**
   * Search for educational videos on a topic
   */
  async searchEducationalVideos(
    topic: string,
    maxResults: number = 10
  ): Promise<YouTubeVideo[]> {
    try {
      const response = await apiClient.get<YouTubeApiResponse<YouTubeVideo[]>>(
        '/youtube/educational',
        {
          params: {
            topic,
            maxResults,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('YouTube educational search error:', error);
      throw error;
    }
  }

  /**
   * Check if YouTube API is configured
   */
  async checkConfiguration(): Promise<boolean> {
    try {
      const response = await apiClient.get<{
        success: boolean;
        configured: boolean;
        message: string;
      }>('/youtube/config');

      return response.configured;
    } catch (error) {
      // Silently return false if backend is unavailable
      return false;
    }
  }

  /**
   * Get thumbnail URL for a video ID
   */
  getThumbnailUrl(
    videoId: string,
    quality: 'default' | 'medium' | 'high' | 'standard' | 'maxres' = 'high'
  ): string {
    const qualityMap = {
      default: 'default',
      medium: 'mqdefault',
      high: 'hqdefault',
      standard: 'sddefault',
      maxres: 'maxresdefault',
    };

    return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}.jpg`;
  }

  /**
   * Get YouTube watch URL
   */
  getWatchUrl(videoId: string): string {
    return `https://www.youtube.com/watch?v=${videoId}`;
  }

  /**
   * Get YouTube embed URL
   */
  getEmbedUrl(videoId: string): string {
    return `https://www.youtube.com/embed/${videoId}`;
  }
}

export const youtubeService = new YouTubeService();
