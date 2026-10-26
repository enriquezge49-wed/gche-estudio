/* GCHE Estudio: guarda la app para usarla sin internet */
const V = "gche-v8-2026-10-25";
const SHELL = ["./", "index.html", "manifest.webmanifest", "icons/icon-192.png", "icons/icon-512.png", "icons/maskable-512.png", "icons/apple-touch-icon.png", "img/fig-aterosclerosis.jpg", "img/fig-cetonas.jpg", "img/fig-glucosa.jpg", "img/fig-presion.jpg", "img/fig-quilomicron.jpg", "img/fig-retro-tiroides.jpg", "img/lam-endocrino.jpg", "img/lam-hipofisis.jpg", "img/lam-pancreas.jpg", "img/lam-tiroides.jpg"];
self.addEventListener("install", e => { e.waitUntil(caches.open(V).then(c => c.addAll(SHELL.map(u => new Request(u, { cache: "reload" })))).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith("gche-") && k !== V).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const u = new URL(e.request.url);
  if (e.request.method !== "GET" || u.origin !== self.location.origin) return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(hit => {
    const net = fetch(e.request).then(r => { if (r && r.ok) { const copy = r.clone(); caches.open(V).then(c => c.put(e.request, copy)); } return r; }).catch(() => hit);
    return hit || net;
  }));
});
