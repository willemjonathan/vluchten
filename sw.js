// Netwerk eerst (altijd verse resultaten), bij geen verbinding de laatst opgeslagen versie.
const CACHE = "vluchten-v1";

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));

self.addEventListener("fetch", (e) => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    fetch(e.request, { cache: "no-store" })
      .then((resp) => {
        const kopie = resp.clone();
        caches.open(CACHE).then((c) => c.put(e.request, kopie));
        return resp;
      })
      .catch(() => caches.match(e.request))
  );
});
