import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { routeLoader$ } from '@builder.io/qwik-city';

import { Container } from '../../components/container';
import { DocumentLink } from '../../components/document-link';
import { getFiles } from '../../sanity/queries/get-files';

export const head: DocumentHead = {
  meta: [
    {
      content: 'Covenants and files for Sterett Creek Village Trustee',
      name: 'description',
    },
  ],
  title: 'Sterett Creek Village Trustee | Files',
};

export const useFiles = routeLoader$(async () => {
  return getFiles();
});

export default component$(() => {
  const data = useFiles();

  return (
    <Container>
      <div class="grid gap-4 md:grid-cols-2">
        <div>
          <div>
            {/* eslint-disable-next-line react/jsx-max-depth */}
            <h2 class="text-2xl font-bold">Files</h2>
            {data.value.covenants.map(covenant => {
              return <DocumentLink document={covenant} key={covenant._id} />;
            })}
            {data.value.general.map(file => {
              return <DocumentLink document={file} key={file._id} />;
            })}
          </div>
        </div>
        <div>
          {/* eslint-disable-next-line react/jsx-max-depth */}
          <h2 class="text-2xl font-bold">Meeting Minutes</h2>
          {data.value.meetingMinutes.map(meetingMinute => {
            return (
              <DocumentLink document={meetingMinute} key={meetingMinute._id} />
            );
          })}
        </div>
      </div>
    </Container>
  );
});
