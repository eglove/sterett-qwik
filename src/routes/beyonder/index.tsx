import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { Link, routeLoader$ } from '@builder.io/qwik-city';
import lodash from 'lodash';

import { Container } from '../../components/container';
import { Event } from '../../integrations/react/event';
import { EmailOutlineIcon } from '../../integrations/react/icons/email-outline-icon';
import { LinkOutlineIcon } from '../../integrations/react/icons/link-outline-icon';
import { MapPinOutlineIcon } from '../../integrations/react/icons/map-outline-icon';
import { PhoneOutlineIcon } from '../../integrations/react/icons/phone-outline-icon';
import { getBeyonderEvents } from '../../sanity/queries/get-beyonder-events';

export const head: DocumentHead = {
  meta: [
    {
      content: 'Event Updates for Beyonder Camp',
      name: 'description',
    },
  ],
  title: 'Beyonder Camp Events',
};

export const useBeyonderEvents = routeLoader$(async () => {
  return getBeyonderEvents();
});

export default component$(() => {
  const data = useBeyonderEvents();
  const usedDates = new Set();

  if (lodash.isEmpty(data.value)) {
    return (
      <Container>
        <p>There&apos;s nothing here yet, check back later.</p>
      </Container>
    );
  }

  return (
    <Container className="p-0">
      <div class="mx-4 mt-4 grid place-items-center">
        <img
          alt="Beyonder Camp"
          width={32}
          height={32}
          src="/images/beyonder.png"
        />
        <h2 class="text-lg font-bold sm:text-xl">Beyonder</h2>
        <h3 class="text-2xl font-bold sm:text-3xl">
          {'Christopher Hawn'.toUpperCase()}
        </h3>
        <h4 class="text-xl sm:text-2xl">General Manager</h4>
        <h4 class="text-lg sm:text-xl">BEYONDER Marine at Sterett Creek</h4>
      </div>
      <div class="mx-4 flex flex-col flex-wrap gap-4 sm:flex-row">
        <div class="flex items-center gap-2">
          <LinkOutlineIcon width={20} height={20} />
          <Link
            target="_blank"
            class="underline"
            href="https://beyondercamp.com/"
          >
            BeyonderCamp.com
          </Link>
        </div>
        <div class="flex items-center gap-2">
          <EmailOutlineIcon width={20} height={20} />
          <Link class="underline" href="mailto:chris@beyondercamp.com">
            chris@beyondercamp.com
          </Link>
        </div>
        <div class="flex items-center gap-2">
          <PhoneOutlineIcon width={20} height={20} />
          <Link class="underline" href="tel:8804382280">
            880.438.2280
          </Link>
        </div>
      </div>
      <div>
        <div class="flex items-center gap-2">
          <MapPinOutlineIcon width={32} height={32} />
          <div>
            <div>18174 Marina Rd.</div>
            <div>Warsaw, MO 65355</div>
          </div>
        </div>
      </div>
      <div class="grid w-full gap-4 p-2">
        {data.value.map(datum => {
          return (
            <Event
              key={datum._id}
              colors={{
                eventBackground: 'beyonderGreen',
                eventText: 'text-white',
              }}
              data={datum}
              usedDates={usedDates}
              iconMeta={{ alt: 'Beyonder Camp', src: '/images/beyonder.png' }}
            />
          );
        })}
      </div>
    </Container>
  );
});
