import { z } from "zod";

import { NO_DRAFTS, sterettSanityClient } from "../sterett-sanity-client";

export const getAllPagesSchema = z.array(
  z.object({
    _id: z.string(),
    slug: z.object({
      current: z.string(),
    }),
    title: z.string(),
  }),
);

export const getAllPages = async (): Promise<
  z.infer<typeof getAllPagesSchema>
> => {
  const slugQuery = `*[_type == "page" && slug.current != "home" && ${NO_DRAFTS}]{_id, title, slug{current}}`;

  return sterettSanityClient.fetch(slugQuery);
};
