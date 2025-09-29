// sw.js - Service Worker for PWA

const CACHE_NAME = 'guardian-ia-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/index.tsx',
  '/App.tsx',
  '/types.ts',
  '/constants.ts',
  '/metadata.json',
  '/services/geminiService.ts',
  '/components/Header.tsx',
  '/components/LoginView.tsx',
  '/components/NavBar.tsx',
  '/components/ScanView.tsx',
  '/components/HistoryView.tsx',
  '/components/ReportView.tsx',
  '/components/ChemicalGuideView.tsx',
  '/components/UserManagementView.tsx',
  '/components/UserGuideView.tsx',
  '/components/CameraView.tsx',
  '/data/users.ts',
  '/data/mockReports.ts',
  '/manifest.json',
  // External resources from CDNs
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js',
  'https://aistudiocdn.com/react@^19.1.1',
  'https://aistudiocdn.com/react-dom@^19.1.1/',
  'https://aistudiocdn.com/@google/genai@^1.21.0',
  'https://aistudiocdn.com/jspdf@^3.0.3',
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
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        return fetch(event.request).then(
          (response) => {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
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
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
