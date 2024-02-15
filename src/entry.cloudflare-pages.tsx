/*
 * WHAT IS THIS FILE?
 *
 * It's the entry point for Cloudflare Pages when building for production.
 *
 * Learn more about the Cloudflare Pages integration here:
 * - https://qwik.builder.io/docs/deployments/cloudflare-pages/
 *
 */
import {
  createQwikCity,
  type PlatformCloudflarePages,
  // eslint-disable-next-line import/no-unresolved
} from '@builder.io/qwik-city/middleware/cloudflare-pages';
// eslint-disable-next-line import/no-unresolved
import qwikCityPlan from '@qwik-city-plan';
// eslint-disable-next-line import/no-unresolved
import { manifest } from '@qwik-client-manifest';

import render from './entry.ssr';

declare global {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  type QwikCityPlatform = PlatformCloudflarePages;
}

const fetch = createQwikCity({ manifest, qwikCityPlan, render });

export { fetch };
