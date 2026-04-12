// @ts-check
import { defineConfig } from 'astro/config';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkDirective from 'remark-directive';
import { remarkAlert } from 'remark-github-blockquote-alert';

// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: [remarkMath, remarkDirective, remarkAlert],
    rehypePlugins: [rehypeKatex],
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'one-dark-pro',
      },
      defaultColor: false,
    },
  },
});