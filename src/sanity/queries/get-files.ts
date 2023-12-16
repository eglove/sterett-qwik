import { z } from 'zod';

import { NO_DRAFTS, sterettSanityClient } from '../sterett-sanity-client';

export type FileSchema = z.infer<typeof fileSchema>;
export type GetFilesSchema = z.infer<typeof getFilesSchema>;

export type GetFilesReturn = {
  covenants: GetFilesSchema;
  general: GetFilesSchema;
  meetingMinutes: GetFilesSchema;
};

export const fileSchema = z.object({
  _id: z.string(),
  file: z.object({
    asset: z.object({
      url: z.string().url(),
    }),
  }),
  title: z.string(),
});

export const getFilesSchema = z.array(fileSchema);

export const getFiles = async (): Promise<GetFilesReturn> => {
  const generalQuery = `*[_type == "documentUpload" && category == "General" && ${NO_DRAFTS}] | order(date desc){_id, title, file{asset->{url}}}`;
  const covenantsQuery = `*[_type == "documentUpload" && category == "Covenant" && ${NO_DRAFTS}] | order(date desc){_id, title, file{asset->{url}}}`;
  const meetingMinutesQuery = `*[_type == "documentUpload" && category == "Meeting Minute" && ${NO_DRAFTS}] | order(date desc){_id, title, file{asset->{url}}}`;

  const data = await Promise.all([
    sterettSanityClient.fetch<GetFilesSchema>(generalQuery),
    sterettSanityClient.fetch<GetFilesSchema>(covenantsQuery),
    sterettSanityClient.fetch<GetFilesSchema>(meetingMinutesQuery),
  ]);

  return {
    covenants: data[1],
    general: data[0],
    meetingMinutes: data[2],
  };
};
