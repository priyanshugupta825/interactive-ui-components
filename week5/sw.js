/**
 * OmniMetrics Cloud Telemetry Dashboard - Service Worker
 * Cache-First Strategy with Network Fallback & Offline Offline Support
 */

const CACHE_NAME = 'omnimetrics-v1.0.0';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './styles.min.css',
  './styles.css',
  './app.min.js',
  './app.js',
  './data.json',
  './wireframe.html'
];

// Install Event - Pre-cache core shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Pre-caching offline shell');
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// Activate Event - Clean up stale cache versions
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[ServiceWorker] Removing legacy cache:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event - Stale-While-Revalidate Strategy
self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cachedResponse = await cache.match(event.request);
      
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          cache.put(event.request, networkResponse.clone());
        }
        return networkResponse;
      }).catch((err) => {
        console.warn('[ServiceWorker] Fetch failed, serving cached fallback if available:', err);
        return cachedResponse;
      });

      return cachedResponse || fetchPromise;
    })
  );
});
