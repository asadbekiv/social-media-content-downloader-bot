import { Injectable } from '@nestjs/common';
import 'dotenv/config';
import axios from 'axios';

@Injectable()
export class SocialMediaService {
  private readonly youtubeApiKey = process.env.YOUTUBE_APIKEY;

  async fetchContent(link: string) {
    if (link.includes('youtube.com') || link.includes('youtu.be')) {
      return this.fetchYouTubeContent(link);
    } else if (link.includes('instagram.com')) {
      return this.fetchInstagramContent(link);
    } else {
      return 'Send only Youtube and Instagram links';
    }
  }

  private async fetchYouTubeContent(link: string): Promise<Buffer> {
    const videoId = this.extractYouTubeVideoId(link);

    if (!videoId) {
      throw new Error('Invalid YouTube link');
    }

    const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${this.youtubeApiKey}&part=snippet,contentDetails,statistics,status`;

    try {
      const response = await axios.get(url);
      const video = response.data.items[0];
      console.log(video);

      const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

      // Use a third-party service or library to download the video in mp4 format
      // For example, you could use youtube-dl or a similar service to download the video
      // This is a placeholder for the actual implementation
      const downloadResponse = await axios({
        url: `https://example.com/download?videoUrl=${encodeURIComponent(videoUrl)}`,
        method: 'GET',
        responseType: 'arraybuffer',
      });

      return Buffer.from(downloadResponse.data);
    } catch (error) {
      console.error(`Failed to fetch YouTube content: ${error.message}`);
      throw new Error('Failed to fetch YouTube content');
    }
  }

  private async fetchInstagramContent(link: string): Promise<string> {
    // Fetch content from Instagram
    return 'Instagram content';
  }

  private extractYouTubeVideoId(link: string): string | null {
    const match = link.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    );
    return match ? match[1] : null;
  }
}
