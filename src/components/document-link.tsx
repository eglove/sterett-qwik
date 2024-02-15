import { component$ } from '@builder.io/qwik';
import { qwikify$ } from '@builder.io/qwik-react';
import { Link as NextUILink } from '@nextui-org/react';

import type { FileSchema } from '../sanity/queries/get-files';

const QLink = qwikify$(NextUILink);

export const DocumentLink = component$(
  ({ document }: { readonly document: FileSchema }) => {
    return (
      <div class="flex flex-wrap items-center gap-1 py-2">
        <QLink
          className="text-black underline"
          href={document.file.asset.url}
          isExternal
          showAnchorIcon
        >
          {document.title}
        </QLink>
      </div>
    );
  },
);
