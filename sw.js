/* TwoFold - service worker: caches the hub and all four apps for full offline use */
const VERSION = 'v1.0.0';
const CACHE = 'twofold-' + VERSION;
const ASSETS = [
  './', './index.html', './manifest.json',
  './icons/icon.svg', './icons/icon-192.png', './icons/icon-512.png',
  './icons/maskable-192.png', './icons/maskable-512.png',
  './icons/apple-touch-icon.png', './icons/favicon-32.png', './icons/favicon.ico',
  './apps/truth-dare/index.html',
  './apps/memory-jar/index.html',
  './apps/know-me/index.html',
  './apps/notes/index.html'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith('twofold-') && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;

  /* Page loads (hub or any app): serve the cached page instantly, refresh it quietly in the background */
  if (req.mode === 'navigate') {
    event.respondWith(
      caches.match(req).then(cached => {
        const fresh = fetch(req).then(res => {
          if (res && res.ok) caches.open(CACHE).then(c => c.put(req, res.clone()));
          return res;
        }).catch(() => cached || caches.match('./index.html'));
        return cached || fresh;
      })
    );
    return;
  }

  event.respondWith(
    caches.match(req).then(cached => cached || fetch(req).then(res => {
      if (res && res.ok) caches.open(CACHE).then(c => c.put(req, res.clone()));
      return res;
    }).catch(() => cached))
  );
});
