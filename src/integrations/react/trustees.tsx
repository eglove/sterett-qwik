/** @jsxImportSource react **/
// @ts-expect-error allow no types
import { qwikify$ } from '@builder.io/qwik-react';
import { Link } from '@nextui-org/link';
import { User } from '@nextui-org/user';
import type { JSX } from 'react';

import { containerClass } from '../../components/container';
import type { getTrustees } from '../../sanity/queries/get-trustees';
import { imageBuilder } from '../../sanity/sterett-sanity-client';

export type AvatarColor =
  | 'warning'
  | 'secondary'
  | 'danger'
  | 'primary'
  | 'success';

type TrusteesProperties = {
  readonly colorValues: AvatarColor[];
  readonly trustees: Awaited<ReturnType<typeof getTrustees>>;
};

export function RTrustees({
  trustees,
  colorValues,
}: TrusteesProperties): JSX.Element {
  return (
    <div className={containerClass}>
      <div className="grid gap-4 md:grid-cols-3">
        {trustees.map((trustee, index) => {
          const imageUrl = imageBuilder
            .image(trustee.image.asset.url)
            .height(128)
            .width(128)
            .format('webp')
            .url();

          return (
            <div
              key={trustee._id}
              className="mb-4 w-full gap-4 border-b-2 pb-4"
            >
              <User
                className="gap-4"
                name={trustee.name}
                avatarProps={{
                  className: 'w-32 h-32',
                  color: colorValues[index] ?? 'default',
                  isBordered: true,
                  size: 'lg',
                  src: imageUrl,
                }}
                description={
                  <>
                    <p>
                      <Link
                        className="text-black underline"
                        href={`tel:${trustee.phoneNumber}`}
                      >
                        {trustee.phoneNumber}
                      </Link>
                    </p>
                    <p className="text-small text-foreground-800">
                      {trustee.duties}
                    </p>
                  </>
                }
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
export const Trustees = qwikify$(RTrustees, { eagerness: 'load' });
