import type { DocumentHead } from "@builder.io/qwik-city";
import type { TypedObject } from "@portabletext/types";

import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import lodash from "lodash";

import { Container } from "../../../components/container";
import { SanityContent } from "../../../integrations/react/sanity-content";
import { getPage } from "../../../sanity/queries/get-page";

export const head: DocumentHead = ({ params }) => {
  const { slug } = params;

  return {
    meta: [
      {
        content: "Sterett Creek Village Trustee",
        name: "description",
      },
    ],
    title: `Sterett Creek Village Trustee | ${slug}`,
  };
};

export const usePage = routeLoader$(async ({ params }) => {
  return getPage(params.slug);
});

export default component$(() => {
  const data = usePage();

  if (lodash.isNil(data.value)) {
    return (
      <Container>
        <p>There&apos;s nothing here yet, check back later.</p>
      </Container>
    );
  }

  return (
    <Container>
      <SanityContent value={data.value.content as unknown as TypedObject} />
    </Container>
  );
});
