import { component$, Slot } from '@builder.io/qwik';
import type { RequestHandler } from '@builder.io/qwik-city';

import { Navigation } from '../integrations/navigation';

export const onGet: RequestHandler = async ({ cacheControl }) => {
  cacheControl({
    maxAge: 5,
    staleWhileRevalidate: 86_400,
  });
};

export default component$(() => {
  return (
    <>
      <Navigation imagesAmount={0} pathName="/" />
      <main>
        <Slot />
      </main>
    </>
  );
});
