import { component$, Slot } from '@builder.io/qwik';
import type { RequestHandler } from '@builder.io/qwik-city';
import { routeLoader$, useNavigate } from '@builder.io/qwik-city';

import { Navigation } from '../integrations/navigation';

export const onGet: RequestHandler = async ({ cacheControl }) => {
  cacheControl({
    maxAge: 5,
    staleWhileRevalidate: 86_400,
  });
};

export const usePathname = routeLoader$(({ pathname }) => {
  return pathname;
});

export default component$(() => {
  const navigate = useNavigate();
  const pathname = usePathname();

  return (
    <>
      <Navigation
        imagesAmount={0}
        navigate={navigate}
        pathName={pathname.value}
      />
      <main>
        <Slot />
      </main>
    </>
  );
});
