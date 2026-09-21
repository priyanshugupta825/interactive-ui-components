/**
 * ============================================================================
 * APEXSTREAM SERVICE WORKER (SW.JS)
 * Week 4 Performance Optimization: Cache-First & Stale-While-Revalidate
 * ============================================================================
 */

const CACHE_NAME = 'apexstream-v1';
const STATIC_ASSETS = [
  './index.html',
  './styles.min.css',
  './styles.css',
  './app.min.js',
  './app.js'
];

// Install Event: Pre-cache static critical shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate Event: Clear stale caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event: Stale-While-Revalidate strategy
self.addEventListener('fetch', (event) => {
  // Only cache GET requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        // Cache valid responses
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        // Fallback for offline if not cached
        return cachedResponse;
      });

      return cachedResponse || fetchPromise;
    })
  );
});
