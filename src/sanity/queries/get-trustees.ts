import { z } from "zod";

import { NO_DRAFTS, sterettSanityClient } from "../sterett-sanity-client";

export const getTrusteesSchema = z.array(
  z.object({
    _id: z.string(),
    duties: z.string(),
    image: z.object({
      asset: z.object({
        metadata: z.object({
          dimensions: z.object({
            height: z.number(),
            width: z.number(),
          }),
        }),
        url: z.string().url(),
      }),
    }),
    name: z.string(),
    phoneNumber: z.string(),
  }),
);

export const getTrustees = async (): Promise<
  z.infer<typeof getTrusteesSchema>
> => {
  const trusteesQuery = `*[_type == "trustee" && ${NO_DRAFTS}] | order(orderRank asc) {_id, order, orderRank, duties, name, phoneNumber, image{asset->{url, metadata{dimensions{height, width}}}}}`;

  return sterettSanityClient.fetch(trusteesQuery);
};
