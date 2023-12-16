import './global.css';

import { component$ } from '@builder.io/qwik';
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from '@builder.io/qwik-city';

import { RouterHead } from './components/router-head/router-head';

export default component$(() => {
  return (
    <QwikCityProvider>
      <head>
        <meta content="same-origin" name="view-transition" />
        <meta charSet="utf-8" />
        <meta content="width=device-width" name="viewport" />
        <link href="/favicon.ico" rel="icon" type="image/svg+xml" />
        <link href="/site.webmanifest" rel="manifest" />
        <link
          href="/apple-touch-icon.png"
          rel="apple-touch-icon"
          sizes="180x180"
          type="image/png"
        />
        <link
          href="/favicon-32x32.png"
          rel="icon"
          sizes="32x32"
          type="image/png"
        />
        <link
          href="/favicon-16x16.png"
          rel="icon"
          sizes="16x16"
          type="image/png"
        />
        <link href="/favicon.ico" rel="shortcut icon" />
        <RouterHead />
        <ServiceWorkerRegister />
      </head>
      <body
        class="min-h-screen bg-gradient-to-b from-sky-600 to-sky-50 pt-4"
        lang="en"
      >
        <RouterOutlet />
      </body>
    </QwikCityProvider>
  );
});
