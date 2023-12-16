import { component$, Slot } from '@builder.io/qwik';
import { twMerge } from 'tailwind-merge';

type ContainerProperties = {
  readonly className?: string;
};

export const containerClass =
  'max-w-7xl mx-auto my-4 grid place-items-center gap-4 rounded-lg bg-gray-50 p-4 shadow-sm shadow-sky-50';

export const Container = component$(({ className }: ContainerProperties) => {
  return (
    <div class={twMerge(containerClass, className)}>
      <Slot />
    </div>
  );
});
