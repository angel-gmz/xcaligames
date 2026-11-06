import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const posts = await getCollection('blog', ({ data }) => data.draft !== true);
  const sortedPosts = posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  return rss({
    title: 'XcaliGames | Devlog & Blog Oficial',
    description:
      'Noticias, artículos técnicos y diarios de desarrollo de Torchbound y Riserift por XcaliGames.',
    site: context.site || 'https://xcaligames.cloud',
    trailingSlash: false,
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/blog/${post.id}`,
      categories: post.data.tags,
    })),
    customData: `<language>es-mx</language>`,
  });
}

