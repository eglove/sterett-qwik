import lodash from 'lodash';
import { z } from 'zod';

import { NO_DRAFTS, sterettSanityClient } from '../sterett-sanity-client';
import { imageAssetSchema } from './schema';

export const getGalleryImagesSchema = z.array(
  z.object({
    _id: z.string(),
    description: z.string(),
    image: z.object({
      asset: imageAssetSchema,
    }),
  }),
);

export const getGalleryImages = async (): Promise<
  z.infer<typeof getGalleryImagesSchema>
> => {
  const imagesQuery = `*[_type == "galleryImage" && ${NO_DRAFTS}]{_id, description, image{asset->{_id, url, path, assetId, extension, metadata{dimensions{height, width}}}}}`;

  const images =
    await sterettSanityClient.fetch<z.infer<typeof getGalleryImagesSchema>>(
      imagesQuery,
    );

  return lodash.shuffle(images);
};
