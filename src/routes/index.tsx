import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { routeLoader$ } from '@builder.io/qwik-city';
import lodash from 'lodash';

import { Container } from '../components/container';
import { SanityContent } from '../integrations/react/sanity-content';
import { getPage } from '../sanity/queries/get-page';

export const head: DocumentHead = {
  meta: [
    {
      content: 'Homepage of the Sterett Creek Village Trustee Board',
      name: 'description',
    },
  ],
  title: 'Sterett Creek Village Trustee | Home',
};

export const useHomepage = routeLoader$(() => {
  return getPage('home');
});

export default component$(() => {
  const data = useHomepage();

  if (lodash.isNil(data.value?.content)) {
    return (
      <Container>
        <p>There&apos;s nothing here yet, check back later.</p>
      </Container>
    );
  }

  return (
    <Container>
      <SanityContent value={data.value.content} />
    </Container>
  );
});
