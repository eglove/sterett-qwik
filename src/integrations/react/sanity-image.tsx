/** @jsxImportSource react **/
import type { JSX } from "react";
import type { z } from "zod";

import { SanityImage as SImage } from "sanity-image";

import type { imageAssetSchema } from "../../sanity/queries/schema";

import { imageBuilder } from "../../sanity/sterett-sanity-client";

type SanityPortableImageProperties = {
  readonly altText: string;
  readonly image: z.output<typeof imageAssetSchema>;
};

export function SanityPortableImage({
  altText,
  image,
}: SanityPortableImageProperties): JSX.Element {
  const IMAGE_SIZE = 600;
  const imageUrl = imageBuilder
    .image(image.url)
    .maxWidth(IMAGE_SIZE)
    .format("webp")
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
