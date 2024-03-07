/** @jsxImportSource react */
import { qwikify$ } from '@builder.io/qwik-react';
import { PhoneIcon } from '@heroicons/react/24/outline';

export function RPhoneOutlineIcon(properties: Parameters<typeof PhoneIcon>[0]) {
  return <PhoneIcon {...properties} />;
}

export const PhoneOutlineIcon = qwikify$(RPhoneOutlineIcon, {
  eagerness: 'visible',
});
