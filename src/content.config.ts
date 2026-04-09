// src/content.config.ts
import { z, defineCollection } from 'astro:content';
// 1. Import the glob loader
import { glob } from 'astro/loaders'; 

const blogsCollection = defineCollection({
  // 2. Replace type: 'content' with the glob loader
  loader: glob({ pattern: '**/*.md', base: './src/content/blogs' }), 
  schema: z.object({
    author: z.string(),
    title: z.string(),
    custom_css: z.string().optional(),
    custom_js: z.string().optional(),
  }),
});

export const collections = {
  'blogs': blogsCollection,
};