// MAONO Mobile Service Worker for Performance Optimization
const CACHE_NAME = 'maono-mobile-v1';
const STATIC_CACHE = 'maono-static-v1';
const DYNAMIC_CACHE = 'maono-dynamic-v1';

// Files to cache for offline functionality
const STATIC_FILES = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json'
];

// Install event - cache static files
self.addEventListener('install', (event) => {
  console.log('MAONO Service Worker: Installing...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('MAONO Service Worker: Caching static files');
        return cache.addAll(STATIC_FILES);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('MAONO Service Worker: Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            console.log('MAONO Service Worker: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Handle different types of requests
  if (request.destination === 'document') {
    // HTML pages - cache first, then network
    event.respondWith(
      caches.match(request)
        .then((response) => {
          if (response) {
            return response;
          }
          return fetch(request).then((response) => {
            if (response.status === 200) {
              const responseClone = response.clone();
              caches.open(DYNAMIC_CACHE).then((cache) => {
                cache.put(request, responseClone);
              });
            }
            return response;
          });
        })
    );
  } else if (request.destination === 'script' || request.destination === 'style') {
    // JS/CSS files - cache first
    event.respondWith(
      caches.match(request)
        .then((response) => {
          if (response) {
            return response;
          }
          return fetch(request).then((response) => {
            if (response.status === 200) {
              const responseClone = response.clone();
              caches.open(STATIC_CACHE).then((cache) => {
                cache.put(request, responseClone);
              });
            }
            return response;
          });
        })
    );
  } else if (request.destination === 'image') {
    // Images - network first, then cache
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open(DYNAMIC_CACHE).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return response;
        })
        .catch(() => {
          return caches.match(request);
        })
    );
  } else {
    // Other requests - network first
    event.respondWith(
      fetch(request)
        .catch(() => {
          return caches.match(request);
        })
    );
  }
});

// Background sync for offline data
self.addEventListener('sync', (event) => {
  if (event.tag === 'maono-sync') {
    console.log('MAONO Service Worker: Background sync triggered');
    event.waitUntil(
      // Sync offline data when connection is restored
      syncOfflineData()
    );
  }
});

// Push notifications for mobile
self.addEventListener('push', (event) => {
  console.log('MAONO Service Worker: Push notification received');
  
  const options = {
    body: event.data ? event.data.text() : 'New update from MAONO',
    icon: '/icon-192x192.png',
    badge: '/icon-192x192.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View Details',
        icon: '/icon-192x192.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icon-192x192.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('MAONO Update', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  console.log('MAONO Service Worker: Notification clicked');
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Helper function to sync offline data
async function syncOfflineData() {
  try {
    // Sync any offline data when connection is restored
    console.log('MAONO Service Worker: Syncing offline data...');
    // Add your sync logic here
  } catch (error) {
    console.error('MAONO Service Worker: Sync failed:', error);
  }
}
