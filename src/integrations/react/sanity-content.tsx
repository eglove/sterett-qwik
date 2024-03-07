/** @jsxImportSource react **/
import { qwikify$ } from '@builder.io/qwik-react';
import type { PortableTextReactComponents } from '@portabletext/react';
import { PortableText } from '@portabletext/react';
import type { TypedObject } from '@portabletext/types';
import type { JSX } from 'react';
import { twMerge } from 'tailwind-merge';
import type { z } from 'zod';

import type { imageAssetSchema } from '../../sanity/queries/schema';
import { SanityPortableImage } from './sanity-image';

type SanityContentProperties = {
  // eslint-disable-next-line react/require-default-props
  readonly className?: string;
  readonly value: TypedObject;
};

const potableTextComponents: Partial<PortableTextReactComponents> = {
  types: {
    image(properties: {
      value?: { altText?: string; asset: z.infer<typeof imageAssetSchema> };
    }): JSX.Element | null {
      if (properties.value?.asset !== undefined) {
        return (
          <SanityPortableImage
            altText={properties.value.altText ?? ''}
            image={properties.value.asset}
          />
        );
      }

      return null;
    },
  },
};

export function RSanityContent({
  value,
  className,
}: SanityContentProperties): JSX.Element {
  return (
    <div className={twMerge('prose', className)}>
      <PortableText components={potableTextComponents} value={value} />
    </div>
  );
}

export const SanityContent = qwikify$(RSanityContent, { eagerness: 'visible' });
