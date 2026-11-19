const V = 'dali-mwn3r9uu';
const FILES = ["./","icon-180.png","icon-512.png","index.html","itinerary.pdf","leaflet.js","letter.txt","manifest.webmanifest","map.html","photo.js","rain.js","vault/1.bin","vault/10.bin","vault/11.bin","vault/2.bin","vault/3.bin","vault/4.bin","vault/5.bin","vault/6.bin","vault/7.bin","vault/8.bin","vault/9.bin","vault/index.bin","vault/meta.json"];
self.addEventListener('install', e => { e.waitUntil(caches.open(V).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  const isPage = req.mode === 'navigate' || /\.html?$|\/$|letter\.txt$/.test(new URL(req.url).pathname);
  if (isPage) {
    e.respondWith(Promise.race([
      fetch(req).then(r => { const c = r.clone(); caches.open(V).then(x => x.put(req, c)); return r; }),
      new Promise((_, rej) => setTimeout(rej, 4000)),
    ]).catch(() => caches.match(req, { ignoreSearch: true }).then(r => r || caches.match('./'))));
  } else {
    e.respondWith(caches.match(req, { ignoreSearch: true }).then(r => r || fetch(req).then(res => { const c = res.clone(); caches.open(V).then(x => x.put(req, c)); return res; })));
  }
});
