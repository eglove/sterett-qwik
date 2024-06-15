import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { routeLoader$ } from "@builder.io/qwik-city";
import { DateTime } from "luxon";

import { CalendarView } from "../../integrations/react/calendar";
import { getCalendarEvents } from "../../sanity/queries/get-calendar-events";

export const head: DocumentHead = {
  meta: [
    {
      content: "Events calendar for Sterett Creek Village Trustee",
      name: "description",
    },
  ],
  title: "Sterett Creek Village Trustee | Calendar",
};

export const useCalendarEvents = routeLoader$(async () => {
  const calendarEvents = await getCalendarEvents();

  return calendarEvents.map((item) => {
    return {
      description: item.description,
      end: DateTime.fromISO(item.endsAt, {
        zone: "America/Chicago",
      }).toJSDate(),
      start: DateTime.fromISO(item.startsAt, {
        zone: "America/Chicago",
      }).toJSDate(),
      title: item.title,
    };
  });
});

export default component$(() => {
  const data = useCalendarEvents();

  return (
    <div className="mx-auto my-4 max-w-7xl rounded-lg bg-gray-50 py-4 shadow-sm shadow-sky-50 md:p-4">
      <CalendarView events={data.value} />
    </div>
  );
});
