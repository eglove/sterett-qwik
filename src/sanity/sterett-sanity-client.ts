import { createClient } from '@sanity/client';

export const NO_DRAFTS = "!(_id in path('drafts.**'))";

export const sterettSanityClient = createClient({
  apiVersion: '1',
  dataset: 'production',
  projectId: '540gjnt8',
  useCdn: true,
});
