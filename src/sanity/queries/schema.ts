import { z } from 'zod';

export const imageAssetSchema = z.object({
  _id: z.string(),
  crop: z.object({
    bottom: z.number(),
    left: z.number(),
    right: z.number(),
    top: z.number(),
  }),
  hotspot: z.object({ x: z.number(), y: z.number() }),
  metadata: z.object({
    dimensions: z.object({
      height: z.number(),
      width: z.number(),
    }),
    lqip: z.string(),
  }),
  url: z.string(),
});

export const typedObjectSchema = z.object({
  _key: z.string().optional(),
  _type: z.string(),
});
