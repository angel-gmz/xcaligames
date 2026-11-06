import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z
        .string()
        .max(65, 'El título no debe superar los 65 caracteres para optimizar el CTR en SERPs.'),
      description: z
        .string()
        .min(120, 'La meta description debe tener al menos 120 caracteres.')
        .max(160, 'La meta description no debe exceder 160 caracteres.'),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: image(),
      heroImageAlt: z.string().min(10, 'El texto alternativo de la imagen es obligatorio para SEO.'),
      tags: z.array(z.string()).default(['general']),
      draft: z.boolean().default(false),
    }),
});

export const collections = { blog };

