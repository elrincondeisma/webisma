import { defineCollection, z } from 'astro:content';

const videos = defineCollection({
    type: 'content', // v2.5.0+
    schema: z.object({
        title: z.string(),
        thumbnail: z.string(),
        views: z.string(),
        date: z.string(), // Or z.date() if we want real dates, keeping string for now to match current
        url: z.string().url(),
    }),
});

const news = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        excerpt: z.string(),
        date: z.string(),
        category: z.string(),
    }),
});

export const collections = {
    videos,
    news,
};
