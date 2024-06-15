import type { RequestHandler } from "@builder.io/qwik-city";

import { component$, Slot } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";

import { Navigation } from "../integrations/react/navigation";
import { getGalleryImagesAmount } from "../sanity/queries/get-gallery-images-amount";

export const onGet: RequestHandler = ({ cacheControl }) => {
  cacheControl({
    maxAge: 60,
    staleWhileRevalidate: 86_400,
  });
};

export const useImagesAmount = routeLoader$(async () => {
  return getGalleryImagesAmount();
});

export const usePathname = routeLoader$(({ pathname }) => {
  const FIRST = 0;
  const LAST = -1;
  if ("/" === pathname.at(LAST) && "/" !== pathname) {
    return pathname.slice(FIRST, LAST);
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
