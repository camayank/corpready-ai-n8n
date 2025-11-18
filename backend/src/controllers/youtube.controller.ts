import { Request, Response } from 'express';
import { youtubeService } from '../services/youtube.service';

/**
 * Search YouTube videos
 */
export const searchVideos = async (req: Request, res: Response) => {
  try {
    const { query, maxResults = 10, videoDuration, order } = req.query;

    if (!query || typeof query !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Search query is required',
      });
    }

    if (!youtubeService.isConfigured()) {
      return res.status(503).json({
        success: false,
        message: 'YouTube API is not configured',
      });
    }

    const videos = await youtubeService.searchVideos(
      query,
      parseInt(maxResults as string) || 10,
      {
        videoDuration: videoDuration as any,
        order: order as any,
        safeSearch: 'strict',
      }
    );

    res.json({
      success: true,
      data: videos,
      count: videos.length,
    });
  } catch (error: any) {
    console.error('YouTube search error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to search videos',
    });
  }
};

/**
 * Get video details by ID(s)
 */
export const getVideoDetails = async (req: Request, res: Response) => {
  try {
    const { videoIds } = req.query;

    if (!videoIds || typeof videoIds !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Video ID(s) are required',
      });
    }

    if (!youtubeService.isConfigured()) {
      return res.status(503).json({
        success: false,
        message: 'YouTube API is not configured',
      });
    }

    const ids = videoIds.split(',');
    const videos = await youtubeService.getVideoDetails(ids);

    // Format the response with additional computed fields
    const formattedVideos = videos.map(video => ({
      ...video,
      durationFormatted: youtubeService.formatDuration(video.duration),
      durationSeconds: youtubeService.parseDuration(video.duration),
      viewCountFormatted: youtubeService.formatViewCount(video.viewCount),
    }));

    res.json({
      success: true,
      data: formattedVideos,
      count: formattedVideos.length,
    });
  } catch (error: any) {
    console.error('YouTube video details error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to get video details',
    });
  }
};

/**
 * Search for educational videos on a topic
 */
export const searchEducationalVideos = async (req: Request, res: Response) => {
  try {
    const { topic, maxResults = 10 } = req.query;

    if (!topic || typeof topic !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Topic is required',
      });
    }

    if (!youtubeService.isConfigured()) {
      return res.status(503).json({
        success: false,
        message: 'YouTube API is not configured',
      });
    }

    const videos = await youtubeService.searchEducationalVideos(
      topic,
      parseInt(maxResults as string) || 10
    );

    // Format the response with additional computed fields
    const formattedVideos = videos.map(video => ({
      ...video,
      durationFormatted: youtubeService.formatDuration(video.duration),
      durationSeconds: youtubeService.parseDuration(video.duration),
      viewCountFormatted: youtubeService.formatViewCount(video.viewCount),
    }));

    res.json({
      success: true,
      data: formattedVideos,
      count: formattedVideos.length,
    });
  } catch (error: any) {
    console.error('YouTube educational search error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to search educational videos',
    });
  }
};

/**
 * Check if YouTube API is configured
 */
export const checkConfiguration = async (req: Request, res: Response) => {
  const configured = youtubeService.isConfigured();

  res.json({
    success: true,
    configured,
    message: configured
      ? 'YouTube API is configured and ready'
      : 'YouTube API key is not configured',
  });
};
