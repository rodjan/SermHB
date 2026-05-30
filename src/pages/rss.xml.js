import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const aktuality = (await getCollection('aktuality'))
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: 'ŠERM Havlíčkův Brod – Aktuality',
    description: 'Novinky a aktuality ze šermířského oddílu ŠERM Havlíčkův Brod.',
    site: context.site,
    items: aktuality.map((p) => ({
      title: p.data.title,
      pubDate: p.data.date,
      description: p.data.perex ?? '',
      link: `/aktuality/${p.id}/`,
    })),
    customData: '<language>cs-cz</language>',
  });
}
