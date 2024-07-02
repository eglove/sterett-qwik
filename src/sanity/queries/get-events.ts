import type { z } from "zod";

import { DateTime } from "luxon";

import type { calendarEventSchema } from "./get-news-and-events";

import { NO_DRAFTS, sterettSanityClient } from "../sterett-sanity-client";

export async function getEvents() {
  const today = DateTime.fromJSDate(new Date(), {
    zone: "America/Chicago",
  }).set({ hour: 0, millisecond: 0, minute: 0, second: 0 });
  const formattedDate = today.toFormat("yyyy-LL-dd");

  const oneMonth = today.plus({ month: 1 }).toFormat("yyyy-LL-dd");

  const eventQuery = `
    *[_type == "calendarEvent" 
    && (startsAt >= "${formattedDate}" && endsAt <= "${oneMonth}") 
    && ${NO_DRAFTS}] | order(startsAt asc){_id, title, startsAt, endsAt, description}`;

  return sterettSanityClient.fetch<z.output<typeof calendarEventSchema>[]>(
    eventQuery,
  );
}
