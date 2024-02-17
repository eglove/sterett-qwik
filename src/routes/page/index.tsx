import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { routeLoader$ } from '@builder.io/qwik-city';
import { qwikify$ } from '@builder.io/qwik-react';
import { Link } from '@nextui-org/react';

import { Container } from '../../components/container';
import { getAllPages } from '../../sanity/queries/get-all-pages';

export const head: DocumentHead = {
  meta: [
    {
      content: 'Additional pages for Sterett Creek Village Trustee',
      name: 'description',
    },
  ],
  title: 'Sterett Creek Village Trustee | Pages',
};

export const usePages = routeLoader$(async () => {
  return getAllPages();
});

const QLink = qwikify$(Link);

export default component$(() => {
  const data = usePages();

  return (
    <Container>
      {data.value.map(page => {
        return (
          <div key={page._id} class="w-full">
            <QLink
              key={page._id}
              className="underline"
              href={`/page/${page.slug.current}`}
            >
              {page.title}
            </QLink>
          </div>
        );
      })}
    </Container>
  );
});
