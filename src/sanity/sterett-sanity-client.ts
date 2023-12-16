import { createClient } from '@sanity/client';

export const STERETT_GROQ_API_VERSION = new Date().toISOString().split('T')[0];

export const NO_DRAFTS = "!(_id in path('drafts.**'))";

export const sterettSanityClient = createClient({
  apiVersion: STERETT_GROQ_API_VERSION,
  dataset: 'production',
  projectId: '540gjnt8',
  useCdn: true,
});
