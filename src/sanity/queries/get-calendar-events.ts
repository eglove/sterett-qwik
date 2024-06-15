import { z } from "zod";

import { NO_DRAFTS, sterettSanityClient } from "../sterett-sanity-client";
import { typedObjectSchema } from "./schema";

export const getCalendarEventsSchema = z.array(
  z.object({
    _id: z.string(),
    description: typedObjectSchema,
    endsAt: z.string(),
    startsAt: z.string(),
    title: z.string(),
  }),
);

export const getCalendarEvents = async (): Promise<
  z.infer<typeof getCalendarEventsSchema>
> => {
  const eventQuery = `*[_type == "calendarEvent" && ${NO_DRAFTS}]{_id, title, startsAt, endsAt, description}`;

  return sterettSanityClient.fetch<z.infer<typeof getCalendarEventsSchema>>(
    eventQuery,
  );
};
