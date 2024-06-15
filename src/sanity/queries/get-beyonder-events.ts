import { DateTime } from "luxon";
import { z } from "zod";

import { NO_DRAFTS, sterettSanityClient } from "../sterett-sanity-client";
import { typedObjectSchema } from "./schema";

export const beyonderEventSchema = z.object({
  _id: z.string(),
  description: typedObjectSchema,
  endsAt: z.string(),
  startsAt: z.string(),
  title: z.string(),
});

export const getBeyonderEvents = async () => {
  const today = DateTime.fromJSDate(new Date(), {
    zone: "America/Chicago",
  }).set({ hour: 0, millisecond: 0, minute: 0, second: 0 });
  const formattedDate = today.toFormat("yyyy-LL-dd");

  const eventQuery = `
    *[_type == "beyonderEvent" 
    && (startsAt >= "${formattedDate}" || endsAt >= "${formattedDate}") 
    && ${NO_DRAFTS}] | order(startsAt asc){_id, title, startsAt, endsAt, description}`;

  return sterettSanityClient.fetch<z.infer<typeof beyonderEventSchema>[]>(
    eventQuery,
  );
};
