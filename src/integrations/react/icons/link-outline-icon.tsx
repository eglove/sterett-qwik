/** @jsxImportSource react */
import { qwikify$ } from '@builder.io/qwik-react';
import { LinkIcon } from '@heroicons/react/24/outline';

export function RLinkOutlineIcon(properties: Parameters<typeof LinkIcon>[0]) {
  return <LinkIcon {...properties} />;
}

export const LinkOutlineIcon = qwikify$(RLinkOutlineIcon, {
  eagerness: 'visible',
});
