/** @jsxImportSource react */
import { qwikify$ } from '@builder.io/qwik-react';
import { EnvelopeIcon } from '@heroicons/react/24/outline';

export function REmailOutlineIcon(
  properties: Parameters<typeof EnvelopeIcon>[0],
) {
  return <EnvelopeIcon {...properties} />;
}

export const EmailOutlineIcon = qwikify$(REmailOutlineIcon, {
  eagerness: 'visible',
});
