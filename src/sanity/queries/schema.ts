import { z } from 'zod';

export const imageAssetSchema = z.object({
  metadata: z.object({
    dimensions: z.object({
      height: z.number(),
      width: z.number(),
    }),
  }),
  url: z.string(),
});

export const typedObjectSchema = z.object({
  _key: z.string().optional(),
  _type: z.string(),
});
