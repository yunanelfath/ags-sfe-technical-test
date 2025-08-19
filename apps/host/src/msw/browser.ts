import { setupWorker } from 'msw/browser';
import { handlers } from 'products/handlers'

export const worker = setupWorker(...handlers);

if (typeof window !== 'undefined') {
  console.log({ handlers })
  worker.start({
    quiet: true,
    serviceWorker: {
      url: '/mockServiceWorker.js',
    },
    onUnhandledRequest: 'bypass',
  });
}
