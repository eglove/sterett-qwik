import { z } from 'zod';

import { sterettSanityClient } from '../sterett-sanity-client';
import { imageAssetSchema, typedObjectSchema } from './schema';

export const getPageSchema = z.object({
  _id: z.string(),
  content: z.intersection(typedObjectSchema, imageAssetSchema),
  title: z.string(),
});

export async function getPage(
  slug: string,
): Promise<z.output<typeof getPageSchema> | undefined> {
  const pageQuery = `*[_type == "page" && slug.current == $slug]{
    _id, 
    title, 
    content[] {
      ...,
      asset-> {
        _id,
        url,
        hotspot,
        crop,
        metadata {
          lqip,
          dimensions {
            height,
            width,
          }
        }
      }
    }
  }`;

  const pages = await sterettSanityClient.fetch<
    z.infer<typeof getPageSchema>[]
  >(pageQuery, {
    slug,
  });

  const FIRST = 0;
  return pages[FIRST];
}
