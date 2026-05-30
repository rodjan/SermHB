import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Aktuality / novinky – sem trenér přidává příspěvky přes administraci
const aktuality = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/aktuality' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    perex: z.string().optional(),
    cover: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

// Trenéři
const treneri = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/treneri' }),
  schema: z.object({
    name: z.string(),
    role: z.string().optional(),
    photo: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    order: z.number().default(100),
  }),
});

// Výsledky a závody
const vysledky = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/vysledky' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    misto: z.string().optional(),
    zbran: z.enum(['fleret', 'kord', 'šavle', 'ostatní']).default('fleret'),
    cover: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

// Dokumenty ke stažení
const dokumenty = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/dokumenty' }),
  schema: z.object({
    title: z.string(),
    file: z.string(),
    kategorie: z.string().default('Ostatní'),
    date: z.coerce.date().optional(),
    order: z.number().default(100),
  }),
});

// Fotogalerie – alba
const galerie = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/galerie' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    cover: z.string().optional(),
    fotky: z.array(z.object({ obrazek: z.string(), popis: z.string().optional() })).default([]),
    draft: z.boolean().default(false),
  }),
});

// Editovatelné texty stránek (O klubu, Tréninky, Příspěvky, Kontakt …)
const stranky = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/stranky' }),
  schema: z.object({
    title: z.string(),
  }),
});

export const collections = { aktuality, treneri, vysledky, dokumenty, galerie, stranky };
