import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import lodash from "lodash";
import type { z } from "zod";

import { Container } from "../../components/container";
import { Event } from "../../integrations/react/event";
import { NewsUpdate } from "../../integrations/react/news-update";
import type {
  calendarEventSchema,
  newsUpdateSchema,
} from "../../sanity/queries/get-news-and-events";
import { getNewsAndEvents } from "../../sanity/queries/get-news-and-events";

export const head: DocumentHead = {
  meta: [
    {
      content: "News and Event Updates for Sterett Creek Village Trustee",
      name: "description",
    },
  ],
  title: "Sterett Creek Village Trustee | News",
};

export const useNews = routeLoader$(async () => {
  return getNewsAndEvents();
});

export default component$(() => {
  const data = useNews();
  const usedDates = new Set();

  if (lodash.isEmpty(data.value)) {
    return (
      <Container>
        <p>There&apos;s nothing here yet, check back later.</p>
      </Container>
    );
  }

  return (
    <Container styleNames="p-0">
      <div className="grid w-full gap-4 p-2">
        {data.value.map((datum) => {
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          if ((datum as z.infer<typeof newsUpdateSchema>).date !== undefined) {
            return (
              <NewsUpdate
                key={datum._id}
                data={datum as z.infer<typeof newsUpdateSchema>}
              />
            );
          }

          return (
            <Event
              key={datum._id}
              data={datum as z.output<typeof calendarEventSchema>}
              usedDates={usedDates}
            />
          );
        })}
      </div>
    </Container>
  );
});
