import type { DocumentHead } from "@builder.io/qwik-city";

import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import lodash from "lodash";
import isNil from "lodash/isNil.js";

import { Container } from "../components/container";
import { eventDateFormat } from "../integrations/react/event";
import { SanityContent } from "../integrations/react/sanity-content";
import { getEvents } from "../sanity/queries/get-events";
import { getPage } from "../sanity/queries/get-page";

export const head: DocumentHead = {
  meta: [
    {
      content: "Homepage of the Sterett Creek Village Trustee Board",
      name: "description",
    },
  ],
  title: "Sterett Creek Village Trustee | Home",
};

export const useEvents = routeLoader$(async () => {
  return getEvents();
});

export const useHomepage = routeLoader$(async () => {
  return getPage("home");
});

export default component$(() => {
  const data = useHomepage();
  const events = useEvents();

  if (lodash.isNil(data.value?.content)) {
    return (
      <Container>
        <p>There&apos;s nothing here yet, check back later.</p>
      </Container>
    );
  }

  return (
    <Container>
      <h2 class="text-2xl font-bold">Upcoming Events</h2>
      {events.value.map((event) => {
        return (
          <>
            <p>
              <strong>{event.title}</strong>
              <br />
              <span>{eventDateFormat(event.startsAt)}</span>
              <span>
                {event.endsAt === event.startsAt
                  ? ""
                  : ` - ${eventDateFormat(event.endsAt)}`}
              </span>
            </p>
            {!isNil(event.description) && (
              <SanityContent value={event.description} />
            )}
          </>
        );
      })}
      <SanityContent value={data.value.content} />
    </Container>
  );
});
