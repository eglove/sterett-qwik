import type { DocumentHead } from "@builder.io/qwik-city";

import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import lodash from "lodash";

import type { AvatarColor } from "../../integrations/react/trustees";

import { Container } from "../../components/container";
import { Trustees } from "../../integrations/react/trustees";
import { getTrustees } from "../../sanity/queries/get-trustees";

export const head: DocumentHead = {
  meta: [
    {
      content:
        "Trustee contact information for Sterett Creek Village Trustee Board",
      name: "description",
    },
  ],
  title: "Sterett Creek Village Trustee | Trustees",
};

export const useTrustees = routeLoader$(async () => {
  const trustees = await getTrustees();

  const colorValues: AvatarColor[] = lodash.shuffle([
    "warning",
    "secondary",
    "danger",
    "primary",
    "success",
  ]);

  return { colorValues, trustees };
});

export default component$(() => {
  const data = useTrustees();

  return (
    <Container>
      <Trustees
        colorValues={data.value.colorValues}
        trustees={data.value.trustees}
      />
    </Container>
  );
});
