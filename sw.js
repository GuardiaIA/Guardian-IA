// sw.js - Service Worker for PWA

const CACHE_NAME = 'guardian-ia-cache-v1';
// NOTE: Caching source files (.ts, .tsx) is not effective with Vite.
// For a production-ready PWA, a plugin like 'vite-plugin-pwa' is recommended
// to automatically generate a service worker that caches the final bundled assets.
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  // External resources from CDNs
  'https://cdn.tailwindcss.com',
  // Placeholder Icons from manifest
  'https://cdn-icons-png.flaticon.com/192/1086/1086433.png',
  'https://cdn-icons-png.flaticon.com/512/1086/1086433.png'
];

self.addEventListener('install', (event) => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Cache opened');
        // Use individual adds to prevent a single failure from stopping the entire cache process.
        const promises = urlsToCache.map(url => {
            return cache.add(url).catch(err => {
                console.warn(`Failed to cache ${url}:`, err);
            });
        });
        return Promise.all(promises);
      })
  );
});

self.addEventListener('fetch', (event) => {
  // For navigation requests, always try the network first, then fall back to the cache's index.html.
  // This helps prevent the service worker from serving a stale app shell.
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match('./index.html');
      })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        return fetch(event.request).then(
          (response) => {
            // Check if we received a valid response. We don't cache opaque responses (e.g. from no-cors requests)
            if(!response || response.status !== 200 || response.type === 'opaque') {
              return response;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                // We only cache GET requests
                if(event.request.method === 'GET') {
                    cache.put(event.request, responseToCache);
                }
              });

            return response;
          }
        ).catch(err => {
            // Network request failed, try to find a match in the cache as a fallback.
            console.log('Fetch failed; returning offline page instead.', err);
            // This could be a specific offline page if you have one.
            // For now, it will just fail if not in cache.
            return caches.match(event.request);
        });
      })
    );
});


self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});