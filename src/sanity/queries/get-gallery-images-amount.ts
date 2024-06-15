import { z } from "zod";

import { NO_DRAFTS, sterettSanityClient } from "../sterett-sanity-client";

export const imageAssetSchema = z.object({
  metadata: z.object({
    dimensions: z.object({
      height: z.number(),
      width: z.number(),
    }),
  }),
  url: z.string(),
});

export const getGalleryImagesSchema = z.array(
  z.object({
    _id: z.string(),
    description: z.string(),
    image: z.object({
      asset: imageAssetSchema,
    }),
  }),
);

export const getGalleryImagesAmount = async (): Promise<number> => {
  const imagesQuery = `*[_type == "galleryImage" && ${NO_DRAFTS}]{_id, description, image{asset->{_id, url, path, assetId, extension, metadata{dimensions{height, width}}}}}`;

  const images =
    await sterettSanityClient.fetch<z.infer<typeof getGalleryImagesSchema>>(
      imagesQuery,
    );

  return images.length;
};
