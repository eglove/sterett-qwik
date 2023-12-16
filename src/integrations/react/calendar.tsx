/** @jsxImportSource react */
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { qwikify$ } from '@builder.io/qwik-react';
import { Button } from '@nextui-org/button';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from '@nextui-org/modal';
import type { TypedObject } from '@portabletext/types';
import { DateTime } from 'luxon';
import moment from 'moment';
import type { JSX } from 'react';
import { useCallback, useState } from 'react';
import type { View, ViewsProps } from 'react-big-calendar';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { z } from 'zod';

import { typedObjectSchema } from '../../sanity/queries/schema';
import { RSanityContent } from './sanity-content';

export type TCalendarComponentEventSchema = z.infer<
  typeof calendarComponentEventsSchema
>;

export const calendarComponentEventsSchema = z.object({
  description: typedObjectSchema.optional(),
  end: z.date(),
  start: z.date(),
  title: z.string(),
});

const calendarViews: ViewsProps = ['month', 'week', 'day', 'agenda'];

const localizer = momentLocalizer(moment);

type CalendarViewProperties = {
  readonly events: TCalendarComponentEventSchema[];
};

export function RCalendar({ events }: CalendarViewProperties): JSX.Element {
  const [clientView, setClientView] = useState<View>('week');

  const [selectedEvent, setSelectedEvent] =
    useState<TCalendarComponentEventSchema>();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleSelectEvent = useCallback(
    (event: z.infer<typeof calendarComponentEventsSchema>): void => {
      setSelectedEvent(event);
      onOpen();
    },
    [onOpen],
  );

  return (
    <>
      <Calendar
        selectable
        className="min-h-screen w-full"
        defaultView="week"
        endAccessor="end"
        events={events}
        localizer={localizer}
        startAccessor="start"
        view={clientView}
        views={calendarViews}
        onSelectEvent={handleSelectEvent}
        onView={setClientView}
      />
      {selectedEvent !== undefined && (
        <Modal backdrop="blur" isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose): JSX.Element => {
              return (
                <>
                  <ModalHeader>{selectedEvent.title}</ModalHeader>
                  <ModalBody>
                    <div>
                      <p className="leading-relaxed">
                        Starts:{' '}
                        {DateTime.fromJSDate(selectedEvent.start, {
                          zone: 'America/Chicago',
                        }).toLocaleString({
                          dateStyle: 'medium',
                          timeStyle: 'short',
                        })}
                      </p>
                      <p className="leading-relaxed">
                        Ends:{' '}
                        {DateTime.fromJSDate(selectedEvent.end, {
                          zone: 'America/Chicago',
                        }).toLocaleString({
                          dateStyle: 'medium',
                          timeStyle: 'short',
                        })}
                      </p>
                    </div>
                    {selectedEvent.description && (
                      <RSanityContent
                        value={selectedEvent.description as TypedObject}
                      />
                    )}
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={onClose}>
                      Close
                    </Button>
                  </ModalFooter>
                </>
              );
            }}
          </ModalContent>
        </Modal>
      )}
    </>
  );
}

export const CalendarView = qwikify$(RCalendar, { eagerness: 'load' });
