import { component$, Slot } from '@builder.io/qwik';
import type { RequestHandler } from '@builder.io/qwik-city';
import { routeLoader$ } from '@builder.io/qwik-city';

import { Navigation } from '../integrations/react/navigation';
import { getGalleryImagesAmount } from '../sanity/queries/get-gallery-images-amount';

export const onGet: RequestHandler = async ({ cacheControl }) => {
  cacheControl({
    maxAge: 5,
    staleWhileRevalidate: 86_400,
  });
};

export const useImagesAmount = routeLoader$(() => {
  return getGalleryImagesAmount();
});

export const usePathname = routeLoader$(({ pathname }) => {
  if (pathname.at(-1) === '/' && pathname !== '/') {
    return pathname.slice(0, -1);
  }

  return pathname;
});

export default component$(() => {
  const imagesAmount = useImagesAmount();
  const pathname = usePathname();

  return (
    <>
      <Navigation imagesAmount={imagesAmount.value} pathName={pathname.value} />
      <main>
        <Slot />
      </main>
    </>
  );
});
