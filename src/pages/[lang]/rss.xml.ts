import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { SITE } from '@/lib/constants';
import type { Locale } from '@/lib/constants';
import { absoluteUrl } from '@/lib/seo';
import { listBlogForLocale } from '@/lib/content/blog';
import { langStaticPaths } from '@/lib/i18n/routing';

export const prerender = true;

export function getStaticPaths() {
  return langStaticPaths();
}

export const GET: APIRoute = async (context) => {
  const lang = context.params.lang as Locale;
  const posts = listBlogForLocale(lang);
  return rss({
    title: `${SITE.name} · Blog`,
    description: SITE.title,
    site: SITE.url,
    items: posts.map((p) => ({
      title: p.fm.title,
      description: p.fm.description,
      pubDate: new Date(p.fm.publishedAt),
      link: absoluteUrl(`/${lang}/blog/${p.slug}/`)
    }))
  });
};
