import fs from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

const SITE_URL = process.env.SITE_URL || 'https://xcaligames.cloud';

// Mapa de fechas reales de los artículos del blog para evitar <lastmod> idéntico en el sitemap
function getBlogLastModMap() {
  const blogDir = path.resolve('src/content/blog');
  const dates = new Map();
  let latest = null;

  if (!fs.existsSync(blogDir)) return { dates, latest };

  for (const file of fs.readdirSync(blogDir)) {
    if (!file.endsWith('.md') || file.startsWith('_')) continue;
    const raw = fs.readFileSync(path.join(blogDir, file), 'utf-8');
    const updated = raw.match(/^updatedDate:\s*(\d{4}-\d{2}-\d{2})/m)?.[1];
    const published = raw.match(/^pubDate:\s*(\d{4}-\d{2}-\d{2})/m)?.[1];
    const iso = updated || published;
    if (iso) {
      const slug = file.replace(/\.md$/, '');
      const dateStr = new Date(`${iso}T12:00:00Z`).toISOString();
      dates.set(`/blog/${slug}`, dateStr);
      if (!latest || dateStr > latest) latest = dateStr;
    }
  }
  return { dates, latest };
}

const { dates: blogDates, latest: latestPostDate } = getBlogLastModMap();

export default defineConfig({
  site: SITE_URL,
  output: 'static',
  trailingSlash: 'never',
  compressHTML: true,
  build: {
    format: 'file',
    inlineStylesheets: 'auto',
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: true,
    },
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404'),
      serialize(item) {
        const pathname = new URL(item.url).pathname.replace(/\/$/, '') || '/';
        if (blogDates.has(pathname)) {
          item.lastmod = blogDates.get(pathname);
        } else if (latestPostDate && (pathname === '/' || pathname === '/blog')) {
          item.lastmod = latestPostDate;
        }
        return item;
      },
    }),
  ],
});
