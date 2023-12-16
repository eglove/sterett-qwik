import lodash from 'lodash';
import { DateTime } from 'luxon';
import { z } from 'zod';

import { NO_DRAFTS, sterettSanityClient } from '../sterett-sanity-client';
import { typedObjectSchema } from './schema';

export const calendarEventSchema = z.object({
  _id: z.string(),
  description: typedObjectSchema,
  endsAt: z.string(),
  startsAt: z.string(),
  title: z.string(),
});

export const newsUpdateSchema = z.object({
  _id: z.string(),
  date: z.string(),
  description: typedObjectSchema,
  title: z.string(),
});

export const eventsNewsReturnSchema = z.object({
  events: z.array(calendarEventSchema),
  updates: z.array(newsUpdateSchema),
});

export type NewsAndEvents = (
  | z.output<typeof calendarEventSchema>
  | z.output<typeof newsUpdateSchema>
)[];

export const getNewsAndEvents = async (): Promise<NewsAndEvents> => {
  const today = DateTime.fromJSDate(new Date(), {
    zone: 'America/Chicago',
  }).set({ hour: 0, millisecond: 0, minute: 0, second: 0 });
  const formattedDate = today.toFormat('yyyy-LL-dd');

  const eventQuery = `
    *[_type == "calendarEvent" 
    && (startsAt >= "${formattedDate}" || endsAt >= "${formattedDate}") 
    && ${NO_DRAFTS}] | order(startsAt asc){_id, title, startsAt, endsAt, description}`;

  const expiresQuery = `(expireDate != null && expireDate >= "${formattedDate}")`;
  const updateQuery = `*[_type == "newsUpdate" && ${expiresQuery} && ${NO_DRAFTS}] | order(date asc){_id, title, date, description}`;

  const [events, updates] = await Promise.all([
    sterettSanityClient.fetch<z.infer<typeof calendarEventSchema>[]>(
      eventQuery,
    ),
    sterettSanityClient.fetch<z.infer<typeof newsUpdateSchema>[]>(updateQuery),
  ]);

  return sortNewsAndEvents({ events, updates });
};

export const sortNewsAndEvents = (
  eventsNews: z.infer<typeof eventsNewsReturnSchema>,
): NewsAndEvents => {
  const merged: Array<
    z.infer<typeof newsUpdateSchema> | z.infer<typeof calendarEventSchema>
    // @ts-expect-error allow union type
    // eslint-disable-next-line unicorn/prefer-spread
  > = lodash.concat(eventsNews.events ?? [], eventsNews.updates ?? []);

  // eslint-disable-next-line functional/immutable-data
  return merged.sort((a, b) => {
    const aDate = 'startsAt' in a ? new Date(a.startsAt) : new Date(a.date);
    const bDate = 'startsAt' in b ? new Date(b.startsAt) : new Date(b.date);

    return aDate.getTime() - bDate.getTime();
  });
};
