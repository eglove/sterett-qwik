/** @jsxImportSource react **/
import { Image } from '@nextui-org/image';
import type { JSX } from 'react';
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
      <Image
        alt={altText}
        className="relative max-h-96 object-contain"
        height={image.metadata.dimensions.height}
        src={imageUrl}
        width={image.metadata.dimensions.width}
      />
    </div>
  );
}
