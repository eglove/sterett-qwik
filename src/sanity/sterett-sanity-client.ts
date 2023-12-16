import { createClient } from '@sanity/client';

import { environment } from '../util/environment';

export const STERETT_GROQ_API_VERSION = new Date().toISOString().split('T')[0];

export const NO_DRAFTS = "!(_id in path('drafts.**'))";

export const sterettSanityClient = createClient({
  apiVersion: STERETT_GROQ_API_VERSION,
  dataset: environment.STERETT_SANITY_DATASET,
  projectId: environment.STERETT_SANITY_PROJECT_ID,
  token: environment.STERETT_SANITY_RO_TOKEN,
  useCdn: true,
});
