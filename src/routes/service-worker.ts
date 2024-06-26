/*
 * WHAT IS THIS FILE?
 *
 * The service-worker.ts file is used to have state of the art prefetching.
 * https://qwik.builder.io/qwikcity/prefetching/overview/
 *
 * Qwik uses a service worker to speed up your site and reduce latency, ie, not used in the traditional way of offline.
 * You can also use this file to add more functionality that runs in the service worker.
 */
import { setupServiceWorker } from "@builder.io/qwik-city/service-worker";

setupServiceWorker();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
addEventListener("install", async () => {
  return self.skipWaiting();
});

// eslint-disable-next-line @typescript-eslint/no-misused-promises
addEventListener("activate", async () => {
  return self.clients.claim();
});

declare const self: ServiceWorkerGlobalScope;
