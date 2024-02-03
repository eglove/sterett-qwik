import { component$ } from '@builder.io/qwik';
// @ts-expect-error allow no types
import { qwikify$ } from '@builder.io/qwik-react';
import { Link as NextUILink } from '@nextui-org/react';

import type { FileSchema } from '../sanity/queries/get-files';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
const QLink = qwikify$(NextUILink);

export const DocumentLink = component$(
  ({ document }: { readonly document: FileSchema }) => {
    return (
      <div class="flex flex-wrap items-center gap-1 py-2">
        <QLink
          isExternal
          showAnchorIcon
          className="text-black underline"
          href={document.file.asset.url}
        >
          {document.title}
        </QLink>
      </div>
    );
  },
);
