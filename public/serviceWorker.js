const CACHE_NAME = "VERSION-1";
const urlsToCache = ["index.html", "offline.html", "/", "favicon.ico"];

//Installation SW

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

//Listen for requests
self.addEventListener("fetch", (event) => {
  if (event.request.url === "http://localhost:3000/favicon.ico") {
    console.log("tries to fetch favicon.ico");
  }
  event.respondWith(
    caches
      .match(event.request)
      .then(() => {
        return fetch(event.request).catch(() => caches.match("offline.html"));
      })
      .then(console.log(event.request))
  );
});
//Activate the serviceworker

self.addEventListener("activate", (event) => {
  const cacheWhiteList = [];
  cacheWhiteList.push(CACHE_NAME);
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhiteList.includes(cacheName))
            return caches.delete(cacheName);
        })
      );
    })
  );
});
