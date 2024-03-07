/** @jsxImportSource react */
import { qwikify$ } from '@builder.io/qwik-react';
import { MapIcon } from '@heroicons/react/24/outline';

export function RMapPinOutlineIcon(properties: Parameters<typeof MapIcon>[0]) {
  return <MapIcon {...properties} />;
}

export const MapPinOutlineIcon = qwikify$(RMapPinOutlineIcon, {
  eagerness: 'visible',
});
