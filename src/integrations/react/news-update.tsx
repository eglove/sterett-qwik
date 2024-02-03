/** @jsxImportSource react */
// @ts-expect-error allow no types
import { qwikify$ } from '@builder.io/qwik-react';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import { Divider } from '@nextui-org/divider';
import type { TypedObject } from '@portabletext/types';
import lodash from 'lodash';
import type { ReactNode } from 'react';
import type { z } from 'zod';

import type { newsUpdateSchema } from '../../sanity/queries/get-news-and-events';
import { RSanityContent } from './sanity-content';

type NewsUpdateProperties = {
  readonly data: z.infer<typeof newsUpdateSchema>;
};

export function RNewsUpdate({ data }: NewsUpdateProperties): ReactNode {
  return (
    <Card className="h-max w-full" id={data._id}>
      <CardHeader className="block">
        <div className="font-semibold">{data.title}</div>
      </CardHeader>
      {!lodash.isNil(data.description) && (
        <>
          <Divider />
          <CardBody>
            <RSanityContent value={data.description as TypedObject} />
          </CardBody>
        </>
      )}
    </Card>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
export const NewsUpdate = qwikify$(RNewsUpdate);
