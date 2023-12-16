/** @jsxImportSource react **/
import type { JSX } from 'react';
import { SanityImage as SImage } from 'sanity-image';
import type { z } from 'zod';

import type { imageAssetSchema } from '../../sanity/queries/schema';
import { imageBuilder } from '../../sanity/sterett-sanity-client';

type SanityPortableImageProperties = {
  readonly altText: string;
  readonly image: z.output<typeof imageAssetSchema>;
};

export function SanityPortableImage({
  altText,
  image,
}: SanityPortableImageProperties): JSX.Element {
  const imageUrl = imageBuilder
    .image(image.url)
    .maxWidth(600)
    .format('webp')
    .url();

  return (
    <div className="grid place-items-center">
      <SImage
        alt={altText}
        baseUrl={imageUrl}
        className="relative max-h-96"
        crop={image.crop}
        hotspot={image.hotspot}
        id={image._id}
        mode="contain"
        preview={image.metadata.lqip}
      />
    </div>
  );
}
