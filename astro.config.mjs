import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Po nasazení na Netlify sem doplňte svoji adresu, např. https://serm-havlickuv-brod.cz
// (používá se pro sitemap.xml a RSS kanál). Lze zadat i přes proměnnou SITE_URL.
const SITE = process.env.SITE_URL || 'https://serm-havlickuv-brod.netlify.app';

export default defineConfig({
  site: SITE,
  integrations: [sitemap()],
});
