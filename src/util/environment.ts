import { z } from 'zod';

export const environment = z
  .object({
    STERETT_SANITY_DATASET: z.string(),
    STERETT_SANITY_PROJECT_ID: z.string(),
    STERETT_SANITY_RO_TOKEN: z.string(),
  })
  .parse(process.env);
