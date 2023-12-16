import { component$, Slot } from '@builder.io/qwik';
import type { RequestHandler } from '@builder.io/qwik-city';
import { routeLoader$, useNavigate } from '@builder.io/qwik-city';

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
  return pathname;
});

export default component$(() => {
  const navigate = useNavigate();

  const imagesAmount = useImagesAmount();
  const pathname = usePathname();

  return (
    <>
      <Navigation
        imagesAmount={imagesAmount.value}
        navigate={navigate}
        pathName={pathname.value}
      />
      <main>
        <Slot />
      </main>
    </>
  );
});
