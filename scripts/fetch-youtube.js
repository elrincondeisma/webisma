// Script to fetch YouTube videos and cache them
import 'dotenv/config';

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

if (!YOUTUBE_API_KEY || !CHANNEL_ID) {
    console.error('❌ Missing environment variables: YOUTUBE_API_KEY or YOUTUBE_CHANNEL_ID');
    process.exit(1);
}
const MAX_RESULTS = 30; // Fetch more to ensure we have enough after filtering

async function fetchYouTubeVideos() {
    const url = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet&order=date&maxResults=${MAX_RESULTS}&type=video`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`YouTube API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        const videos = data.items.map(item => ({
            id: item.id.videoId,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url,
            publishedAt: item.snippet.publishedAt,
            url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        }));

        // Get video statistics AND duration (views, likes, duration, etc.)
        const videoIds = videos.map(v => v.id).join(',');
        const statsUrl = `https://www.googleapis.com/youtube/v3/videos?key=${YOUTUBE_API_KEY}&id=${videoIds}&part=statistics,contentDetails`;

        const statsResponse = await fetch(statsUrl);
        const statsData = await statsResponse.json();

        // Merge statistics with video data and categorize
        const videosWithStats = videos.map((video, index) => {
            const stats = statsData.items[index]?.statistics;
            const contentDetails = statsData.items[index]?.contentDetails;
            const duration = contentDetails?.duration;

            // Parse ISO 8601 duration
            // Videos > 3 minutes (180s) are regular videos
            // Videos <= 3 minutes are shorts
            const durationSeconds = duration ? parseDuration(duration) : 0;
            const isShort = durationSeconds > 0 && durationSeconds <= 180;

            return {
                ...video,
                views: stats?.viewCount ? formatViews(parseInt(stats.viewCount)) : '0',
                date: formatDate(video.publishedAt),
                duration: duration,
                durationSeconds: durationSeconds,
                isShort: isShort,
            };
        });

        // Separate shorts from regular videos and limit quantities
        const regularVideos = videosWithStats.filter(v => !v.isShort).slice(0, 8);
        const shorts = videosWithStats.filter(v => v.isShort).slice(0, 6);

        return {
            videos: regularVideos,
            shorts: shorts,
            lastFetched: new Date().toISOString(),
        };
    } catch (error) {
        console.error('Error fetching YouTube videos:', error);
        throw error;
    }
}

function parseDuration(isoDuration) {
    // Parse ISO 8601 duration format (e.g., PT1M13S, PT15S, PT1H2M3S)
    const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (!match) return 0;

    const hours = parseInt(match[1] || 0);
    const minutes = parseInt(match[2] || 0);
    const seconds = parseInt(match[3] || 0);

    return hours * 3600 + minutes * 60 + seconds;
}

function formatViews(views) {
    if (views >= 1000000) {
        return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
        return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
        return 'Hoy';
    } else if (diffDays === 1) {
        return 'Hace 1 día';
    } else if (diffDays < 7) {
        return `Hace ${diffDays} días`;
    } else if (diffDays < 30) {
        const weeks = Math.floor(diffDays / 7);
        return `Hace ${weeks} ${weeks === 1 ? 'semana' : 'semanas'}`;
    } else if (diffDays < 365) {
        const months = Math.floor(diffDays / 30);
        return `Hace ${months} ${months === 1 ? 'mes' : 'meses'}`;
    } else {
        const years = Math.floor(diffDays / 365);
        return `Hace ${years} ${years === 1 ? 'año' : 'años'}`;
    }
}

// Main execution
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

fetchYouTubeVideos()
    .then(data => {
        const outputPath = path.join(__dirname, '../src/data/youtube-cache.json');
        fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));

        console.log(`✅ Successfully fetched YouTube content:`);
        console.log(`   📹 ${data.videos.length} regular videos`);
        console.log(`   🎬 ${data.shorts.length} shorts`);
        console.log(`📦 Cached at: ${outputPath}`);
        console.log(`🕐 Last fetched: ${data.lastFetched}`);
    })
    .catch(error => {
        console.error('❌ Failed to fetch YouTube videos:', error.message);
        process.exit(1);
    });
