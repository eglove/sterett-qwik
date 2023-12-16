import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { routeLoader$ } from '@builder.io/qwik-city';
import { qwikify$ } from '@builder.io/qwik-react';
import { Image } from '@nextui-org/image';

import { Container } from '../../components/container';
import { getGalleryImages } from '../../sanity/queries/get-gallery-images';

export const head: DocumentHead = {
  meta: [
    {
      content: 'Pictures from Sterett Creek Village Trustee',
      name: 'description',
    },
  ],
  title: 'Sterett Creek Village Trustee | Gallery',
};

export const useImages = routeLoader$(() => {
  return getGalleryImages();
});

const QImage = qwikify$(Image);

export default component$(() => {
  const data = useImages();

  return (
    <Container>
      <div class="flex flex-wrap gap-4">
        {data.value.map(image => {
          return (
            <QImage
              alt={image.description}
              className="relative h-auto max-w-full rounded-lg"
              height={Number(image.image.asset.metadata.dimensions.height)}
              key={image.image.asset.url}
              src={image.image.asset.url}
              width={Number(image.image.asset.metadata.dimensions.width)}
            />
          );
        })}
      </div>
    </Container>
  );
});
