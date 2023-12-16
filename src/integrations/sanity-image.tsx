/** @jsxImportSource react **/
import { Image } from '@nextui-org/image';
import type { JSX } from 'react';
import type { z } from 'zod';

import type { imageAssetSchema } from '../sanity/queries/schema';

type SanityPortableImageProperties = {
  readonly altText: string;
  readonly image: z.output<typeof imageAssetSchema>;
};

export function SanityPortableImage({
  altText,
  image,
}: SanityPortableImageProperties): JSX.Element {
  return (
    <div className="grid place-items-center">
      <Image
        alt={altText}
        className="relative max-h-96 object-contain"
        height={image.metadata.dimensions.height}
        src={image.url}
        width={image.metadata.dimensions.width}
      />
    </div>
  );
}
