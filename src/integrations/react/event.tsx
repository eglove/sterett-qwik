/** @jsxImportSource react */
import { qwikify$ } from '@builder.io/qwik-react';
import { CalendarDaysIcon } from '@heroicons/react/24/solid';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';
import type { TypedObject } from '@portabletext/types';
import lodash from 'lodash';
import { DateTime } from 'luxon';
import type { ReactNode } from 'react';
import { Fragment } from 'react';
import { twMerge } from 'tailwind-merge';
import type { z } from 'zod';

import type { calendarEventSchema } from '../../sanity/queries/get-news-and-events';
import { getRelativeDate, now } from '../../util/date';
import { RSanityContent } from './sanity-content';

type EventProperties = {
  // eslint-disable-next-line react/require-default-props
  readonly colors?: {
    eventBackground?: string;
    eventText?: string;
  };
  readonly data: z.output<typeof calendarEventSchema>;
  // eslint-disable-next-line react/require-default-props
  readonly iconMeta?: {
    alt: string;
    src: string;
  };
  readonly usedDates: Set<unknown>;
};

const eventDateFormat = (date: string): string => {
  return DateTime.fromISO(date, { zone: 'America/Chicago' }).toLocaleString({
    dateStyle: 'medium',
    timeStyle: 'short',
  });
};

const happeningNow = 'Happening Now!';

// eslint-disable-next-line max-statements
export function REvent({
  data,
  usedDates,
  colors,
  iconMeta,
}: EventProperties): ReactNode {
  const isInRange =
    now.getTime() > new Date(data.startsAt).getTime() &&
    now.getTime() < new Date(data.endsAt).getTime();
  const relativeDate = getRelativeDate(data.startsAt);
  let isDateShowing = false;

  if (!usedDates.has(relativeDate) && !isInRange) {
    isDateShowing = true;
    usedDates.add(relativeDate);
  }

  if (!usedDates.has(happeningNow) && isInRange) {
    isDateShowing = true;
    usedDates.add(happeningNow);
  }

  const backgroundColor = lodash.isNil(colors?.eventBackground)
    ? 'bg-sky-200'
    : `bg-${colors.eventBackground}`;
  const textColor = lodash.isNil(colors?.eventText)
    ? 'text-foreground'
    : colors.eventText;

  return (
    <Fragment key={data._id}>
      {isDateShowing ? (
        <Card
          className={twMerge('text-lg font-bold', backgroundColor, textColor)}
        >
          <CardBody>
            {isInRange ? happeningNow : getRelativeDate(data.startsAt)}
          </CardBody>
        </Card>
      ) : null}
      <Card
        className={twMerge('my-4 h-max w-full', backgroundColor)}
        id={data._id}
      >
        <CardHeader className={twMerge('block', textColor)}>
          <strong className="flex flex-wrap gap-2">
            {lodash.isNil(iconMeta) ? (
              <CalendarDaysIcon height={24} width={24} />
            ) : (
              <img
                alt={iconMeta.alt}
                width={20}
                height={20}
                src={iconMeta.src}
              />
            )}
            <span>{eventDateFormat(data.startsAt)}</span>
            <span>
              {data.endsAt === data.startsAt
                ? ''
                : ` - ${eventDateFormat(data.endsAt)}`}
            </span>
          </strong>
          <br />
          <div className="font-semibold">{data.title}</div>
        </CardHeader>
        {!lodash.isNil(data.description) && (
          <>
            <Divider />
            <CardBody>
              <RSanityContent
                className={textColor}
                value={data.description as TypedObject}
              />
            </CardBody>
          </>
        )}
      </Card>
    </Fragment>
  );
}

export const Event = qwikify$(REvent);
